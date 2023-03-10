let client = require("../redis-client/client");



function middleWareFactory(type) {
    if (type == 'home-visit') {
        return getHomePageVisits
    } else if (type == 'login-visit') {
        return getLoginVisits
    } else if (type == 'sucess-login') {
        return getSuccessfulLogins
    } else if (type == 'pay-clicks') {
        return getPayClicks
    } else {
        return (req, res, next) => { res.send('invalid type fam!') }
    }



}

function getHomePageVisits(req, res, next) {
    client.incr('homePageVisit', () => {})
    next()
}

function getLoginVisits(req, res, next) {
    client.incr('loginPageVisit', () => {})
    next()
}

function getSuccessfulLogins(req, res, next) {
    client.incr('successfulLogins', () => {})
    next()
}

function getPayClicks(req, res, next) {
    client.incr('payclicks', () => {})
    next()
}

module.exports = middleWareFactory