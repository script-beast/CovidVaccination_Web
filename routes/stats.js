const express = require('express')
const router = express.Router()

const contstats = require('../controllers/stats')

router.route('/index')
    .get(contstats.indexpge)

router.route('/allctry')
    .get(contstats.showctypge)

router.route('/:cont')
    .get(contstats.countgrp)

module.exports = router