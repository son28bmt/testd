const cloudinary = require("../lib/cloudinary");
const productServices = require("../services/product.services");
const path = require("path");
const userServices = require("../services/user.services");

class ProductController {
    // [GET] /api/products/:id
    async findOne(req, res) {
        try {
            const product = await productServices.findOne(req.params.productId);

            return res.json({
                success: true,
                product: product?.product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create products error",
            });
        }
    }
    

    // [GET] /api/products
    async findAll(req, res) {
        try {
            const { q = '', type = '' } = req.query
            console.log(type)

            const products = await productServices.findAll({ q: q, type: type });

            return res.json({
                success: true,
                products: products?.products,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get products error",
            });
        }
    }

    // [GET] /api/products/infoManager
    async infoManager(req, res) {
        try {
            const infoManager = await productServices.infoManager();

            return res.json({
                success: true,
                data: infoManager?.data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get products error",
            });
        }
    }

    // [PUT] /api/products
    async update(req, res) {
        try {
            const { title, type, price, inventory, description } = req.body;
            const product = await productServices.update({
                title,
                type,
                price: +price,
                inventory: +inventory,
                description,
                productId: +req.params.productId,
            });

            return res.json({
                success: true,
                product: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product error",
            });
        }
    }

    // [DELETE] /api/products
    async delete(req, res) {
        try {
            const product = await productServices.delete(req.params.productId);

            return res.json({
                success: true,
                product: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product error",
            });
        }
    }

    // [POST] /api/products
    async create(req, res) {
        try {
            console.log("product data: ", req.body);
            const getUserRes = await userServices.findById({
                userId: req.userId,
            });

            if (getUserRes?.success && getUserRes?.user.role !== "admin") {
                return res.status(400).json({
                    success: false,
                    message: "Bạn không phải quản trị viên",
                });
            }
            console.log("getUserRes: ", getUserRes);
            const { type, title, price, inventory, description, thumbnail, images } =
                req.body;
            const product = await productServices.create({
                title,
                price: +price,
                inventory: +inventory,
                description,
                thumbnail,
                images,
                type
            });
            console.log("product: ", product);

            return res.json({
                success: true,
                product: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product error",
            });
        }
    }

    // [POST] /api/products/image
    async uploadImage(req, res) {
        try {
            const image = await cloudinary.uploader.upload(req.file.path, {
                public_id: `${Date.now()}`,
                resouce_type: "auto",
                folder: "/BANHANG/products/images",
            });

            return res.json({
                success: true,
                image: image?.secure_url.replace(
                    "https://res.cloudinary.com/ddqufx5he/image/upload/v1713022912/BANHANG/products/images",
                    ""
                ),
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product error",
            });
        }
    }

    // [POST] /api/products/images
    async uploadImages(req, res) {
        try {
            console.log("files: ", 123);
            console.log("files: ", req.files);
            const images = [];
            for (const file of req.files) {
                const image = await cloudinary.uploader.upload(file.path, {
                    public_id: `${Date.now()}`,
                    resouce_type: "auto",
                    folder: "/BANHANG/products/images",
                });
                images.push(
                    image.secure_url.replace(
                        "https://res.cloudinary.com/ddqufx5he/image/upload/v1713028272/BANHANG/products/images/",
                        ""
                    )
                );
            }

            console.log(images);

            return res.json({
                success: true,
                images: images,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product error",
            });
        }
    }
}

module.exports = new ProductController();
