const express = require('express')
let { checkAuthenticated } = require('../utils/utils')
let PayRef = require('../db/Models/Payment.Model')
const paystack_pay = require('../controllers/paystack_pay')
const paystack_callback = require('../controllers/paystack_callback')

let router = express.Router()



router
    .route('/paystack/pay')
    .post(checkAuthenticated, paystack_pay)


router
    .route('/paystack/callback')
    .get(checkAuthenticated, paystack_callback)


router
    .route('/receipt/:id')
    .get(checkAuthenticated, (req, res) => {
        const id = req.params.id;
        PayRef.findById(id)
            .then((PayRef) => {
                if (!PayRef) {
                    //handle error when the paytadi is not found
                    res.redirect("/error");
                }
                res.render("success.ejs", { PayRef });
            })
            .catch((e) => {
                res.redirect("/dashboard?type=error");
            });
    })

router
    .route('/error')
    .get((req, res) => {
        res.render("error.ejs");
    })


module.exports = router