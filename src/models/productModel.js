const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        style: {
            type: String
        },
        availableSizes: {
            type: [String],
            required: true
        },
        deletedAt: {
            type: Date,
            default: null
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
