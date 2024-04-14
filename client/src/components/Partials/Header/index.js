import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContextProvider";
import NavAccout from "./NavAccout"
import IconCartShopping from "../../Modules/Icons/IconCartShopping"

const Header = () => {
    const {
        state: { authLoading, isAuthenticated, user },
    } = useContext(AuthContext);

    const {
        state: { countCart },
    } = useContext(CartContext);

    return (
        <header
            className={`top-0 left-0 right-0 bg-white shadow-sm transition-all`}
        >
            <div className="flex items-center justify-between max-w-screen-xl mx-auto px-3 h-[52px]">
                <Link to={"/"} title="VESMART">
                    <p className="text-white font-semibold uppercase bg-sky-950 rounded-sm px-2 py-1">
                        TEST
                    </p>
                </Link>

                <div className="ml-auto relative">
                    <Link to={`/gio-hang`}>
                        <IconCartShopping className="h-7 w-7 fill-gray-500" />

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
                        <span className="w-[38px] h-[38px] rounded-full bg-gray-100 dark:bg-gray-500"></span>
                    ) : (
                        <NavAccout />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
