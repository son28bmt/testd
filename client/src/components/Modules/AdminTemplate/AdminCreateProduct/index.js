import { useRef, useState } from "react";
import IconLoadingSpin from "../../Icons/IconLoadingSpin"
import IconMagnifyingGlass from "../../Icons/IconMagnifyingGlass"
import productService from "../../../../services/product.service";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const AdminCreateProduct = () => {
    const refInputThumbnail = useRef();
    const [isAction, setIsAction] = useState(false);
    const [dataProduct, setDataProduct] = useState({
        title: "",
        price: 0,
        inventory: 0,
        description: "",
    });
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
    const handleCreateProduct = async () => {
        const { title, price, inventory, description } = dataProduct;
        setIsAction(true);
        
        try {
            // Upload Thumbnail
            const formData = new FormData();
            formData.append("file", thumbnail?.fileThumbnail);
            const dataServerImage = await productService.uploadImage(formData);
            console.log("dataServerImage: ", dataServerImage);
            if(!dataServerImage?.success) {
                console.log("Upload image error");
                setIsAction(false);
                return;
            }
            
            // Upload Images
            const formDataImages = new FormData();
            for(let i=0; i<thumbnail.listImages.length; i++) {
                formDataImages.append(`files`, thumbnail.listImages[i]);
            }
            console.log("formDataImages: ", formDataImages)
            const dataServerImages = await productService.uploadImages(formDataImages);
            if(!dataServerImages?.success) {
                console.log("Upload images error");
                setIsAction(false);
                return;
            }
            
            const createProductRes = await productService.create({
                title, price, inventory, description, thumbnail: dataServerImage?.image, images: JSON.stringify(dataServerImages?.images)
            });
            
            console.log("createProductRes: ", createProductRes);
            if(createProductRes.success) {
                showToastify("Tạo sản phẩm thành công");
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }

            setIsAction(false);
        } catch (error) {
            // setIsAction(false);
        }
    }
    
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
                    <label htmlFor="id-thumbnai" className="font-semibold text-base mb-2">
                        Ảnh nền
                    </label>
                    <input
                        type="file"
                        accept='image/*'
                        id="id-thumbnai"
                        name="thumbnail"
                        ref={refInputThumbnail}
                        onChange={eventOnchangeThumbnail}
                        className={`border px-4 py-2 rounded-md w-full outline-none`}
                    />
                </div>

                {
                    thumbnail?.urlThumbnail && (
                        <div className="mb-3">
                            <img
                                src={thumbnail?.urlThumbnail}
                                className="w-[400px] h-[200px] rounded-md object-cover mb-2"
                            />
                            <button onClick={() => {
                                setThumbnail({ fileThumbnail: null, urlThumbnail: "" });
                                if(refInputThumbnail) {
                                    refInputThumbnail.current.value = "";
                                }
                            }} className="min-w-[100px] bg-red-500 text-white rounded-md py-2 px-3">Xóa</button>
                        </div>
                    )
                }

                <div className="mb-3">
                    <label htmlFor="id-images" className="font-semibold text-base mb-2">
                        Ảnh nhỏ (Nhiều hơn 1 tấm)
                    </label>
                    <input
                        type="file"
                        multiple='multiple'
                        accept='image/*'
                        id="id-images"
                        name="images"
                        onChange={eventOnchangeImages}
                        className={`border px-4 py-2 rounded-md w-full outline-none`}
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

                <div className="flex justify-end">
                    <button
                        onClick={handleCreateProduct}
                        className="h-10 px-5 bg-blue-600 rounded-md min-w-20 ml-3 flex items-center justify-center"
                    >
                        {isAction ? (
                            <IconLoadingSpin />
                        ) : (
                            <IconMagnifyingGlass className="fill-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateProduct;