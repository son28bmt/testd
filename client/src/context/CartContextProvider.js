import { cartReducer } from "./reducer/cartReducer";
import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, {
        cartCount: null
    });

    const loadCountCart = async () => {
        if (localStorage["cart"]) {
            dispatch({
                type: "SET_COUNT_CART",
                payload: {
                    countCart: JSON.parse(localStorage.getItem("cart")).length,
                },
            });
        }

    };

    useEffect(() => {
        loadCountCart();
    }, []);

    const setCountCart = async (count) => {
        try {
            dispatch({
                type: "SET_COUNT_CART",
                payload: {
                    countCart: count
                },
            });
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

    const dataCartContext = {
        state,
        setCountCart
    };
    return (
        <CartContext.Provider value={dataCartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
