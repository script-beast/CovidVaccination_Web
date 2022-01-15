// const { casesdata } = require('../apicall')
var axios = require("axios").default;

module.exports.indexpge = (req, res, next) => {
    var options = {
        method: 'GET',
        url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
        params: { q: 'covid', lang: 'en', media: 'True' },
        headers: {
            'x-rapidapi-host': 'covid-19-news.p.rapidapi.com',
            'x-rapidapi-key': 'c60161df46msh320a19245b943b2p12805ajsnd43c6ec04ea2'
        }
    };
    axios.request(options).then(function (response) {
        const data = response.data.articles
        res.render('stats/index', { data });
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports.showctypge = (req, res, next) => {
    var options = {
        method: 'GET',
        url: 'https://covid-19-india2.p.rapidapi.com/details.php',
        headers: {
            'x-rapidapi-host': 'covid-19-india2.p.rapidapi.com',
            'x-rapidapi-key': 'c60161df46msh320a19245b943b2p12805ajsnd43c6ec04ea2'
        }
    };

    axios.request(options).then(function (response) {
        const dta = response.data
        res.render('stats/showcountry', { dta });
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports.countgrp = (req, res, next) => {
    var options = {
        method: 'GET',
        url: 'https://covid-19-india2.p.rapidapi.com/details.php',
        headers: {
            'x-rapidapi-host': 'covid-19-india2.p.rapidapi.com',
            'x-rapidapi-key': 'c60161df46msh320a19245b943b2p12805ajsnd43c6ec04ea2'
        }
    };

    axios.request(options).then(function (response) {
        const co = req.params.cont
        // console.log(co);
        Object.entries(response.data).map(item => {
            if (item[0] == co) {
                nv = item[1].death
                hv = item[1].confirm
                fv = item[1].cured
                res.render('stats/showgrp', { nv, hv, fv });
                // console.log(item[1])
            }
        })
    }).catch(function (error) {
        console.error(error);
    });
}