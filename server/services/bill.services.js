const pool = require("../database");

class BillServices {
    async findAll(status) {
        try {
            const [rows] = await pool.query(
                `
                    SELECT bill.*, product.productId, product.title, product.price, product.thumbnail FROM bill
                    JOIN product ON bill.productId = product.productId
                    WHERE bill.status = ?
                `,
                [String(status)]
            );

            return {
                success: true,
                bills: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get bills error",
            });
        }
    }

    async create({ productId, quantity, info }) {
        try {
            const [rows] = await pool.query(
                `INSERT INTO bill(productId, quantity, info) VALUES(?, ?, ?)`,
                [productId, quantity, info]
            );

            return {
                success: true,
                bill: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill",
            });
        }
    }

    async confirm(billId) {
        try {
            const [rows] = await pool.query(
                `UPDATE bill SET status = ? WHERE billId = ?`,
                ["1", billId]
            );

            return {
                success: true,
                bill: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Update bill error",
            });
        }
    }

    async delete(billId) {
        try {
            const [rows] = await pool.query(
                `DELETE FROM bill WHERE billId = ?`,
                [billId]
            );

            return {
                success: true,
                bill: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill",
            });
        }
    }
}

module.exports = new BillServices();
