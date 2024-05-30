import axios from "axios";
import { apiUrl } from "../context/constant"

class ProductService {

    async findOne(id) {
        try {
            const product = await axios.get(
                `${apiUrl}/api/products/${id}`,
            );
            return product.data;
        } catch (error) {
            return {
                success: false,
                message: "Get product error",
                error: error,
            };
        }
    }
    async findAll({ q = '', type = '' }) {
        try {
            console.log(type)
            const products = await axios.get(
                `${apiUrl}/api/products?q=${q}${type ? "&type=" + type : ""}`,
            );
            return products.data;
        } catch (error) {
            return {
                success: false,
                message: "Get products error",
                error: error,
            };
        }
    }
    async infoManager() {
        try {
            const infoManager = await axios.get(
                `${apiUrl}/api/products/infoManager`,
            );
            return infoManager.data;
        } catch (error) {
            return {
                success: false,
                message: "Get products error",
                error: error,
            };
        }
    }
    async uploadImage(file) {
        try {
            const image = await axios.post(
                `${apiUrl}/api/products/image`,
                file
            );
            return image.data;
        } catch (error) {
            return {
                success: false,
                message: "Upload image error",
                error: error,
            };
        }
    }
    async uploadImages(files) {
        try {
            const image = await axios.post(
                `${apiUrl}/api/products/images`,
                files,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return image.data;
        } catch (error) {
            return {
                success: false,
                message: "Upload image error",
                error: error,
            };
        }
    }

    async delete(productId) {
        try {
            const product = await axios.delete(
                `${apiUrl}/api/products/${productId}`
            );
            return product.data;
        } catch (error) {
            return {
                success: false,
                message: "Delete product error",
                error: error,
            };
        }
    }

    async update({ title, type, price, inventory, description, productId }) {
        try {
            const product = await axios.put(
                `${apiUrl}/api/products/${productId}`,
                {
                    title, type, price, inventory, description
                }
            );
            return product.data;
        } catch (error) {
            return {
                success: false,
                message: "Create product error",
                error: error,
            };
        }
    }

    async create({ type, title, price, inventory, description, thumbnail, images }) {
        try {
            const product = await axios.post(
                `${apiUrl}/api/products`,
                {
                    type, title, price, inventory, description, thumbnail, images
                }
            );
            return product.data;
        } catch (error) {
            return {
                success: false,
                message: "Create product error",
                error: error,
            };
        }
    }
}

const productService = new ProductService();

export default productService;