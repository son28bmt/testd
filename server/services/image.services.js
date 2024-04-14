const pool = require("../database");

class ImageServices {
    async uploadImageProduct() {
        try {
            
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

}

module.exports = new ImageServices();