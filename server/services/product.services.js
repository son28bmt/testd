const pool = require("../database");

class ProductServices {
    async findOne(productId) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM product WHERE productId = ?`,
                [productId]
            );

            return {
                success: true,
                product: rows[0],
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get product error",
            });
        }
    }

    async findAll({ q, type }) {
        try {
            let query = "SELECT * FROM product";
            if (type && type.length > 0) {
                query += ' WHERE type = "' + type + '"';
            }
            if (q && q.length > 0) {
                if (type && type.length > 0) {
                    query += ' AND title LIKE "%' + q + '%"';
                } else {
                    query += ' WHERE title LIKE "%' + q + '%"';
                }
            }
            console.log(query + " ORDER BY createdAt DESC");
            const [rows] = await pool.query(query + " ORDER BY createdAt DESC");
            console.log(rows)

            return {
                success: true,
                products: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get products",
            });
        }
    }

    async infoManager() {
        try {
            const [rowsmacbook] = await pool.query(
                'SELECT COUNT(productId) AS count FROM product WHERE type = "macbook"'
            );
            const [rowsipad] = await pool.query(
                'SELECT COUNT(productId) AS count FROM product WHERE type = "ipad"'
            );
            const [rowsiphone] = await pool.query(
                'SELECT COUNT(productId) AS count FROM product WHERE type = "iphone"'
            );
            const [rowswatch] = await pool.query(
                'SELECT COUNT(productId) AS count FROM product WHERE type = "watch"'
            );
            const [rowsairpods] = await pool.query(
                'SELECT COUNT(productId) AS count FROM product WHERE type = "airpods"'
            );
            

            


            return {
                success: true,
                data: {
                    countmacbook: rowsmacbook[0].count, // Truy cập giá trị count từ đối tượng đầu tiên của mảng
                    countipad: rowsipad[0].count, // Truy cập giá trị count từ đối tượng đầu tiên của mảng
                    countiphone: rowsiphone[0].count, // Truy cập giá trị count từ đối tượng đầu tiên của mảng
                    countwatch: rowswatch[0].count, // Truy cập giá trị count từ đối tượng đầu tiên của mảng
                    countairpods: rowsairpods[0].count, // Truy cập giá trị count từ đối tượng đầu tiên của mảng
                    



                },
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Get products",
            });
        }
    }

    async update({ title, type, price, inventory, description, productId }) {
        try {
            console.log("data: ", {
                title,
                type,
                price,
                inventory,
                description,
                productId,
            });
            const [rows] = await pool.query(
                `UPDATE product SET title = ?, type = ?, price = ?, inventory = ?, description = ? WHERE productId = ?`,
                [title, type, price, inventory, description, productId]
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

    async create({
        type,
        title,
        price,
        inventory,
        description,
        thumbnail,
        images,
    }) {
        try {
            // console.log({ title, price, inventory, description, thumbnail, images });

            const [rows] = await pool.query(
                `INSERT INTO product(type, title, price, inventory, description, thumbnail, images) VALUES(?, ?, ?, ?, ?, ?, ?)`,
                [type, title, price, inventory, description, thumbnail, images]
            );

            console.log("rows: ", rows);

            return {
                success: true,
                product: rows,
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
