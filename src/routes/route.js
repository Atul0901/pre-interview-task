const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const validation = require("../validator/userValidation");
const productValidation = require("../validator/productValidator");
const auth = require("../middleware/auth");

// .................................. USER APIS .............................//
router.post(
    "/register",
    validation.validationForUser,
    userController.registerUser
);

router.post(
    "/login",
    validation.validationForLoginUser,
    userController.loginUser
);

router.get(
    "/user/:userId/profile",
    auth.Authentication,
    userController.getUser
);

router.put(
    "/user/:userId/profile",
    auth.Authentication,
    validation.validationForUpdateUser,
    userController.updateUser
);

// .................................. PRODUCT APIS .............................//
router.post(
    "/products",
    productValidation.validationForProduct,
    productController.createProduct
);

router.get("/products", productController.getProductbyQueryParams);

router.get("/products/:productId", productController.getProductbyParams);

router.put(
    "/products/:productId",
    productValidation.validationForUpdateProduct,
    productController.updateProduct
);

router.delete("/products/:productId", productController.deleteProduct);

router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available",
    });
});

module.exports = router;
