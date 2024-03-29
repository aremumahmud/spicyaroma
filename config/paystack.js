//const MySecretKey = "Bearer sk_test_75592d2e061e4ff6886f54943992f8b2d1961c00";
const MODE = process.env.APP_MODE
let decider = {
    0: 'PRODUCTION_PAYPAL_SECRET_KEY',
    1: 'DEVELOPMENT_PAYPAL_SECRET_KEY'
}

const MySecretKey = MODE == 'production' ? process.env[decider[0]] : process.env[decider[1]]



const paystack = (request) => {
    //replace the secret key with that from your paystack account
    const initializePayment = (form, mycallback) => {
        const options = {
            url: "https://api.paystack.co/transaction/initialize",
            headers: {
                authorization: MySecretKey,
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            form,
        };
        const callback = (error, response, body) => {
            return mycallback(error, body);
        };
        request.post(options, callback);
    };

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
            headers: {
                authorization: MySecretKey,
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
        };
        const callback = (error, response, body) => {
            return mycallback(error, body);
        };
        request(options, callback);
    };

    return { initializePayment, verifyPayment };
};

module.exports = paystack;