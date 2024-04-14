const pool = require("../database");

class ProductServices {
    async findOne(productId) {
        try {
            const [rows] = await pool.query(`SELECT * FROM product WHERE productId = ?`, [productId]);

            return {
                success: true,
                product: rows[0]
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get product error",
            });
        }
    }

    async findAll() {
        try {
            const [rows] = await pool.query(`SELECT * FROM product ORDER BY createdAt DESC`);

            return {
                success: true,
                products: rows
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get products",
            });
        }
    }

    async update({title, price, inventory, description, productId}) {
        try {
            console.log("data: ", {
                title,
                price,
                inventory,
                description,
                productId,
            })
            const [rows] = await pool.query(
                `UPDATE product SET title = ?, price = ?, inventory = ?, description = ? WHERE productId = ?`,
                [title, price, inventory, description, productId]
            );

            return {
                success: true,
                product: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill",
            });
        }
    }
    async delete(productId) {
        try {
            const [rows] = await pool.query(
                `DELETE FROM product WHERE productId = ?`,
                [productId]
            );

            return {
                success: true,
                product: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create bill",
            });
        }
    }

    async create({ title, price, inventory, description, thumbnail, images }) {
        try {
            // console.log({ title, price, inventory, description, thumbnail, images });

            const [rows] = await pool.query(
                `INSERT INTO product(title, price, inventory, description, thumbnail, images) VALUES(?, ?, ?, ?, ?, ?)`,
                [title, price, inventory, description, thumbnail, images]
            );

            console.log("rows: ", rows)

            return {
                success: true,
                product: rows
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create product error",
            });
        }
    }

}

module.exports = new ProductServices();