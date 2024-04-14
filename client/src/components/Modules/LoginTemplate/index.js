import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";

const LoginTemplate = () => {
    const navigate = useNavigate();
    const {state: { authLoading, isAuthenticated }, loginUser } = useContext(AuthContext);
    const [isError, setIsError] = useState(null);
    const [dataLogin, setDataLogin] = useState({
        email: "admin@gmail.com",
        password: "123456",
    });
    const [loadingLogin, setLoadingLogin] = useState(false);
    
    // Event Onchange Data Form
    const eventChangeValueInput = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Login
    const handleLogin = async () => {
        const { email, password } = dataLogin;
        if(isError) {
            return;
        }
        if(!email || !password) {
            setIsError("Chưa điền đầy đủ thông tin");
            setTimeout(() => {
                setIsError(null);
            }, 5000);
            return;
        }
        if(email.length<3 || email.length>50) {
            setIsError("Tài khoản phải từ 3 đến 50 kí tự");
            setTimeout(() => {
                setIsError(null);
            }, 5000);
            return;
        }
        setLoadingLogin(true);
        
        try {
            const loginUserRes = await loginUser(dataLogin);
            setLoadingLogin(false);

            console.log(loginUserRes);
            if(!loginUserRes?.success) {
                setIsError("Tài khoản hoặc mật khẩu không đúng");
                setTimeout(() => {
                    setIsError(null);
                }, 5000);
            }
            else {
                navigate("/");
            }
        } catch (error) {
            setLoadingLogin(false);
        }
    };

    // Handle Signin Github
    const handleSigninGithub = async () => {
        // signIn("github", { redirect: false });
    };

    // Handle Signin Google
    const handleSigninGoogle = async () => {
        // window.location.href = `${API_BASE_URL}/api/auth/google`;
        // window.open(`${API_BASE_URL}/api/auth/google`, "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
    };

    return (
        <>
            <div>
                <div className="py-4" style={{ minHeight: "calc(100vh - 174px)" }}>
                    <div
                        className={`bg-white dark:bg-slate-800/70 rounded-md shadow-sm border max-w-xl w-full mx-auto overflow-hidden ${loadingLogin && "pointer-events-none opacity-70"}`}
                    >
                        <div
                            className={`loading-bar ${!loadingLogin && "before:content-none"}`}
                        ></div>
                        <div className="px-5 py-5">
                            <div className="mb-3">
                                <Link to={`/`} className="flex items-center justify-center">
                                    <h1 className="ml-2 font-bold text-2xl text-red-600 dark:text-white">TEST</h1>
                                </Link>
                            </div>
                            <div className="font-semibold text-center text-2xl mb-5">
                                Đăng nhập
                            </div>
                            <div>
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="idInputEmail"
                                        className="select-none cursor-pointer mb-1 block"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="idInputEmail"
                                        name="email"
                                        value={dataLogin.email}
                                        onChange={eventChangeValueInput}
                                        className="border h-11 py-2 px-4 rounded-md w-full transition-all focus:border-blue-600 focus:outline outline-blue-600"
                                    />
                                </div>
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="idInputPassword"
                                        className="select-none cursor-pointer mb-1 block"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="idInputPassword"
                                        name="password"
                                        type="password"
                                        value={dataLogin.password}
                                        onChange={eventChangeValueInput}
                                        className="border h-11 py-2 px-4 rounded-md w-full transition-all focus:border-blue-600 focus:outline outline-blue-600"
                                    />
                                </div>
                                <div className="mb-3 text-blue-600 dark:text-gray-100 flex items-center gap-4">
                                    {/* <Link aria-label={`Quên mật khẩu`} href={`/`}><span className="hover:underline">Quên mật khẩu</span></Link> */}
                                    <div className="text-red-500 line-clamp-none mr-auto">{isError}</div>
                                    {/* <Link aria-label={`Đăng kí mới`} href={`/auth/register?returnurl=${(pathname === "/auth/login" || pathname === "/auth/register") ? returnurl || "/" : pathname}`}><span className="hover:underline">Đăng kí mới</span></Link> */}
                                </div>
    
                                <div
                                    onClick={handleLogin}
                                    className="mb-2 select-none border bg-blue-600 hover:bg-blue-700 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                                >
                                    Đăng nhập
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginTemplate;