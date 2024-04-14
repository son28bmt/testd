import { Fragment, useEffect, useState } from "react"
import productService from "../../../services/product.service";
import CardProduct from "../../Share/CardProduct";

const HomeTemplate = () => {

    const [products, setProducts] = useState(null);

    async function getProducts() {
        try {
            const productsRes = await productService.findAll();

            if(productsRes?.success) {
                setProducts(productsRes?.products);
            }
            else {
                setProducts([]);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    

    return (
        <main className="min-h-[500px] py-3">
            <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full px-3 mx-auto text-black">
                <div>
                    <h1 className="font-semibold text-lg mb-2">Sản phẩm mới</h1>
                    <div className="grid lg:grid-cols-4 grid-cols-2">
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
    )
}

export default HomeTemplate;