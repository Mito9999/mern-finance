const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        username: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Exercise", transactionSchema);

module.exports = Transaction;
