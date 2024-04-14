const pool = require("../database");

class UserServices {
    async create({ name, email, password }) {
        try {
            const [rows] = await pool.query(
                `INSERT INTO user(name, email, password, role) VALUES(?, ?, ?, ?)`,
                [name, email, password, "guest"]
            );

            return {
                success: true,
                user: rows,
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create user",
            });
        }
    }

    async findByEmail({ email }) {
        try {
            const [rows] = await pool.query(
                `SELECT userId, name, email, role, password FROM user WHERE email = ?`,
                [email]
            );

            return {
                success: true,
                user: rows[0],
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create user",
            });
        }
    }

    async findById({ userId }) {
        try {
            const [rows] = await pool.query(
                `SELECT userId, name, email, role FROM user WHERE userId = ?`,
                [userId]
            );

            return {
                success: true,
                user: rows[0],
            };
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Create user",
            });
        }
    }
}

module.exports = new UserServices();
