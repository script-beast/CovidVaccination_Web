const UserData = require('../models/userdata')
const catchAsync = require('../utils/catchAsync')

module.exports.indexpage = catchAsync( async (req, res) => {
    const data = await UserData.find({})
    nv = await UserData.count({ dose1: false })
    hv = await UserData.count({ dose1: true })
    fv = await UserData.count({ dose2: true })
    res.render('userdata/index', { data, nv,hv,fv })
})

module.exports.showpge = catchAsync( async (req, res) => {
    const usdata = await UserData.findById(req.params.id)
    if (!usdata) {
        req.flash('error', 'Sorry, No Account found')
        return res.redirect('/user/index')
    }
    res.render('userdata/show', { usdata })
})

module.exports.editpge = catchAsync( async (req, res) => {
    const usdata = await UserData.findById(req.params.id)
    if (!usdata) {
        req.flash('error', 'Sorry, No Account found')
        return res.redirect('/user/index')
    }
    res.render('userdata/update', { usdata })
})

module.exports.puteditpge = catchAsync( async (req, res) => {
    const {id} = req.params
    req.body.UserData.dose1 = req.body.UserData.dose1 == 'on' ? 'true' : 'false'
    req.body.UserData.dose2 = req.body.UserData.dose2 == 'on' ? 'true' : 'false'
    // console.log(req.body)
    await UserData.findByIdAndUpdate(id, {...req.body.UserData})
    req.flash('success', 'Successfully updated the details !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i')
    res.redirect(`/user/${id}`)
})

module.exports.deleteuserdata = catchAsync( async (req, res) => {
    const {id} = req.params
    await UserData.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted the account !i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i') 
    res.redirect('/user/index')
})