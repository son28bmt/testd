import { useContext, useState } from "react";
import OptionAdress from "./OptionAdress";
import { Link } from "react-router-dom";
import { ShowToastify } from "../../Share/ShowToastify";
import formatNumberToPrice from "../../../utils/formatNumberToPrice";
import LoadingDots from "../../Share/LoadingDots";
import InputQuantity from "../../Share/InputQuantity";
import { CartContext } from "../../../context/CartContextProvider";
import billService from "../../../services/bill.service";

const ShoppingCartTemplate = () => {
    const [products, setProducts] = useState(
        localStorage["cart"] ? JSON.parse(localStorage.getItem("cart")) : []
    );
    const [infoOreder, setInfoOreder] = useState({
        name: "",
        phone: "",
    });
    const [adressUser, setAdressUser] = useState({
        city: null,
        district: null,
        ward: null,
        specificAdress: "",
    });
    const [description, setDescription] = useState("");
    const [orderLoading, setOrderLoading] = useState(false);
    const {
        state: { countCart },
        setCountCart,
    } = useContext(CartContext);
    const [errorBuy, setErrorBuy] = useState(null);
    const [successBuy, setSuccessBuy] = useState(null);

    const handleRemoveProductCart = (productId) => {
        let cart = localStorage.getItem("cart");

        if (cart) {
            cart = JSON.parse(cart);
            const productIndex = cart.findIndex(
                (item) => item.productId == productId
            );
            if (productIndex !== -1) {
                cart.splice(productIndex, 1);

                localStorage.setItem("cart", JSON.stringify(cart));

                setProducts(cart);
                setCountCart(cart.length);
            }
        }
    };

    const onChangeValueForm = (e) => {
        setInfoOreder({
            ...infoOreder,
            [e.target.name]: e.target.value,
        });
    };

    const handleOrderProduct = async () => {
        if (products.length <= 0) {
            setErrorBuy("Chưa có sản phẩm nào trong giở hàng!");
            setTimeout(() => {
                setErrorBuy(null);
            }, 5000);
            return;
        }
        const { name, phone } = infoOreder;
        const { city, district, specificAdress, ward } = adressUser;
        if(!name || !phone || !city || !specificAdress || !ward) {
            alert("Bạn chưa điền đủ thông tin")
            return;
        }
        const atLeastOneProductHasZeroQuantity  = products.some(product => product.quantity === 0);
        if (atLeastOneProductHasZeroQuantity) {
            setErrorBuy("Không được có sản phẩm nào có số lượng mua bằng 0");
            setTimeout(() => {
                setErrorBuy(null);
            }, 5000);
            return;
        }

        try {
            const { name, phone } = infoOreder;
            const { city, district, ward, specificAdress } = adressUser;
            for (let i = 0; i < products?.length; i++) {
                const billRes = await billService.create({
                    productId: products[i].productId,
                    quantity: products[i].quantity,
                    info: JSON.stringify({
                        name: name,
                        phone: phone,
                        city: city,
                        district: district,
                        ward: ward,
                        specificAdress: specificAdress,
                        description: description,
                    }),
                });

                console.log(billRes);
            }

            
            setSuccessBuy("Đặt hàng thành công!");
            setTimeout(() => {
                setSuccessBuy(null);
            }, 5000);
            setProducts([]);
            setCountCart(0);
            setInfoOreder({
                name: "",
                phone: "",
            })
            setAdressUser({
                city: null,
                district: null,
                ward: null,
                specificAdress: "",
            })
            localStorage.setItem("cart", JSON.stringify([]));
            return;
        } catch (error) {
            console.log(error);
        }
    };

    const handleSetCountOrder = (productId, countP) => {
        let cart = localStorage.getItem("cart");
        let cartProducts = products;

        if (cart) {
            cart = JSON.parse(cart);
            const productLocal = cart.findIndex(
                (item) => item.productId == productId
            );
            const productFrontIndex = cartProducts.findIndex(
                (item) => item.productId == productId
            );

            console.log("cart: ", cart);
            console.log("productLocal: ", productLocal);
            console.log("productFront: ", productFrontIndex);

            if (productFrontIndex !== -1 && productLocal !== -1) {
                cart[productLocal].quantity = countP;
                cartProducts[productFrontIndex].quantity = countP;

                console.log("cartProducts: ", cartProducts);

                // localStorage.setItem("cart", JSON.stringify(cart));
                setProducts([...cartProducts]);
            }
        }
    };

    return (
        <main className="min-h-screen">
            <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full px-3 mx-auto text-black ">
                <div className="-mx-3">
                    <h1 className="font-semibold text-lg px-3 py-3 mb-3 border-b">
                        Giỏ hàng của bạn
                    </h1>

                    <div className="lg:flex">
                        <div className="lg:w-6/12 px-3 min-h-[100px]">
                            {products && products?.length ? (
                                products.map((product, index) => {
                                    return (
                                        <div
                                            id={product?.productId}
                                            key={product?.productId}
                                            className="relative flex mb-3 py-3 px-3 border-b bg-white border shadow-sm"
                                        >
                                            <div className="w-2/12 mt-2">
                                                <img
                                                    alt="Ảnh sản phẩm"
                                                    src={product?.thumbnail}
                                                    className="w-full bg-gray-100 overflow-hidden object-cover"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <p className="font-semibold text-lg mb-5">
                                                    {product?.title}
                                                </p>
                                                <div className="mb-3">
                                                    <div className="mb-2">
                                                        {product?.inventory} sản
                                                        phẩm có sẵn
                                                    </div>
                                                    <InputQuantity
                                                        value={
                                                            product?.quantity
                                                        }
                                                        quantity={
                                                            product.inventory
                                                        }
                                                        setValue={(countO) =>
                                                            handleSetCountOrder(
                                                                `${product.productId}`,
                                                                countO
                                                            )
                                                        }
                                                    />
                                                    <span>
                                                        Giá:{" "}
                                                        {formatNumberToPrice(
                                                            product?.price *
                                                                product?.quantity
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="font-semibold flex">
                                                    Tổng cộng:&emsp;
                                                    <span className="font-normal">
                                                        {formatNumberToPrice(
                                                            product?.quantity *
                                                                product?.price
                                                        )}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveProductCart(
                                                                `${product?.productId}`
                                                            )
                                                        }
                                                        className="hover:bg-gray-200 border rounded-sm px-6 py-1 ml-auto shadow-sm"
                                                    >
                                                        xóa
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="">
                                    Bạn chưa thêm sản phẩm nào vào giỏ hàng!{" "}
                                    <Link
                                        to={`/`}
                                        className="text-sky-600 underline whitespace-nowrap"
                                    >
                                        Mua ngay
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="lg:w-6/12 md:px-3">
                            <div className="px-4 py-6 bg-white border">
                                <div className="pt-5 pb-2 mt-3 border-t text-lg font-semibold text-black border-bltext-black">
                                    TỔNG TIỀN
                                </div>

                                <ul className="mb-4">
                                    {products && products.length > 0 ? (
                                        products.map((product, index) => {
                                            return (
                                                <li
                                                    className="flex border-b py-4"
                                                    key={product?.productId}
                                                >
                                                    <div className="w-2/12 mt-2">
                                                        <img
                                                            alt="Ảnh sản phẩm"
                                                            src={
                                                                product?.thumbnail
                                                            }
                                                            className="w-full bg-gray-100 overflow-hidden object-cover"
                                                        />
                                                    </div>
                                                    <div className="mr-2 ml-2 border-r flex-1">
                                                        <p className="line-clamp-2 mb-3">
                                                            {product?.name}
                                                        </p>
                                                    </div>
                                                    <span className="text-right whitespace-nowrap">
                                                        <strong className="font-semibold">
                                                            {product?.quantity}{" "}
                                                            X{" "}
                                                        </strong>
                                                        {formatNumberToPrice(
                                                            product?.price
                                                        )}
                                                    </span>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li>
                                            Chưa có sản phẩm nào trong giỏ hàng!
                                        </li>
                                    )}
                                </ul>

                                <div>
                                    <div className="flex justify-between font-medium mb-3">
                                        <span>Tạm tính:</span>
                                        <span>
                                            {products &&
                                                formatNumberToPrice(
                                                    products.reduce(
                                                        (sum, product) =>
                                                            sum +
                                                            product?.price *
                                                                product.quantity,
                                                        0
                                                    )
                                                ) + " VNĐ"}
                                        </span>
                                    </div>
                                </div>

                                <div className="py-5 my-3 border-t text-lg font-semibold text-black border-bltext-black">
                                    THÔNG TIN KHÁCH HÀNG
                                </div>
                                <input
                                    value={infoOreder.name}
                                    name="name"
                                    onChange={onChangeValueForm}
                                    placeholder="Họ và tên"
                                    className="input-info mb-4"
                                />
                                <input
                                    value={infoOreder.phone}
                                    name="phone"
                                    onChange={onChangeValueForm}
                                    placeholder="Số điện thoại"
                                    className="input-info mb-4"
                                />

                                <OptionAdress
                                    adressUser={adressUser}
                                    setAdressUser={setAdressUser}
                                />

                                <input
                                    value={adressUser.specificAdress}
                                    name="specificAdress"
                                    onChange={(e) =>
                                        setAdressUser({
                                            ...adressUser,
                                            specificAdress: e.target.value,
                                        })
                                    }
                                    placeholder="Địa chỉ cụ thể"
                                    className="input-info mb-4"
                                />

                                <textarea
                                    value={description}
                                    name="description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="w-full min-h-[200px] border rounded-sm px-3 py-2 outline:border-sky-600 outline-none"
                                    placeholder="Ghi chú"
                                />

                                <div className="h-7">
                                    <span className="text-red-600">
                                        {errorBuy}
                                    </span>
                                    <span className="text-blue-600">
                                        {successBuy}
                                    </span>
                                </div>

                                <button
                                    disabled={orderLoading}
                                    onClick={handleOrderProduct}
                                    className="font-semibold uppercase mt-5 py-3 w-full text-white bg-blue-500"
                                >
                                    {orderLoading ? (
                                        <LoadingDots color="#ffff" />
                                    ) : (
                                        <>Đặt hàng</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShoppingCartTemplate;
