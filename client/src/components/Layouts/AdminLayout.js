import { Link, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect, useState, useRouter } from "react";
import { useMediaQuery } from "usehooks-ts";

import IconBars from "../Modules/Icons/IconBars";
import NavAccount from "../Partials/Header/NavAccout";
import IconUserNinja from "../Modules/Icons/IconUserNinja";
import { AuthContext } from "../../context/AuthContextProvider";

const contentNav = [
    {
        title: "Tạo sản phẩm",
        link: "/admin/create/product",
        icon: <IconUserNinja size={20} />,
    },
    {
        title: "Danh sách sản phẩm",
        link: "/admin/products",
        icon: <IconUserNinja size={20} />,
    },
    {
        title: "Danh sách đặt hàng",
        link: "/admin/orders",
        icon: <IconUserNinja size={20} />,
    },
    {
        title: "Danh sách xác nhận đặt hàng",
        link: "/admin/confirm/orders",
        icon: <IconUserNinja size={20} />,
    },
    // {
    //     title: "Truyện tranh",
    //     link: "/admin/books",
    //     icon: <IconBook size={20} />,
    // },
    // {
    //     title: "Hoạt động",
    //     link: "/admin/books/action",
    //     icon: <IconChartUser size={20} />,
    // },
];

const AdminLayout = ({ children, pathName }) => {
    const navigate = useNavigate();
    const [isSide, setIsSide] = useState(false);

    const matchesMobile = useMediaQuery("(max-width: 1024px)");
    const {state: { authLoading, isAuthenticated }, loginUser } = useContext(AuthContext);

    useEffect(() => {
        if(!authLoading && !isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated])

    return (
        <>
            <div className="">
                <header
                    className={`transition-all ease-out duration-300 z-10 ml-0 px-3 fixed bg-red border-b top-0 left-0 right-0`}
                >
                    <div className="h-[52px] relative flex items-center justify-between">
                        <Link to={"/"} title="">
                            <p className="font-semibold uppercase text-black rounded-sm px-2 py-1">
                                Trang Chủ 
                            </p>
                        </Link>
                        <div className=""><NavAccount /></div>
                    </div>
                </header>
                <aside className="">
                    <div
                        className={`w-full bg-white transition-all ease-out duration-300 top-0 bottom-0 border-r`}
                    >
                        <div className="py-4">
                            <Link to={`/`}>
                                <p className="select-none text-black-600 font-bold uppercase text-xl text-center">
                                    Trang Chủ Quản Lí Sản Phẩm
                                </p>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            {contentNav.map((item, index) => {
                                return (
                                    <div key={index} className="mb-1">
                                        <Link to={item?.link}>
                                            <div
                                                className={`mx-3 px-2 py-2 flex items-center space-x-2 rounded-md whitespace-nowrap overflow-hidden ${
                                                    item?.link === pathName
                                                        ? "text-white fill-white bg-red-500"
                                                        : "hover:bg-grey-100"
                                                }`}
                                            >
                                                <span
                                                    className={`${
                                                        !matchesMobile &&
                                                        isSide &&
                                                        "hidden"
                                                    }`}
                                                >
                                                    {item?.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>
                <div
                    className={`h-full transition-all ease-out duration-300 max-w-7xl mx-auto`}
                >
                    <div className="p-3">{children}</div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
