const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    reference: {
        type: String,
        required: true,
        unique: true
    },
    transactionStats: {
        type: Boolean,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    }
});

const PayTadi = mongoose.model("PayTadi", paySchema);

module.exports = PayTadi