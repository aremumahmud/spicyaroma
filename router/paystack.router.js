const express = require('express')
let { checkAuthenticated } = require('../utils/utils')
let PayRef = require('../db/Models/Payment.Model')
const request = require("request");
const _ = require("lodash");
const { initializePayment, verifyPayment } = require("../config/paystack")(
    request
);
let router = express.Router()



router
    .route('/paystack/pay')
    .post(checkAuthenticated, (req, res) => {
        const form = _.pick(req.body, ["amount", "email", "full_name"]);
        form.metadata = {
            full_name: form.full_name,
        };
        form.amount *= 100;

        initializePayment(form, (error, body) => {
            if (error) {
                //handle errors
                console.log(error);
                return res.redirect("/error");
            }
            let response = JSON.parse(body);
            if (!response.status) {
                return es
            }
            res.redirect(response.data.authorization_url);
        });
    })


router
    .route('/paystack/callback')
    .get(checkAuthenticated, (req, res) => {
        const ref = req.query.reference;
        verifyPayment(ref, (error, body) => {
            if (error) {
                //handle errors appropriately
                console.log(error);
                return res.redirect("/error");
            }
            response = JSON.parse(body);

            const data = _.at(response.data, [
                "reference",
                "amount",
                "customer.email",
                "metadata.full_name",
            ]);

            [reference, amount, email, full_name] = data;

            let newPayRef = { reference, amount, email, full_name };

            const payRef = new PayRef(newPayRef);

            payRef
                .save()
                .then((payReciept) => {
                    if (!payReciept) {
                        return res.redirect("/error");
                    }
                    res.redirect("/receipt/" + payReciept._id);
                })
                .catch((e) => {
                    res.redirect("/error");
                });
        });
    })


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
                res.redirect("/error");
            });
    })

router
    .route('/error')
    .get((req, res) => {
        res.render("error.ejs");
    })


module.exports = router