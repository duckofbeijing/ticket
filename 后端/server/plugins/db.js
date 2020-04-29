module.exports = app =>{
    const mongoose  = require("mongoose")
    mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
}