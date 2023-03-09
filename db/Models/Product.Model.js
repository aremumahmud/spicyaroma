const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Product = new Schema({
    price: {
        require: true,
        type: Number
    },
    name: {
        require: true,
        type: String
    },
    picture: {
        require: true,
        type: String
    },
    currency: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('Product', Product)