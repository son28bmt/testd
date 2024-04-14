const cloudinary = require("../lib/cloudinary");
const productServices = require("../services/product.services");
const path = require("path");
const userServices = require("../services/user.services");
const billServices = require("../services/bill.services");

class ProductController {
    // [GET] /api/bills?status=1
    async findAll(req, res) {
        try {
            const { status = "0" } = req.query;
            const billsRes = await billServices.findAll(status);

            return res.json({
                success: true,
                bills: billsRes?.bills,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill error",
            });
        }
    }

    // [POST] /api/bills
    async create(req, res) {
        try {
            const { productId, quantity, info } = req.body;
            console.log({ productId, quantity, info });
            const bill = await billServices.create({
                productId,
                quantity,
                info
            });
            console.log("bill: ", bill);

            return res.json({
                success: true,
                bill: bill,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill error",
            });
        }
    }

    // [UPDATE] /api/bills/confirm/:billId
    async confirm(req, res) {
        try {
            const bill = await billServices.confirm(req.params.billId);

            return res.json({
                success: true,
                bill: bill,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Delete bill error",
            });
        }
    }

    // [DELETE] /api/bills
    async delete(req, res) {
        try {
            const bill = await billServices.delete(req.params.billId);

            return res.json({
                success: true,
                bill: bill,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill error",
            });
        }
    }

}

module.exports = new ProductController();
