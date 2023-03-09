const express = require('express')
const db = require('../db')
const bcrypt = require("bcrypt");
let { checkAuthenticated, checkNotAuthenticated } = require('../utils/utils')
const passport = require("passport");

let router = express.Router()


router
    .route('/')
    .get((req, res) => {
        res.render('home.ejs')
    })


router
    .route('/dashboard')
    .get(checkAuthenticated, (req, res) => {
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
    .get(checkNotAuthenticated, (req, res) => {
        console.log(req.session)
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
    .get(checkNotAuthenticated, (req, res) => {
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





module.exports = router