import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useOnClickOutside } from "usehooks-ts";


const NavAccout = () => {
    const {
        state: { authLoading, isAuthenticated, user }, logoutUser
    } = useContext(AuthContext);
    const dropdownNavAccountRef = useRef();
    useOnClickOutside(dropdownNavAccountRef, () => setIsNavAccount(false));

    const [isNavAccount, setIsNavAccount] = useState(false);

    return (
        <div className="z-20 text-black">
            {isAuthenticated ? (
                <div
                    ref={dropdownNavAccountRef}
                    className="relative h-[52px] flex items-center justify-center"
                >
                    <div
                        onClick={() => setIsNavAccount(true)}
                        className="relative transition-all duration-75 cursor-pointer active:scale-105 w-10 h-10 rounded-full overflow-hidden"
                    >
                        <img
                            loading="lazy"
                            alt="Ảnh người dùng"
                            src={`/static/images/logo-tr.png`}
                            className="absolute left-0 right-0 w-10 h-10 object-cover"
                        />
                    </div>
                    {isNavAccount && (
                        <div className="z-10 border rounded-md bg-white w-60 shadow-sm top-full right-0 py-1 absolute">
                            {user.userId === 1 && (
                                <Link
                                    title="Trang admin"
                                    to={`/admin/products`}
                                >
                                    <div
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        Admin
                                    </div>
                                </Link>
                            )}
                            
                            <div
                                onClick={() => logoutUser()}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                Đăng xuất
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center divide-x text-white">
                    <Link
                        to={`/auth/login`}
                        title="Trang đăng nhập"
                    >
                        <span className="px-2 py-1">Đăng nhập</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavAccout;
