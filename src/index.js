const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(multer().any())

mongoose
    .connect(
        "mongodb+srv://Atul_0901:Hfwt2iFlfIJLT4Kt@cluster0.7iymhpk.mongodb.net/preinterview1",
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("MongoDb is Connected"))
    .catch((err) => console.log((err)));

app.use("/", route);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

