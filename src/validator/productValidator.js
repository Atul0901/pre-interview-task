const productModel = require("../models/productModel");
const { checkBodyParams, isValidBody } = require("../validator/userValidation");



// Validation for length of characters
const lengthOfCharacter = function (value) {
    if (!/^\s*(?=[a-zA-Z])[\w\.\s]{3,25}\s*$/.test(value)) return false;
    else return true;
};

const descriptionLength = function (value) {
    if (!/^\s*(?=[a-zA-Z])[\w\.\,\s]{3,1000}\s*$/.test(value)) return false;
    else return true;
};


let isValidSize = (sizes) => {
    const availableSizes = ["S", "XS", "M", "X", "L", "XXL", "XL"];
    return sizes.every((e) => availableSizes.includes(e));
};

// validation for Profile image
function isValidImage(value) {
    const regEx = /.+\.(?:(jpg|gif|png|jpeg|jfif))/; //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
    const result = regEx.test(value);
    return result;
}

// ....................................... Validation for Product .................................//
const validationForProduct = async function (req, res, next) {
    try {
        let data = req.body;
        let {
            title,
            description,
            style,
            availableSizes,
            isDeleted,
        } = data;

        let productImage = req.files;
        if (productImage.length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Please Upload the productImage" });
        } else if (productImage.length > 1) {
            return res
                .status(400)
                .send({ status: false, message: "Please upload only one image" });
        }

        if (!isValidImage(productImage[0].originalname)) {
            return res.status(400).send({
                status: false,
                message:
                    "Please upload only image file with extension jpg, png, gif, jpeg ,jfif",
            });
        }

        if (!checkBodyParams(data)) {
            return res
                .status(400)
                .send({ status: false, message: "Please input Parameters" });
        }
        if (!isValidBody(title)) {
            return res.status(400).send({
                status: false,
                message: "Please provide title",
            });
        }
        if (!lengthOfCharacter(title)) {
            return res.status(400).send({
                status: false,
                message: "Please provide title with right format",
            });
        }
        const existTitle = await productModel.findOne({ title });
        if (existTitle) {
            return res
                .status(400)
                .send({ status: false, message: "This title is already in use" });
        }

        if (!isValidBody(description)) {
            return res.status(400).send({
                status: false,
                message: "Please provide description",
            });
        }
        if (!descriptionLength(description)) {
            return res.status(400).send({
                status: false,
                message: "Please provide description with right format",
            });
        }
        if (!isValidBody(style)) {
            return res.status(400).send({
                status: false,
                message: "Please enter style",
            });
        }
        if (!lengthOfCharacter(style)) {
            return res.status(400).send({
                status: false,
                message: "Please mention the style of the product",
            });
        }

        if (!availableSizes) {
            return res.status(400).send({
                status: false,
                message: "Please enter sizes of the product",
            });
        }

        availableSizes = availableSizes
            .split(",")
            .map((s) => s.trim().toUpperCase());

        if (!isValidSize(availableSizes)) {
            return res.status(400).send({
                status: false,
                message: "Size can only be S, XS, M, X, L, XXL, XL",
            });
        } else {
            data.availableSizes = availableSizes;
        }

        
        if (isDeleted) {
            return res.status(400).send({
                status: false,
                message: "you cannot delete an uncreated product",
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message,
        });
    }

    next();
};

// ....................................... Validation for Update Product .................................//

const validationForUpdateProduct = async function (req, res, next) {
    try {
        let data = req.body;
        let {
            title,
            description,
            style,
            availableSizes,
            isDeleted,
        } = data;

        let productImage = req.files;

        if (!checkBodyParams(data) && !productImage) {
            return res
                .status(400)
                .send({ status: false, message: "Please input Parameters" });
        }

        if (title != undefined) {
            if (!isValidBody(title)) {
                return res.status(400).send({
                    status: false,
                    message: "Please provide title",
                });
            }
            if (!lengthOfCharacter(title)) {
                return res.status(400).send({
                    status: false,
                    message: "Please provide title with right format",
                });
            }
        }
        if (description != undefined) {
            if (!isValidBody(description)) {
                return res.status(400).send({
                    status: false,
                    message: "Please provide description",
                });
            }
            if (!descriptionLength(description)) {
                return res.status(400).send({
                    status: false,
                    message: "Please provide description with right format",
                });
            }
        }
        if (style != undefined) {
            if (!isValidBody(style) && !lengthOfCharacter(style)) {
                return res.status(400).send({
                    status: false,
                    message: "Please mention the style of the product",
                });
            }
        }

        if (availableSizes != undefined) {
            availableSizes = availableSizes
                .split(",")
                .map((s) => s.trim().toUpperCase());

            if (!isValidSize(availableSizes)) {
                return res.status(400).send({
                    status: false,
                    message: "Size can only be S, XS, M, X, L, XXL, XL",
                });
            } else {
                data.availableSizes = availableSizes;
            }
        }
        if (isDeleted) {
            return res.status(400).send({
                status: false,
                message: "you cannot delete an uncreated product",
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message,
        });
    }

    next();
};

module.exports = { validationForProduct, validationForUpdateProduct };
