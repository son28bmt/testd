import { Link } from "react-router-dom";
import Footer from "../Partials/Footer";
import Header from "../Partials/Header";

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <nav className="top-0 left-0 right-0 mt-2">
                <div className="flex items-center justify-between max-w-screen-xl mx-auto px-3">
                    <Link to={"/?type=macbook"} className="flex-grow text-center">
                        <p className="font-semibold uppercase bg-white rounded-md px-4 py-2">
                            macbook
                        </p>
                    </Link>
                    <Link to={"/?type=ipad"} className="flex-grow text-center">
                        <p className="font-semibold uppercase bg-white rounded-md px-4 py-2">
                            ipad
                        </p>
                    </Link>
                    <Link to={"/?type=iphone"} className="flex-grow text-center">
                        <p className="font-semibold uppercase bg-white rounded-md px-4 py-2">
                            iphone
                        </p>
                    </Link>
                    <Link to={"/?type=watch"} className="flex-grow text-center">
                        <p className="font-semibold uppercase bg-white rounded-md px-4 py-2">
                            watch
                        </p>
                    </Link>
                    <Link to={"/?type=airpods"} className="flex-grow text-center">
                        <p className="font-semibold uppercase bg-white rounded-md px-4 py-2">
                            airpods
                        </p>
                    </Link>
                </div>
            </nav>
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
};

export default MainLayout;
