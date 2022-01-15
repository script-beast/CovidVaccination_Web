if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserData = require('./models/userdata')
const MongoStore = require('connect-mongo');
const dbUrl = process.env.db_url
// const dbUrl = 'mongodb://localhost:27017/covidVacination'

const app = express()

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('DataBase Connected')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

const store = MongoStore.create({
    mongoUrl: dbUrl,
    // secret: 'adgjlwr2fds4sg13gs5sg7gsr687he08e9',
    // touchAfter: 60 * 60
})

// store.on('error', function(e) {
//     console.log(e)
// })

const sessionconfig = {
    store: store,
    secret: 'adgjlwr2fds4sg13gs5sg7gsr687he08e9',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        exipres: Date.now() + (1000 * 3600),
        maxAge: 1000 * 3600
    }
}
app.use(session(sessionconfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(UserData.authenticate()))
passport.serializeUser(UserData.serializeUser())
passport.deserializeUser(UserData.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

const userdatarout = require('./routes/userdata')
const userrout = require('./routes/user')
const statsrout = require('./routes/stats')

app.use('/user', userdatarout)
app.use('/', userrout)
app.use('/stats', statsrout)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    // const { statusCode = 500 } = err
    if (!err.message)
        err.message = 'Something went wrong'
    // res.status(statusCode).render('error', { err })
    req.flash('error', err.message)
    res.redirect('/')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Listening')
})