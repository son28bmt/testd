import { Fragment, useEffect, useState } from "react";
import productService from "../../../services/product.service";
import CardProduct from "../../Share/CardProduct";
import { useSearchParams } from "react-router-dom";

const HomeTemplate = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState(null);

    async function getProducts() {
        try {
            const productsRes = await productService.findAll({ type: searchParams.get('type') });

            if(productsRes?.success) {
                setProducts(productsRes?.products);
            }
            else {
                setProducts([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [searchParams.get('type')]);

    return (
        <main className="min-h-[500px] py-3">
            <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full px-3 mx-auto text-black">
                <div className="text-center">
                    <h1 className="font-semibold text-lg mb-2">Sản phẩm mới</h1>
                    <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2">
                        {
                            products && products.map((product) => {
                                return (
                                    <Fragment key={product?.productId}>
                                        <CardProduct product={product}/>
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomeTemplate;
