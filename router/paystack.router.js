const express = require('express')
let { checkAuthenticated } = require('../utils/utils')
let PayRef = require('../db/Models/Payment.Model')
const request = require("request");
const _ = require("lodash");
const { response } = require('express');
const db = require('../db');
const { initializePayment, verifyPayment } = require("../config/paystack")(
    request
);
let router = express.Router()



router
    .route('/paystack/pay')
    .post(checkAuthenticated, (req, res) => {
        let { id, comprise } = req.body
        db.createOrder(id, comprise).then(respn => {
            const form = _.pick(req.body, ["amount", "email", "full_name"]);
            form.metadata = {
                full_name: form.full_name,
                order_id: respn
            };
            form.orderId = respn
            form.amount *= 100;
            console.log(form)
            initializePayment(form, (error, body) => {
                if (error) {
                    //handle errors
                    console.log(error);
                    return res.redirect("/error");
                }
                let response = JSON.parse(body);
                console.log(response)
                if (!response.status) {
                    return res.end('wrob tin')
                }
                res.redirect(response.data.authorization_url);
            });
        }).catch(e => {
            return res.redirect("/error");
        })

    })


router
    .route('/paystack/callback')
    .get(checkAuthenticated, (req, res) => {
        console.log('yeah')
            //const ref = 'gk3fh1enau'
        const ref = req.query.reference;
        verifyPayment(ref, (error, body) => {
            if (error) {
                //handle errors appropriately
                console.log(error, 'error tings');
                return res.redirect("/error");
            }
            let response = JSON.parse(body);
            console.log(response.data)
            if (response.data.status == 'success' && response.data.gateway_response == 'Successful') {
                db.confirmOrder()
            }
            const data = _.at(response.data, [
                "reference",
                "amount",
                "customer.email",
                "metadata.full_name",
            ]);

            [reference, amount, email, full_name] = data;

            let newPayRef = { reference, amount, email, full_name };
            console.log(newPayRef, 'error tings');
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
                    console.log(e)
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
module.exports = router
module.exports = router
module.exports = router