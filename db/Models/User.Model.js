const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    email: {
        require: true,
        unique: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    profile: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

module.exports = mongoose.model('User', User)