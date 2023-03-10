const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Order = new Schema({
    email: {
        require: true,
        type: String
    },
    orderComprise: [],
    completed: Boolean
})

module.exports = mongoose.model('Order', Order)