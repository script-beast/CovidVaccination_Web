const UserData = require('./models/userdata')
const { dataSchema } = require('./models/validschema')
const ExpressError = require('./utils/ExpressError')

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()) {
        req.flash('error', 'OH!, Not Logged in !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!')
        return res.redirect('/login')
    }
    next()
}

module.exports.validateData = (req, res, next) => {
    const { error } = dataSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(' , ')
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const {id} = req.params
    const usdta = await UserData.findById(id)
    if(!(usdta.username == req.user.username)){
        req.flash('error', "You don't have permission, sorry !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i")
        return res.redirect('/user/index')
    }
    next()
}