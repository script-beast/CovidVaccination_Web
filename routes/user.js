const express = require('express')
const router = express.Router()
const passport = require('passport')
const contuser = require('../controllers/user')
const { validateData } = require('../middleware')

router.route('/register')
    .get(contuser.registerpge)
    .post(validateData, contuser.postregister)

router.route('/login')
    .get(contuser.loginpge)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), contuser.postlogin)

router.route('/logout')
    .get(contuser.logout)

module.exports = router