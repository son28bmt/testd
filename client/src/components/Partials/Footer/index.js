import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full border-t bg-slate-900 text-white">
            <div className="w-full max-w-screen-xl mx-auto py-5 md:flex">
                <div className="lg:w-4/12 md:w-6/12 px-3 mb-4">
                    <p className="font-semibold text-lg mb-4">TEST</p>
                </div>
                <div className="lg:w-8/12 md:w-6/12 lg:flex px-3">
                    <div className="lg:w-1/3 mb-4">
                        <p className="mb-4 font-semibold">Thông tin liên hệ</p>
                        <ul>
                            <li className="mb-2">
                                <Link
                                    href={`/`}
                                >
                                    <div className="flex items-center hover:underline">
                                        <img
                                            width={50}
                                            height={50}
                                            alt="image"
                                            src={`/static/images/icons/facebook.png`}
                                            className="w-5 h-5 block"
                                        />
                                        <span className="ml-2 line-clamp-1">
                                            Fanpage cửa hàng
                                        </span>
                                    </div>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href={`/`}
                                >
                                    <div className="flex items-center hover:underline">
                                        <img
                                            width={50}
                                            height={50}
                                            alt="image"
                                            src={`/static/images/icons/zalo.png`}
                                            className="w-5 h-5 block"
                                        />
                                        <span className="ml-2 line-clamp-1">
                                            Chuyên viên bán hàng
                                        </span>
                                    </div>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href={`/`}
                                >
                                    <div className="flex items-center hover:underline">
                                        <img
                                            width={50}
                                            height={50}
                                            alt="image"
                                            src={`/static/images/icons/gmail.png`}
                                            className="w-5 h-5 block"
                                        />
                                        <span className="ml-2 line-clamp-1">
                                            TEST mail
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 mb-4">
                        <p className="mb-4 font-semibold">Các dịch vụ</p>
                        <ul>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Tư vấn
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Bán đồ dùng
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Chính sách đổi trả, khuyến mãi
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 mb-4">
                        <p className="mb-4 font-semibold">Khác</p>
                        <ul>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Hướng dẫn mua hàng
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Chính sách bảo mật
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Tuyển dụng
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
