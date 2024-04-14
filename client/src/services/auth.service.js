import axios from "axios";
import { apiUrl } from "../context/constant"

class AuthService {

    async register({ name, email, password }) {
        try {
            const authRegister = await axios.post(
                `${apiUrl}/api/auth/register`,
                { name, email, password }
            );
            return authRegister.data;
        } catch (error) {
            return {
                success: false,
                message: "Register user error",
                error: error,
            };
        }
    }
}

const authService = new AuthService();

export default authService;