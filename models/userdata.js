const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserDataSchema = new Schema({
    name: String,
    district: String,
    state: String,
    pin: Number,
    dose1: Boolean,
    dose2: Boolean
})

UserDataSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('UserData', UserDataSchema)