require("dotenv").config()

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// const productRouter = require("./routes/product");
const route = require("./routes");

const PORT = process.env.PORT || 4001


const main = async () => {
    
    route(app);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}


main().catch((error) => console.log(error)) 