import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../Share/Modal";
import formatNumberToPrice from "../../../../utils/formatNumberToPrice"
import productService from "../../../../services/product.service";

const AdminListProduct = () => {

    const [products, setProduct] = useState(null);
    const [isFormDeleteProduct, setIsFormDeleteProduct] = useState(null);

    const handleGetProducts = async () => {
        try {
            const productsRes = await productService.findAll();

            if(productsRes?.success) {
                setProduct(productsRes?.products)
            }
        } catch (error) {
            
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const productRes = await productService.delete(isFormDeleteProduct);

            if(productRes?.success) {
                let productsNew = [...products];
                const productIndex = productsNew.findIndex(item => item.productId == isFormDeleteProduct);
                
                if (productIndex !== -1) {
                    productsNew.splice(productIndex, 1);
                    setProduct(productsNew);
                }
            }

            setIsFormDeleteProduct(null);
        } catch (error) {
            setIsFormDeleteProduct(null);
        }
    }

    useEffect(() => {
        handleGetProducts();
    }, [])

    return (
        <div>
            <div>
                <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm">

                    <div className="overflow-y-auto relative border rounded-md mb-5">
                        <table className="table-auto w-full">
                            <colgroup>
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "40%" }} />
                                <col style={{ width: "40%" }} />
                                <col style={{ width: "10%" }} />
                            </colgroup>
                            <thead className="text-gray-600 bg-gray-100">
                                <tr className="whitespace-nowrap [&>th]:px-2 [&>th]:py-2 [&>th]:font-semibold">
                                    <th className="rounded-tl-md">Id</th>
                                    <th>Sản phẩm</th>
                                    <th>Mô tả</th>
                                    <th className="rounded-tr-md">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-sm">
                                {
                                    (products ? (
                                        products?.map((product, index) => {
                                            return (
                                                <tr
                                                    key={product?.productId}
                                                    className="[&>td]:px-2 [&>td]:py-2 divide-x"
                                                >
                                                    <td className="text-center">
                                                        {product?.productId}
                                                    </td>
                                                    <td className="">
                                                        <div className="flex">
                                                            <div className="w-20 h-28 flex-shrink-0 rounded-md border overflow-hidden mr-2">
                                                                <img
                                                                    alt=""
                                                                    className={`w-20 h-28 object-cover`}
                                                                    src={`${product?.thumbnail}`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="mb-2 hover:underline line-clamp-2">
                                                                    <strong>
                                                                        <Link
                                                                            to={`/truyen/${product?.productId}`}
                                                                            target="_blank"
                                                                        >
                                                                            {
                                                                                product?.title
                                                                            }
                                                                        </Link>
                                                                    </strong>
                                                                </div>
                                                                <div>Giá: {product?.price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="line-clamp-3">{(product?.description)}</div>
                                                    </td>
                                                    <td>
                                                        <div className="space-y-1">
                                                            <button
                                                                onClick={() => setIsFormDeleteProduct(product?.productId)}
                                                                className="btn bg-red-500 hover:bg-red-600 text-white"
                                                            >
                                                                Xóa
                                                            </button>
                                                            <Link
                                                                to={`/admin/edit/${product?.productId}`}
                                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                                            >
                                                                Sửa
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        // <SkeletonAdminItem count={20} />
                                        <div></div>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {!!isFormDeleteProduct && (
                <Modal
                    size="medium"
                    title="Xóa sản phẩm?"
                    isShow={!!isFormDeleteProduct}
                    setIsShow={(type) => setIsFormDeleteProduct(null)}
                >
                    <div className="">
                        Bạn không thể khôi phục sản phẩm này nếu xóa đi.
                    </div>

                    <div className="text-right mt-4 flex justify-end">
                        <button
                            title="Nút hủy phương thức"
                            onClick={() => setIsFormDeleteProduct(null)}
                            className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                        >
                            Hủy
                        </button>
                        <button
                            title="Nút xóa sản phẩm"
                            onClick={handleDeleteProduct}
                            className="py-2 px-3 flex items-center justify-center space-x-2 rounded-md border text-white bg-red-600 hover:bg-red-700 min-w-20 ml-2"
                        >
                            <span>Xóa</span>
                            {/* {nameTypeLoading === "button_delete_book" && (
                                <IconLoadingSpin size={14} />
                            )} */}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminListProduct;