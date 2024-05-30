import { useEffect, useRef, useState } from "react";
import IconLoadingSpin from "../../Icons/IconLoadingSpin"
import IconMagnifyingGlass from "../../Icons/IconMagnifyingGlass"
import productService from "../../../../services/product.service";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const showToastify = (data) => {
    return toast.success(`${data}!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

const AdminEditProduct = () => {
    const { productId } = useParams();
    const refInputThumbnail = useRef();
    const [isAction, setIsAction] = useState(false);
    const [dataProduct, setDataProduct] = useState({
        productId: null,
        title: "",
        price: 0,
        inventory: 0,
        description: "",
    });
    const [typeProduct, setTypeProduct] = useState("ao");
    const [thumbnail, setThumbnail] = useState({
        urlThumbnail: "",
        fileThumbnail: null,
        listImages: null
    })

    // Event OnChange Data Product
    const eventOnchangeDataProduct = (e) => {
        if(e.target.name === "price" || e.target.name === "inventory") {
            e.target.value = Number(e.target.value) || 0;
        }
        setDataProduct({
            ...dataProduct,
            [e.target.name]: e.target.value
        })
    }

    // Event OnChange Thumbnail
    const eventOnchangeThumbnail = (e) => {
        const fileImage = e.target.files[0];

        if(fileImage) {
            setThumbnail({
                urlThumbnail: URL.createObjectURL(fileImage),
                fileThumbnail: fileImage
            });
        }
    }

    const eventOnchangeImages = (e) => {
        const fileImage = e.target.files;

        if(fileImage) {
            setThumbnail({
                ...thumbnail,
                listImages: fileImage
            });
        }
    }

    // Handle Create Product
    const handleUpdateProduct = async () => {
        const { title, price, inventory, description } = dataProduct;
        setIsAction(true);
        
        try {
            const updateProductRes = await productService.update({
                title, type: typeProduct, price, inventory, description, productId
            });
            
            if(updateProductRes.success) {
                showToastify("Chỉnh sửa sản phẩm thành công");
                // setTimeout(() => {
                //     window.location.reload();
                // }, 5000);
            }

            setIsAction(false);
        } catch (error) {
            // setIsAction(false);
        }
    }

    const handleGetProduct = async () => {
        try {
            const productRes = await productService.findOne(productId);

            if(productRes?.success) {
                const { productId, type, title, price, inventory, description } = productRes.product;
                setDataProduct({
                    productId: productId,
                    title: title,
                    price: price,
                    inventory: inventory,
                    description: description,
                });
                setTypeProduct(type);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, [])
    
    return (
        <div>
            <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm">

                <div className="mb-3">
                    <label htmlFor="id-title" className="font-semibold text-base mb-2">
                        Tên sản phẩm
                    </label>
                    <input
                        id="id-title"
                        name="title"
                        value={dataProduct?.title}
                        onChange={eventOnchangeDataProduct}
                        className={`border h-10 px-4 rounded-md w-full outline-none`}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="id-price" className="font-semibold text-base mb-2">
                        Giá
                    </label>
                    <input
                        id="id-price"
                        name="price"
                        value={dataProduct?.price}
                        onChange={eventOnchangeDataProduct}
                        className={`border h-10 px-4 rounded-md w-full outline-none`}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="id-inventory" className="font-semibold text-base mb-2">
                        Số lượng sản phẩm
                    </label>
                    <input
                        id="id-inventory"
                        name="inventory"
                        value={dataProduct?.inventory}
                        onChange={eventOnchangeDataProduct}
                        className={`border h-10 px-4 rounded-md w-full outline-none`}
                    />
                </div>

                <div className="mb-4">
                    <select value={typeProduct} onChange={(event) => setTypeProduct(event.target.value)} className="border px-2 py-1 rounded-md">
                        <option value="macbook">macbook</option>
                        <option value="ipad">ipad</option>
                        <option value="iphone">iphone</option>
                        <option value="watch">watch</option>
                        <option value="airpods">airpods</option>

                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="id-descript" className="font-semibold text-base mb-2">
                        Mô tả
                    </label>
                    <textarea
                        id="id-descript"
                        name="description"
                        value={dataProduct?.description}
                        onChange={eventOnchangeDataProduct}
                        className={`border min-h-40 px-4 py-4 rounded-md w-full outline-none`}
                    />
                </div>

                <div className="flex justify-end text-white">
                    <button
                        onClick={handleUpdateProduct}
                        className="h-10 px-5 bg-blue-600 rounded-md min-w-20 ml-3 flex items-center justify-center"
                    >
                        {isAction ? (
                            <IconLoadingSpin />
                        ) : (
                            'Sửa'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminEditProduct;