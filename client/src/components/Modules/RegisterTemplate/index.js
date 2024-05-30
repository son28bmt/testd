import { useState } from "react";

import checkDataRegister from "../../../utils/checkDataRegister";
import authService from "../../../services/auth.service"
import InputForm from "../../Share/InputForm"
import { Link, useNavigate } from "react-router-dom";

const RegisterTemplate = () => {
    const navigate = useNavigate();
    
    const [isError, setIsError] = useState({});
    const [dataRegister, setDataRegister] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
    });
    const [loadingLogin, setLoadingLogin] = useState(false);

    const eventChangeValueInput = (e) => {
        delete isError[e.target.name]
        delete isError["common"]
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        if(Object.keys(isError).length !== 0) {
            return;
        }
        const { name, email, password, rePassword } = dataRegister;
        const errors = checkDataRegister({ name, email, password, rePassword });
        
        if(Object.keys(errors).length !== 0) {
            setIsError(errors);
            return;
        }

        setLoadingLogin(true);
        try {

            const result = await authService.register({ name, email, password })
            setLoadingLogin(false);

            console.log(result)
            if(result?.success) {
                navigate("/auth/login");
            }
            else if(!result?.success && result?.error ) {   
                setIsError({ common: "Server đang bảo trì" })
            }
            else {
                setIsError({ common: result?.message })
            }
            
        } catch (error) {
            setLoadingLogin(false);
        }
    };

    return (
        <>
            <div className="h-screen bg-no-repeat bg-contain" style={{ background: "URL('https://res.cloudinary.com/dqefgk4f2/image/upload/v1716816155/BANHANG/products/images/p5xsi7b1ehyzzoibmsg6.jpg')" }}>
                <div className="p-4 h-screen flex items-center">
                    <div
                        className={`bg-blue-900 rounded-md shadow-sm border max-w-xl w-full ml-auto overflow-hidden ${loadingLogin && "pointer-events-none"}`}
                    >
                        <div
                            className={`loading-bar ${!loadingLogin && "before:content-none"}`}
                        ></div>
                        <div className="px-5 py-100">
                            <div className="mb-5">
                                <Link to={`/`} className="flex items-center justify-center">
                                    <img className="h-10 w-10 object-cover" src="/static/images/logo-tr.png"/>
                                </Link>
                            </div>
                            <div className="font-semibold text-center text-2xl mb-5">
                                Đăng kí
                            </div>
                            <div className="mb-1">
                                <InputForm
                                    title="Tên"
                                    type="name"
                                    placehoder=""
                                    data={dataRegister?.name}
                                    setData={eventChangeValueInput}
                                    error={isError["name"]}
                                />
                                <InputForm
                                    title="Email"
                                    type="email"
                                    data={dataRegister?.email}
                                    setData={eventChangeValueInput}
                                    error={isError["email"]}
                                />
                                <InputForm
                                    title="Mật khẩu"
                                    type="password"
                                    data={dataRegister?.password}
                                    setData={eventChangeValueInput}
                                    error={isError["password"]}
                                />
                                <InputForm
                                    title="Nhập lại mật khẩu"
                                    type="rePassword"
                                    data={dataRegister?.rePassword}
                                    setData={eventChangeValueInput}
                                    error={isError["rePassword"]}
                                />
                            </div>
                            {isError["common"] && <div className="text-red-500 line-clamp-none mb-1">{isError["common"]}</div>}

                            <div className="pt-1">
                                <div
                                    onClick={handleRegister}
                                    className="mb-2 border select-none bg-blue-600 hover:bg-blue-700 active:bg-blue-700/90 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                                >
                                    Đăng kí
                                </div>
                            </div>

                            <div className="flex">
                                <Link
                                    to={`/auth/login`}
                                    title="Trang đăng nhập"
                                    className="px-2 py-1 text-blue-500 ml-auto"
                                >
                                    Đăng nhập
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterTemplate;