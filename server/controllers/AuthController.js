const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const userServices = require("../services/user.services");

class AuthController {

    // [POST] /api/auth/register
    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            // Check User
            const getUserRes = await userServices.findByEmail({ email });
            if (getUserRes?.success && getUserRes?.user) {
                console.log(getUserRes.user);
                return res.status(400).json({
                    success: false,
                    message: "Tài khoản đã tồn tại",
                });
            }

            // Hash password
            const hashPassword = await argon2.hash(password);
            const userCreateRes = await userServices.create({ name, email, password: hashPassword });

            return res.json({
                success: true,
                user: userCreateRes?.user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }

    // [POST] /api/auth/login
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const getUserRes = await userServices.findByEmail({ email });
            if (!getUserRes.user) {
                return res.status(400).json({
                    success: false,
                    message: "Tài khoản hoặc mật khẩu không đúng",
                });
            }

            // Hash password
            const passwordValid = await argon2.verify(getUserRes?.user.password, password);
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: "Tài khoản hoặc mật khẩu không đúng",
                });
            }

            // JWT
            const accessToken = await jwt.sign(
                {
                    userId: getUserRes?.user.userId,
                },
                process.env.ACCESS_TOKEN_SETCRET
            );

            return res.json({
                success: true,
                user: {
                    userId: getUserRes?.user.userId
                },
                accessToken: accessToken,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }

    // [GET] /api/auth/check-token
    async checkToken(req, res) {
        try {
            const user = await userServices.findById(req.userId);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Token error",
                });
            };

            return res.json({
                success: true,
                user: {
                    userId: req.userId
                },
                message: "Token hợp lệ",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }
}

module.exports = new AuthController();