import Footer from "../Partials/Footer"
import Header from "../Partials/Header"

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout;