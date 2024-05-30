import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContextProvider";
import NavAccout from "./NavAccout"
import IconCartShopping from "../../Modules/Icons/IconCartShopping"
import SearchMain from "./SearchMain";

const Header = () => {
    const {
        state: { authLoading, isAuthenticated, user },
    } = useContext(AuthContext);

    const {
        state: { countCart },
    } = useContext(CartContext);

    return (
        <header
            style={{ background: "#808080" }}
            className={`top-0 left-0 right-0 shadow-sm transition-all`}
        >
            <div className="flex items-center justify-between max-w-screen-xl mx-auto px-3 h-[40px]">
                <Link to={"/"} title="VESMART">
                    <p className="text-white text-xl font-extrabold uppercase rounded-sm px-2 py-1">
                        Trang Chủ
                    </p>
                </Link>

                {
                    <div className="lg:mr-auto !ml-auto mr-2 md:max-w-lg md:w-full">
                        <SearchMain />
                    </div>
                }

                <div className="ml-auto relative">
                    <Link to={`/gio-hang`}>
                        <IconCartShopping className="shopee-svg-icon navbar__link-icon icon-shopping-cart-2" />

                        {
                            countCart > 0 &&
                            <span className="absolute -top-1/4 -right-1/4 bg-red-500 px-1 rounded-sm text-white">
                                {countCart}
                            </span>
                        }
                    </Link>
                </div>

                <div className="ml-5 flex items-center">
                    {authLoading ? (
                        <span className="w-[38px] h-[38px] rounded-full bg-gray-100"></span>
                    ) : (
                        <NavAccout />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
