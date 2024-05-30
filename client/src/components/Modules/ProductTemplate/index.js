import Gallery from "./Gallery";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../services/product.service";
import formatNumberToPrice from "../../../utils/formatNumberToPrice";
import IconCartShopping from "../Icons/IconCartShopping";
import InputQuantity from "../../Share/InputQuantity";
import { CartContext } from "../../../context/CartContextProvider";

const ProductTemplate = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [countProduct, setCountProduct] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(0);
    const [errorBuy, setErrorBuy] = useState(null);
    const [successBuy, setSuccessBuy] = useState(null);

    const {
        state: { countCart },
        setCountCart,
    } = useContext(CartContext);

    async function getProduct() {
        try {
            const productRes = await productService.findOne(id);

            if (productRes?.success) {
                setProduct(productRes?.product);
            } else {
                setProduct([]);
            }
        } catch (error) {}
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    const handleAddCartProduct = () => {
        if (countProduct === 0) {
            setErrorBuy("Bạn chưa thêm số lượng đơn hàng!");
            setTimeout(() => {
                setErrorBuy(null);
            }, 5000);
            return;
        }

        try {
            let cart = localStorage.getItem("cart");

            if (cart) {
                cart = JSON.parse(cart);
                const existingProductIndex = cart.findIndex(
                    (item) => item.productId === product?.productId
                );

                const newListImages = [
                    product?.thumbnail,
                    ...JSON.parse(product?.images),
                ]
                if (existingProductIndex !== -1) {
                    setErrorBuy("Sản phẩm đã tồn tại trong giỏ hàng!");
                    setTimeout(() => {
                        setErrorBuy(null);
                    }, 5000);
                    return;
                } else {
                    const productBuy = {
                        title: product?.title,
                        thumbnail: newListImages[thumbsSwiper],
                        inventory: product?.inventory,
                        productId: product?.productId,
                        price: product?.price,
                        quantity: countProduct,
                    };
                    cart.push(productBuy);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                setCountCart(cart.length);
            } else {
                const productBuy = {
                    title: product?.title,
                    thumbnail: product?.thumbnail,
                    inventory: product?.inventory,
                    productId: product?.productId,
                    price: product?.price,
                    quantity: countProduct,
                };
                setCountCart(1);
                localStorage.setItem("cart", JSON.stringify([productBuy]));
            }

            setSuccessBuy("Thêm vào giỏ hàng thành công!");
            setTimeout(() => {
                setSuccessBuy(null);
            }, 5000);
        return;
        } catch (error) {}
    };
    const renderTextWithLineBreaks = (text) => {
        const lines = text.split("\n\n");
        return lines.map((line, index) => (
            <div key={index} className="mb-3">
                {line}
            </div>
        ));
    };

    return (
        <main className="min-h-[500px] py-3">
            <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full px-3 mx-auto text-black">
                <div>
                    {product ? (
                        <>
                            <div className="md:flex bg-gradient-to-r from-black-500 to-pink-500 shadow-md rounded-md py-4 transition-all hover:shadow-lg">
                                 <div className="relative md:w-4/12 px-3 mb-3">
                                         <div className="overflow-hidden max-w-md:max-w-[400px]">
                                        <Gallery
                                            key={product?.productId}
                                            thumbsSwiper={thumbsSwiper}
                                            setThumbsSwiper={setThumbsSwiper}
                                            images={[
                                                product?.thumbnail,
                                                ...JSON.parse(product?.images),
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="relative md:w-8/12 px-3 mb-3">
                                    <div className="mb-4">
                                        <h1 key={product?.productId} className="font-semibold text-2xl">
                                            {product?.title}
                                        </h1>
                                    </div>

                                    <div className="py-4 mb-4 flex items-end leading-none">
                                        <div className="font-semibold text-[30px] text-rose-500 mr-3">
                                            {formatNumberToPrice(
                                                product?.price || 0
                                            )} VNĐ
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="mb-2">
                                            {product?.inventory} sản phẩm có sẵn
                                        </div>
                                        <InputQuantity
                                            quantity={product?.inventory}
                                            value={countProduct}
                                            setValue={setCountProduct}
                                        />
                                    </div>

                                    <div className="h-7">
                                        <span className="text-red-600">
                                            {errorBuy}
                                        </span>
                                        <span className="text-blue-600">
                                            {successBuy}
                                        </span>
                                    </div>

                                    <div className="flex mb-4 max-w-[500px]">
                                        <button
                                            onClick={handleAddCartProduct}
                                            className="sm:py-3 py-2 px-1 flex items-center justify-center border bg-gray-600 hover:bg-green-700/90 text-white uppercase font-semibold select-none w-2/3 mr-2"
                                        >
                                            <IconCartShopping
                                                size={25}
                                                className="fill-red mb-1 mr-1"
                                            />{" "}
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="py-4 px-3 bg-white rounded-md mt-3">
                                <h3 className="font-semibold text-lg">Mô tả</h3>
                                <div>
                                    {renderTextWithLineBreaks(
                                        product?.description
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductTemplate;
