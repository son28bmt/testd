import "./App.css";
import HomeTemplate from "./components/Modules/HomeTemplate";

import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import LoginTemplate from "./components/Modules/LoginTemplate";
import AdminCreateProduct from "./components/Modules/AdminTemplate/AdminCreateProduct";
import ProductTemplate from "./components/Modules/ProductTemplate";
import ShoppingCartTemplate from "./components/Modules/ShoppingCartTemplate";
import AdminOrder from "./components/Modules/AdminTemplate/AdminOrder";
import AdminConfirmOrder from "./components/Modules/AdminTemplate/AdminConfirmOrder";
import AdminListProduct from "./components/Modules/AdminTemplate/AdminListProduct";
import RegisterTemplate from "./components/Modules/RegisterTemplate";
import AdminEditProduct from "./components/Modules/AdminTemplate/AdminEditProduct";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout><HomeTemplate /></MainLayout>}/>
                <Route path="/auth/login" element={<MainLayout><LoginTemplate /></MainLayout>}/>
                <Route path="/auth/register" element={<MainLayout><RegisterTemplate /></MainLayout>}/>
                <Route path="/san-pham/:id" element={<MainLayout><ProductTemplate /></MainLayout>}/>
                <Route path="/gio-hang" element={<MainLayout><ShoppingCartTemplate /></MainLayout>}/>

                <Route path="/admin/orders" element={<AdminLayout pathName={"/admin/orders"}><AdminOrder /></AdminLayout>}/>
                <Route path="/admin/edit/:productId" element={<AdminLayout pathName={"/admin/edit"}><AdminEditProduct /></AdminLayout>}/>
                <Route path="/admin/products" element={<AdminLayout pathName={"/admin/products"}><AdminListProduct /></AdminLayout>}/>
                <Route path="/admin/confirm/orders" element={<AdminLayout pathName={"/admin/confirm/orders"}><AdminConfirmOrder /></AdminLayout>}/>
                <Route path="/admin/create/product" element={<AdminLayout pathName={"/admin/create/product"}><AdminCreateProduct /></AdminLayout>}/>
            </Routes>
        </>
    );
}

export default App;
