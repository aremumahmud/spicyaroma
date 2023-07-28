const express = require('express')
const db = require('../db')
const bcrypt = require("bcrypt");
let { checkAuthenticated, checkNotAuthenticated } = require('../utils/utils')
const passport = require("passport");
const client = require('../redis-client/client')
const middleWareFactory = require('../middlewares')
const err_key = require('../err_keys')
let router = express.Router()



router
    .route('/')
    .get(middleWareFactory('home-visit'), (req, res) => {
        res.render('home.ejs')
    })

router
    .route('/about')
    .get((req, res) => {
        res.render('about.ejs')
    })
router
    .route('/booking')
    .get((req, res) => {
        res.render('booking.ejs')
    })
router
    .route('/failed')
    .get((req, res) => {
        res.render('failed.ejs')
    })
router
    .route('/add_payment')
    .get((req, res) => {
        res.render('pay.ejs')
    })
router
    .route('/booking_success')
    .get((req, res) => {
        res.render('booking_sucess.ejs')
    })
router
    .route('/book_mistress')
    .post((req, res) => {
        res.redirect('/booking_success')
    })
router
    .route('/shopxxx')
    .get(middleWareFactory('sucess-login'), (req, res) => {
        // console.log(req.user)
        db.getAllProducts().then(products => {
            //  console.log(products)
            let parameters, errorMsg, page;

            if (req.query.type == 'error') {
                parameters = err_key[req.query.id]
                if (parameters) {
                    errorMsg = parameters.errMsg
                    page = parameters.page
                }
            }
            // return res.render('error.ejs')
            res.render("index.ejs", {

                products,
                errorMsg,
                page
            });
        }).catch(e => {
            res.send('an error occured')
        })

    })


router
    .route('/login')
    .get(checkNotAuthenticated, middleWareFactory('login-visit'), (req, res) => {
        // console.log(req.session)
        res.render("login.ejs");
    })
    .post(checkNotAuthenticated,
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })
    )


router
    .route('/register')
    .get(checkNotAuthenticated, middleWareFactory('login-visit'), (req, res) => {
        let err = req.query.error
        if (err == 'exist') {
            return res.render("register.ejs", { error: 'User exists!' });
        } else if (err == 'unknown') {
            return res.render("register.ejs", { error: 'an unexpected error occured' });
        }
        res.render("register.ejs", { error: null });

    })
    .post(checkNotAuthenticated, async(req, res) => {
        try {
            const email = req.body.email
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            db.createUser(email, hashedPassword).then(user => {
                res.redirect("/login");
            }).catch(e => {
                res.redirect("/register?error=exist");
            })

        } catch (e) {
            // console.log(e);
            res.redirect("/register?error=unknown");
        }

        // check if the user is successfully added to array
        // console.log(users);
    })



router
    .route('/logout')
    .delete((req, res) => {
        req.logOut(() => {});
        res.redirect("/login");
    })



router
    .route('/cacheCart/:id')
    .get(checkAuthenticated, (req, res) => {
        client.get('cart' + req.params.id, (err, cart) => {
            if (err || !cart) {
                return res.json({
                    status: 'not found',
                    statusCode: '404'
                })
            }
            //console.log(cart)
            res.json({
                status: 'OK',
                statusCode: '200',
                cart: JSON.parse(cart)
            })
        })
    })
    .post(checkAuthenticated, (req, res) => {
        let { cart, id } = req.body
            // console.log(req.body)
        if (!cart || !id) {
            return res.json({
                status: 'Bad Request',
                statusCode: '500'
            })
        }
        client.set('cart' + id, cart, (err, succ) => {
            if (err) return res.json({ status: 'failed' })
            res.json({
                status: 'OK',
                statusCode: '200',
            })
        })

    })

// router
//     .route('/cacheOrders/:id')
//     .get(checkAuthenticated, (req, res) => {
//         client.get('order' + req.params.id, (err, order) => {
//             if (err || !order) {
//                 return res.json({
//                     status: 'not found',
//                     statusCode: '404'
//                 })
//             }
//             res.json({
//                 status: 'OK',
//                 statusCode: '200',
//                 orders: JSON.parse(order)
//             })
//         })
//     })
//     .post(checkAuthenticated, (req, res) => {
//         let { order, id } = req.body
//         if (!order || !id) {
//             return res.json({
//                 status: 'Bad Request',
//                 statusCode: '500'
//             })
//         }
//         client.set('order' + id, order, (err, succ) => {
//             if (err) return res.json({ status: 'failed' })
//             res.json({
//                 status: 'OK',
//                 statusCode: '200',
//             })
//         })

//     })


router
    .route('/cacheOrders/:id')
    .get(checkAuthenticated, (req, res) => {
        let id = req.params.id
        client.get('orders' + id, (err, resp) => {
            //console.log(resp)
            if (err || !resp) {
                //  console.log('allo')
                db.fetchAllOrders(id).then(orders => {
                    res.json({
                        status: 'OK',
                        statusCode: '200',
                        orders
                    })
                    client.set('orders' + id, JSON.stringify(orders), () => {})
                }).catch(e => {
                    return res.json({
                        status: 'Bad Request',
                        statusCode: '500'
                    })
                })
            } else {
                // console.log('allo1')
                return res.json({
                    status: 'OK',
                    statusCode: '200',
                    orders: JSON.parse(resp)
                })
            }
        })
    })


module.exports = router