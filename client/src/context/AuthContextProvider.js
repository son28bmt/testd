import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import setAuthToken from "../utils/setAuthToken";
import { authReducer } from "./reducer/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const autoFetch = axios.create({
        baseURL: "http://localhost:4000",
    });

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.post(`${apiUrl}/api/auth/check-token`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`
                }
            });
            
            if (response.data.success) {
                dispatch({
                    type: "AUTH_LOADED_SUCCESS",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            dispatch({
                type: "AUTH_LOADED_SUCCESS",
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Login user
    const loginUser = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, data);
            if (response.data.success) {
                console.log(response.data)
                localStorage.setItem("token", response.data.accessToken);
            }

            await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    msg: error.msg,
                };
            }
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await autoFetch.post(
                `${apiUrl}/api/auth/register`,
                data
            );

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    msg: error.msg,
                };
            }
        }
    };

    const logoutUser = async () => {
        localStorage.removeItem("token");
        dispatch({
            type: "AUTH_LOADED_SUCCESS",
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    const dataAuthContext = {
        state,
        loginUser,
        registerUser,
        logoutUser,
    };
    return (
        <AuthContext.Provider value={dataAuthContext}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
