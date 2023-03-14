const _ = require("lodash");
const request = require("request");
let PayRef = require('../db/Models/Payment.Model')
const db = require('../db');
const client = require('../redis-client/client')
const addToOrderList = require('../utils/addToCartList')
const { verifyPayment } = require("../config/paystack")(
    request
);



module.exports = (req, res) => {
    console.log('yeah')
        //const ref = 'uf2xmlnd8a'
    const ref = req.query.reference;
    verifyPayment(ref, (error, body) => {
        if (error) {
            //handle errors appropriately
            console.log(error, 'error tings');
            return res.redirect("/dashboard?type=error&id=hejd78eikjs");
        }
        let response = JSON.parse(body);
        //  console.log(response.data)
        if (response.data.status == 'success' && response.data.gateway_response == 'Successful') {
            console.log('anai')
            let _id = response.data.metadata.full_name.split(":")[1]
            console.log(response.data.metadata.full_name)
            client.get('Order:' + _id, (err, order) => {
                // console.log(err, order)
                if (err) return res.redirect("/dashboard?type=error&id=hejd78eikjs");
                let comprise = JSON.parse(order)
                db.createOrder(_id, comprise).then(e => {
                    const data = _.at(response.data, [
                        "reference",
                        "amount",
                        "customer.email",
                        "metadata.full_name",
                    ]);


                    [reference, amount, email, full_name] = data;
                    let order_id = e._id
                    let newPayRef = { orderId: order_id, reference, amount, email, full_name: full_name.split(':')[0], transactionStats: true };
                    // console.log(newPayRef, 'error tings');
                    const payRef = new PayRef(newPayRef);

                    payRef
                        .save()
                        .then((payReciept) => {
                            if (!payReciept) {
                                console.log('here 2')
                                return res.redirect("/dashboard?type=error&id=hejd78eikjs");
                            }
                            console.log('jnk,')
                            client.set('cart' + _id, '', (err, succ) => {
                                console.log('succeded')
                            })
                            client.del('Order' + _id)
                            addToOrderList(_id, e)
                            res.redirect("/dashboard");
                        })
                        .catch((e) => {
                            console.log(e, 'here 2')
                            res.redirect("/dashboard?type=error&id=hejd78eikjs");
                        });
                }).catch(err => {
                    console.log('here 1')
                    res.redirect("/dashboard?type=error&id=hejd78eikjs")
                })
            })



        } else {
            res.redirect("/dashboard?type=error&id=kjd8iidks9")
        }

    });
}