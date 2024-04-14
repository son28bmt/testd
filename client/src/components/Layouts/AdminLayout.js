import { Link } from "react-router-dom";
import { Suspense, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import IconBars from "../Modules/Icons/IconBars";
import NavAccount from "../Partials/Header/NavAccout"
import IconUserNinja from "../Modules/Icons/IconUserNinja";

const contentNav = [
    {
        title: "",
        children: [
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
        ],
    },
];

const AdminLayout = ({ children, pathName }) => {
    const [isSide, setIsSide] = useState(false);

    const matchesMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <>
            <div className="">
                <header
                    className={`transition-all ease-out duration-300 z-10 ml-0 px-3 fixed bg-white dark:bg-slate-700 border-b top-0 left-0 right-0 ${
                        isSide ? "lg:ml-16" : "lg:ml-72"
                    }`}
                >
                    <div className="h-[52px] relative flex items-center justify-between">
                        <button
                            onClick={() => setIsSide((state) => !state)}
                            title=""
                            className="hover:bg-gray-100 dark:hover:bg-gray-500 p-2 rounded-full"
                        >
                            <IconBars size={25} className="fill-gray-600 dark:fill-gray-100" />
                        </button>

                        <div className="ml-auto flex items-center">
                            <NavAccount />
                        </div>
                    </div>
                </header>
                <Suspense fallback={<div></div>}>
                    <aside className="">
                        {isSide && matchesMobile && (
                            <div
                                onClick={() => setIsSide(false)}
                                className="transition-all ease-out fixed z-[19] top-0 left-0 right-0 bottom-0 bg-black/30"
                            ></div>
                        )}
                        <div
                            className={`w-full z-[20] bg-white dark:bg-slate-700 fixed transition-all ease-out duration-300 ${
                                matchesMobile
                                    ? isSide
                                        ? "left-0 max-w-72"
                                        : "-left-72 max-w-72"
                                    : isSide
                                    ? "max-w-16"
                                    : "max-w-72"
                            } top-0 bottom-0 border-r`}
                        >
                            <div className="py-4">
                                <Link to={`/`}>
                                    <p className="select-none text-red-600 font-bold uppercase text-xl text-center">
                                        TEST
                                    </p>
                                </Link>
                            </div>
                            <div>
                                {contentNav.map((nav, index) => {
                                    return (
                                        <div key={index}>
                                            {nav.children.map(
                                                (item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="mb-1"
                                                        >
                                                            <Link
                                                                to={
                                                                    item?.link
                                                                }
                                                            >
                                                                <div
                                                                    className={`mx-3 px-2 py-2 dark:fill-white flex items-center space-x-2 rounded-md whitespace-nowrap overflow-hidden ${
                                                                        item?.link === pathName ? "text-white fill-white bg-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-500"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item?.icon
                                                                    }
                                                                    <span
                                                                        className={`${
                                                                            !matchesMobile &&
                                                                            isSide &&
                                                                            "hidden"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            item?.title
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </Suspense>
                <div
                    className={`h-full min-h-[calc(100vh-52px)] mt-[52px] transition-all ease-out duration-300 ${
                        isSide ? "lg:ml-16 ml-0" : "lg:ml-72 ml-0"
                    }`}
                >
                    <div className="p-3">{children}</div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
