if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

let a = 'nlln '

// imports
const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require('path')
const db = require('./db')

const appRouter = require('./router/app.router')
const paystackRouter = require('./router/paystack.router')


// configuring and initializing passport
const initializePassport = require("./passport-config");
initializePassport(
    passport,
    (email) => db.findUserByEmail(email),
    (id) => db.findUserById(id)
);

app.set("view-engine", "ejs");
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "8unto0n4oc7903zm",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// routes
app.use(appRouter)
app.use(paystackRouter)
    // welcome page
    // display greetings message for the user and logout button

//paystack part tho

// start server
const port = process.env.APPLICATION_PORT || 6001;
app.listen(port, () => {
    console.log("Server listening at http://localhost:%s", port);
});