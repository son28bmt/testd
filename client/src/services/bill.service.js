import axios from "axios";
import { apiUrl } from "../context/constant"

class BillService {

    async findAll(status) {
        try {
            const bills = await axios.get(
                `${apiUrl}/api/bills?status=${status}`
            );
            return bills.data;
        } catch (error) {
            return {
                success: false,
                message: "Create bills error",
                error: error,
            };
        }
    }

    async create({ productId, quantity, info }) {
        try {
            const bill = await axios.post(
                `${apiUrl}/api/bills`,
                {
                    productId, quantity, info
                }
            );
            return bill.data;
        } catch (error) {
            return {
                success: false,
                message: "Create bill error",
                error: error,
            };
        }
    }

    async confirm(billId) {
        try {
            const bill = await axios.put(
                `${apiUrl}/api/bills/confirm/${billId}`
            );
            return bill.data;
        } catch (error) {
            return {
                success: false,
                message: "Update status bill error",
                error: error,
            };
        }
    }

    async delete(billId) {
        try {
            const bill = await axios.delete(
                `${apiUrl}/api/bills/${billId}`
            );
            return bill.data;
        } catch (error) {
            return {
                success: false,
                message: "Delete bill error",
                error: error,
            };
        }
    }
}

const billService = new BillService();

export default billService;