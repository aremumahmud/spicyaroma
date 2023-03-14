const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Order = new Schema({
    email: {
        require: true,
        type: String
    },
    orderComprise: [],
    completed: Boolean,
    ts: Date
})

module.exports = mongoose.model('Order', Order)