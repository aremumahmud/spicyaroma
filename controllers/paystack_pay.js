const client = require('../redis-client/client')
const request = require("request");
const _ = require("lodash");
const { initializePayment } = require("../config/paystack")(
    request
);


module.exports = (req, res) => {
    let { id, comprise } = req.body
        // console.log(comprise)
    client.set('Order:' + id, comprise, (err, succ) => {
        if (err) return res.redirect("/dashboard?type=error&id=hejd78eikjs");
        // db.createOrder(id, comprise).then(respn => {
        req.body.full_name += ':' + id
            // console.log(req.body)
        const form = _.pick(req.body, ["amount", "email", "full_name"]);
        form.metadata = {
            full_name: form.full_name
        };
        form.amount *= 100;
        // console.log(form)
        initializePayment(form, (error, body) => {
            if (error) {
                //handle errors
                ///  console.log(error);
                return res.redirect("/dashboard?type=error&id=pf3f84iorklj");
            }
            let response = JSON.parse(body);
            //console.log(response)
            if (!response.status) {
                return res.end('wrob tin')
            }
            res.redirect(response.data.authorization_url);
        });
        // }).catch(e => {
        //     return res.redirect("/error");
    })
}