const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }],
}, { timestamps: true });

const CartCollection = new mongoose.model("Cart", CartSchema);

module.exports = CartCollection;