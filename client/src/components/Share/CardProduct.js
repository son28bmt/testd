import { Link } from "react-router-dom";
import formatNumberToPrice from "../../utils/formatNumberToPrice";

const CardProduct = ({ product }) => {

    return (
        <div className="mx-1 mb-2 transition-all border border-transparent hover:border-red-600 hover:-translate-y-1">
            <Link to={`/san-pham/${product?.productId}`}>
                <div className="bg-white h-full">
                    <div>
                        <img
                            src={product?.thumbnail}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="px-3 py-3 h-28">
                        <h3 className="line-clamp-2">{product?.title}</h3>
                        <div className="mt-2">
                            <span className="text-lg text-red-500">{formatNumberToPrice(product?.price)} ₫</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardProduct;