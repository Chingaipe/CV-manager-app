/**
 * This file handles all the user routes
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../Models/user');

// register route (creates new user and store in db)
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }); 
    // add to db
    User.addUser(newUser, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            // if success
            res.json({success: true, msg: 'User registered!'});
        }
    });

});

router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User does not exist'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800  // 1 week(604800 sec) before token expires
                });

                // values to be returned to frontend app
                res.json({
                    success: true,
                    token: "JWT "+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                // if no match is found
                return res.json({success: false, msg: 'Wrong password and/or email.'});
            }
        });
    });
});

// user profile route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;