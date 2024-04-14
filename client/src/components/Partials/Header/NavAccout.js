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
        <div className="z-20">
            {isAuthenticated ? (
                <div
                    ref={dropdownNavAccountRef}
                    className="relative h-[52px] flex items-center justify-center"
                >
                    <div
                        onClick={() => setIsNavAccount(true)}
                        className="relative transition-all duration-75 cursor-pointer active:scale-105 w-10 h-10 rounded-full border overflow-hidden"
                    >
                        <img
                            loading="lazy"
                            alt="Ảnh người dùng"
                            src={`/static/images/avatar-default.png`}
                            className="absolute left-0 right-0 w-10 h-10 object-cover"
                        />
                    </div>
                    {isNavAccount && (
                        <div className="z-10 border rounded-md bg-white dark:bg-slate-800 w-60 shadow-sm top-full right-0 py-1 absolute">
                            {/* {session?.user.role.roleName === "admin" && (
                                <Link
                                    title="Trang admin"
                                    to={`/admin`}
                                    target="_blank"
                                >
                                    <div
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500"
                                    >
                                        Admin
                                    </div>
                                </Link>
                            )} */}
                            <Link to={`/admin/orders`} title="Trang điều khiển">
                                <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500">
                                    Admin
                                </div>
                            </Link>
                            <div
                                onClick={() => logoutUser()}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500"
                            >
                                Đăng xuất
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center divide-x">
                    <Link
                        to={`/auth/login`}
                        title="Trang đăng nhập"
                    >
                        <span className="px-2 py-1">Đăng nhập</span>
                    </Link>
                    <Link
                        to={`/auth/register`}
                        title="Trang đăng kí"
                    >
                        <span className="px-2 py-1">Đăng kí</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavAccout;
