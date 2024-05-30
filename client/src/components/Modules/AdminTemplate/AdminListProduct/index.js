import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../Share/Modal";
import productService from "../../../../services/product.service";

const AdminListProduct = () => {

    const [products, setProduct] = useState(null);
    const [isFormDeleteProduct, setIsFormDeleteProduct] = useState(null);
    const [infoManager, setInfoManager] = useState({
        countDelete: 0,
        countmacbook: 0,
        countipad: 0,
        countiphone: 0,
        countwatch: 0,
        countairpods: 0,
        
    });

    const handleGetProducts = async () => {
        try {
            const productsRes = await productService.findAll({});
            const infoManagerRes = await productService.infoManager();
            
            if(productsRes?.success) {
                setProduct(productsRes?.products)
            }
            if(infoManagerRes?.success) {
                const { countmacbook, countipad,  countiphone, countwatch, countairpods } = infoManagerRes?.data;


                setInfoManager(state => ({
                    ...state,
                    
                    countairpods: countairpods,
                    countwatch: countwatch,
                    countiphone: countiphone,
                    countipad: countipad,
                    countmacbook: countmacbook,

                
                }))
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
                    setInfoManager(state => ({
                        ...state,
                        countDelete: infoManager?.countDelete + 1
                    }))
                    localStorage.setItem("countDelete", infoManager?.countDelete + 1);
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

    useEffect(() => {
        if(products?.length > 0) {
            const countDelete = localStorage.getItem("countDelete");
            if(countDelete) {
                setInfoManager(state => ({
                    ...state,
                    countDelete: Number(countDelete)
                }));
            }
            else {
                localStorage.setItem("countDelete", 0);
                setInfoManager(0);
            }
        }
    }, [products])

    const formatFullDateTime = (isoString) => {
        const date = new Date(isoString);
    
        const dayOfWeek = [
            "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
        ][date.getUTCDay()];
    
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours() + 7;
        const minutes = date.getUTCMinutes();
    
        const formattedDateTime = `${dayOfWeek}, ${day}/${month}/${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
        return formattedDateTime;
    }

    return (
        <div>
            <div>
                <div className="bg-white px-3 py-4 rounded-md shadow-sm">



                <table className="table-auto w-full text-center">
  <thead>
    <tr>
      <th className="px-4 py-2">Thông tin</th>
      <th className="px-4 py-2">Số lượng</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td className="border px-4 py-2">Số lượng sản phẩm hiện có</td>
      <td className="border px-4 py-2">{products?.length}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượng sản phẩm từng tạo</td>
      <td className="border px-4 py-2">{products?.length + infoManager?.countDelete}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượng sản phẩm từng xóa</td>
      <td className="border px-4 py-2">{infoManager?.countDelete}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượt sản phẩm macbook</td>
      <td className="border px-4 py-2">{infoManager?.countmacbook}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượt sản phẩm ipad</td>
      <td className="border px-4 py-2">{infoManager?.countipad}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượt sản phẩm iphone</td>
      <td className="border px-4 py-2">{infoManager?.countiphone}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượt sản phẩm watch</td>
      <td className="border px-4 py-2">{infoManager?.countwatch}</td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Số lượt sản phẩm airpods</td>
      <td className="border px-4 py-2">{infoManager?.countairpods}</td>
    </tr>
    
    <tr>
  <td className="border px-4 py-2">Số lượng sản phẩm macbook hiện có</td>
  <td className="border px-4 py-2">{products?.filter(product => product.type === 'macbook').reduce((total, product) => total + product.inventory, 0)}</td>
</tr>
<tr>
  <td className="border px-4 py-2">Số lượng sản phẩm ipad hiện có</td>
  <td className="border px-4 py-2">{products?.filter(product => product.type === 'ipad').reduce((total, product) => total + product.inventory, 0)}</td>
</tr>
<tr>
  <td className="border px-4 py-2">Số lượng sản phẩm iphone hiện có</td>
  <td className="border px-4 py-2">{products?.filter(product => product.type === 'iphone').reduce((total, product) => total + product.inventory, 0)}</td>
</tr>
<tr>
  <td className="border px-4 py-2">Số lượng sản phẩm watch có</td>
  <td className="border px-4 py-2">{products?.filter(product => product.type === 'watch').reduce((total, product) => total + product.inventory, 0)}</td>
</tr>
<tr>
  <td className="border px-4 py-2">Số lượng sản phẩm airpods hiện có</td>
  <td className="border px-4 py-2">{products?.filter(product => product.type === 'airpods').reduce((total, product) => total + product.inventory, 0)}</td>
</tr>
    
    <tr>
  <td className="border px-4 py-2 font-semibold">Tổng số lượng tất cả sản phẩm</td>
  <td className="border px-4 py-2 font-semibold">
    {products?.reduce((total, product) => total + (product?.inventory || 0), 0)}
  </td>
</tr>
    
  </tbody>
</table>


                    <div className="overflow-y-auto relative border rounded-md mb-5">
                                     <table className="table-auto w-full">
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "30%" }} /> 
                            <col style={{ width: "20%" }} /> 
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} /> {/* đang thùaw */}
                        </colgroup>
                        <thead className="text-gray-600 bg-gray-100">
                            <tr className="whitespace-nowrap [&>th]:px-2 [&>th]:py-2 [&>th]:font-semibold">
                                <th className="rounded-tl-md">STT</th>
                                <th>Sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Thời gian tạo</th>
                                <th>Số lượng</th> 
                                <th className="rounded-tr-md">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {
                                products ? (
                                    products.map((product, index) => {
                                        return (
                                            <tr
                                                key={product?.productId}
                                                className="[&>td]:px-2 [&>td]:py-2 divide-x"
                                            >
                                                <td className="text-center">
                                                    {index + 1}
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
                                                                        to={`/san-pham/${product?.productId}`}
                                                                        target="_blank"
                                                                    >
                                                                        {product?.title}
                                                                    </Link>
                                                                </strong>
                                                            </div>
                                                            <div>Giá: {product?.price}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="line-clamp-3">{product?.description}</div>
                                                </td>
                                                <td>
                                                    {formatFullDateTime(product?.createdAt)}
                                                </td>
                                                <td className="text-center"> {/* New table cell for quantity */}
                                                    {product?.inventory}
                                                </td>
                                                <td>
                                                    <div className="space-y-1">
                                                        <button
                                                            onClick={() => setIsFormDeleteProduct(product?.productId)}
                                                            className="btn bg-red-500 hover:bg-red-600 text-white"
                                                        >
                                                            delete
                                                        </button>
                                                        <Link
                                                            to={`/admin/edit/${product?.productId}`}
                                                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                                        >
                                                            edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <div></div>
                                )
                            }
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