const express = require('express')
const router = express.Router()
const contuserdata = require('../controllers/userdata')
const {isLoggedIn, validateData, isOwner}= require('../middleware')

router.route('/index')
    .get(contuserdata.indexpage)

router.route('/:id')
    .get(isLoggedIn, isOwner, contuserdata.showpge)
    .put(isLoggedIn, isOwner, validateData, contuserdata.puteditpge)
    .delete(isLoggedIn, isOwner, contuserdata.deleteuserdata)

router.route('/:id/edit')
    .get(isLoggedIn, isOwner, contuserdata.editpge)

module.exports = router