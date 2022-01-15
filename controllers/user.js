const UserData = require('../models/userdata')
const catchAsync = require('../utils/catchAsync')


module.exports.registerpge = (req, res) => {
    res.render('user/register')
}

module.exports.postregister = catchAsync(async (req, res, next) => {
    req.body.UserData.dose1 = req.body.UserData.dose1 == 'on' ? 'true' : 'false'
    req.body.UserData.dose2 = req.body.UserData.dose2 == 'on' ? 'true' : 'false'
    try{
        const data = new UserData(req.body.UserData)
        const {password} = req.body.UserData
        const newus = await UserData.register(data, password)
        req.login(newus, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to My Project !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i')
            res.redirect('/user/index')
        })
    }
    catch(e)
    {
        req.flash('error', e.message)
        res.redirect('register')
    }
})

module.exports.loginpge = (req, res) => {
    res.render('user/login')
}

module.exports.postlogin = (req, res) => {
    req.flash('success', 'Welcome Back !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i')
    res.redirect('/user/index')
}

module.exports.logout = (req, res) => {
    req.logOut()
    req.flash('success', 'Successfully Logout !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i')
    res.redirect('/user/index')
}