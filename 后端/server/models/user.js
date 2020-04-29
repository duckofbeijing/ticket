const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: { 
        type: String,
        set(val){
            //把密码用bcrypt散列后存到数据库
            //10 指加密强度
            return require('bcrypt').hashSync(val,10)
        }
    
    }
})


const dataSchema = new mongoose.Schema({
    search_date: {type: String},
    dep_date: {type: String},
    week_day: {type: String},
    holiday: {type: String},
    airlineName: {type: String},
    departureDate: {type: String},
    airportName_dep: {type: String},
    arrivalDate: {type: String},
    airportName_arr: {type: String},
    price: {type: String}
    
})

const User = mongoose.model('User', userSchema)

const Bjs_ctu_apr = mongoose.model('Bjs_ctu_apr', dataSchema)
const Bjs_ctu_mar = mongoose.model('Bjs_ctu_mar', dataSchema)
const Sha_ctu_apr = mongoose.model('Sha_ctu_apr', dataSchema)
const Sha_ctu_mar = mongoose.model('Sha_ctu_mar', dataSchema)
const Sha_tsn_apr = mongoose.model('Sha_tsn_apr', dataSchema)
const Sha_tsn_mar = mongoose.model('Sha_tsn_mar', dataSchema)

// User.db.dropCollection('users')
module.exports = {User,Bjs_ctu_apr,Bjs_ctu_mar,Sha_ctu_apr,Sha_ctu_mar,Sha_tsn_apr,Sha_tsn_mar}