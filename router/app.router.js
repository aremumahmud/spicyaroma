const express = require('express')
const db = require('../db')
const bcrypt = require("bcrypt");
let { checkAuthenticated, checkNotAuthenticated } = require('../utils/utils')
const passport = require("passport");
const client = require('../redis-client/client')
const middleWareFactory = require('../middlewares')
let router = express.Router()


router
    .route('/')
    .get(middleWareFactory('home-visit'), (req, res) => {
        res.render('home.ejs')
    })


router
    .route('/dashboard')
    .get(checkAuthenticated, middleWareFactory('sucess-login'), (req, res) => {
        console.log(req.user)
        db.getAllProducts().then(products => {
            console.log(products)
            res.render("index.ejs", {
                email: req.user.email,
                id: req.user._id,
                products
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
        res.render("register.ejs");
    })
    .post(checkNotAuthenticated, async(req, res) => {
        try {
            const email = req.body.email
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            db.createUser(email, hashedPassword).then(user => {
                res.redirect("/login");
            }).catch(e => {
                res.redirect("/register");
            })

        } catch (e) {
            // console.log(e);
            res.redirect("/register");
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
            console.log(cart)
            res.json({
                status: 'OK',
                statusCode: '200',
                cart: JSON.parse(cart)
            })
        })
    })
    .post(checkAuthenticated, (req, res) => {
        let { cart, id } = req.body
        console.log(req.body)
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

router
    .route('/cacheOrders/:id')
    .get(checkAuthenticated, (req, res) => {
        client.get('order' + req.params.id, (err, order) => {
            if (err || !order) {
                return res.json({
                    status: 'not found',
                    statusCode: '404'
                })
            }
            res.json({
                status: 'OK',
                statusCode: '200',
                orders: JSON.parse(order)
            })
        })
    })
    .post(checkAuthenticated, (req, res) => {
        let { order, id } = req.body
        if (!order || !id) {
            return res.json({
                status: 'Bad Request',
                statusCode: '500'
            })
        }
        client.set('order' + id, order, (err, succ) => {
            if (err) return res.json({ status: 'failed' })
            res.json({
                status: 'OK',
                statusCode: '200',
            })
        })

    })



module.exports = router