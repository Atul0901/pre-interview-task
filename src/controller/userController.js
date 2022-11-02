const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// .................................. Create User .............................//
const registerUser = async function (req, res) {
    try {
        let data = req.body;
        const saltRounds = 10;
        let password = data.password;


        data.password = await bcrypt.hash(password, saltRounds);

        const user = await userModel.create(data);
        return res
            .status(201)
            .send({ status: true, message: "User created successfully", data: user });
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message,
        });
    }
};

// .................................. Login User .................................//
const loginUser = async function (req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await userModel.findOne({ email });
        let validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                },
                "project5Group56",
                { expiresIn: "3h" }
            );
            res.status(200).send({
                status: true,
                message: "User login successfully",
                data: { userId: user._id, token: token },
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Invalid Credentials",
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error,
        });
    }
};

// .................................. Get User .............................//
const getUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        if (!ObjectId.isValid(userId)) {
            return res
                .status(400)
                .send({ status: false, message: "UserId is not valid" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
        }

        // authorization
        if (req.headers.userId !== user._id.toString())
            return res
                .status(403)
                .send({ status: false, msg: "You are not authorized...." });

        return res
            .status(200)
            .send({ status: true, age: "User profile details", data: user });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// .................................. Update User .............................//
const updateUser = async function (req, res) {
    try {
        let userId = req.params.userId;
        let data = req.body;

        const { fname, lname, email, phone, password } = data;
        let obj = {};

        if (fname) obj.fname = fname;
        if (lname) obj.lname = lname;
        if (email) {
            const existEmail = await userModel.findOne({ email });
            if (existEmail) {
                return res
                    .status(400)
                    .send({ status: false, message: "This email id is already in use" });
            }
            obj.email = email;
        }


        // ... validation for password ... //
        const saltRounds = 10;
        if (password) obj.password = await bcrypt.hash(password, saltRounds);

        if (phone) {
            const existPhone = await userModel.findOne({ phone });
            if (existPhone) {
                return res.status(400).send({
                    status: false,
                    message: "This phone number is already in use",
                });
            }
            obj.phone = phone;
        }



        const updateUserDetails = await userModel.findOneAndUpdate(
            { _id: userId },
            obj,
            { new: true }
        );

        if (!updateUserDetails) {
            return res.status(404).send({ status: false, msg: "User not found" });
        }
        return res.status(200).send({
            status: true,
            message: "User profile updated",
            data: updateUserDetails,
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
};
