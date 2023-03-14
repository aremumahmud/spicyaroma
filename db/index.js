const mongoose = require('mongoose')
const Uri = process.env.MONGOOSE_URI || 'mongodb://127.0.0.1:27017/testdb1'
const User = require('./Models/User.Model')
const Order = require('./Models/Order.Model')
const ProductModel = require('./Models/Product.Model')


mongoose.connect(Uri).then((succ) => {

    console.log('connected')
}).catch(err => {
    console.log('an error occured')
})

class Db {
    createUser(email, password) {
        return new Promise((res, rej) => {
            let newUser = new User({
                email,
                password
            }).save().then(result => {
                res()
            }).catch(err => {
                rej()
            })
        })

    }

    findUserById(userId) {
        return new Promise((res, rej) => {

            User.findById(userId)
                .populate({ path: 'orders', model: 'Order' })
                .then(result => {
                    // console.log(result)
                    res(result)
                }).catch(err => {
                    console.log(err)
                    rej()
                })

        })
    }

    findUserByEmail(email) {
        return new Promise((res, rej) => {

            User.findOne({ email })
                .populate({ path: 'orders', model: 'Order' })
                .then(result => {
                    // console.log(result)
                    res(result)
                }).catch(err => {
                    console.log(err)
                    rej()
                })

        })
    }

    fetchAllOrders(id) {
        return new Promise((res, rej) => {

            User.findById(id)
                .populate('orders')
                .then(result => {
                    let orders = result.orders
                    res(orders)
                }).catch(err => {
                    rej()
                })

        })
    }

    createOrder(userId, orderComprise) {
        return new Promise((res, rej) => {

            User.findById(userId).then(result => {
                let order = new Order({ email: result.email, orderComprise: [...orderComprise], completed: false, ts: new Date() })

                order.save().then(e => {
                    result.orders.push(order)
                        //console.log(order)
                    result.save().then(resp => {
                        //console.log(resp)
                        res(order)
                    }).catch(err => {
                        console.log('not found')
                        console.log(err)
                        rej()
                    })

                }).catch(err => {
                    console.log(err)
                    rej()
                })

            }).catch(err => {

                console.log(err)
                rej()
            })

        })
    }

    confirmOrder(id) {
        return new Promise((res, rej) => {
            Order.findById(id).then(order => {
                order.completed = true
                order.save().then(r => {
                    res()
                }).catch(e => {
                    rej()
                })
            }).catch(e => {
                rej()
            })
        })

    }

    insertProducts(array, done) {
        return new Promise((res, rej) => {
            ProductModel.insertMany([...array]).then((docs) => {
                // ...
                res(docs)
            }).catch((err) => {
                //  ...
                rej(err)
            })
        })
    }

    getAllProducts() {
        return new Promise((res, rej) => {
            ProductModel.find().then(docs => {
                let count = 0

                console.log(docs[0])
                res(docs)
            }).catch(e => {
                rej(e)
            })
        })
    }
}

module.exports = new Db()