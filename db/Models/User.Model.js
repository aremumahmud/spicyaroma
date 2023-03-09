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
        type: Schema.Types.ObjectId,
        ref: 'order'
    }]
})

module.exports = mongoose.model('User', User)