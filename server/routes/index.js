const productRouter = require("./product");
const authRouter = require("./auth");
const billRouter = require("./bill");

function route(app) {

    app.use("/api/products", productRouter);
    app.use("/api/bills", billRouter);
    app.use("/api/auth", authRouter);
}

module.exports = route;