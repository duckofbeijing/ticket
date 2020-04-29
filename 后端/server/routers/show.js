module.exports = app => {
    const express = require("express")
    const router = express.Router()
    const {Bjs_ctu_apr,Bjs_ctu_mar,Sha_ctu_apr,Sha_ctu_mar,Sha_tsn_apr,Sha_tsn_mar} = require('../models/user')
    var myDate = new Date();
    
    
    
    const authMiddle = require('../middleware/auth')
    

    router.get('/show',async(req, res)=>{
    //    const user = await Sha_ctu_mar.find({},'dep_date')
        const Sha_ctu_mar_dates = await Sha_ctu_mar.distinct('dep_date')
        const Sha_ctu_mar_prices=[]
        for(var i = 0; i <Sha_ctu_mar_dates.length; i++){
            // console.log(dates[i])
            
            // var price = await Sha_ctu_mar.find({dep_date:dates[i]})
            // var price = await Sha_ctu_mar.find({price:{dep_date:dates[i]}})
            var price = await Sha_ctu_mar.find({dep_date:Sha_ctu_mar_dates[i]},'price')
            var sum=0
            var avg_price=0
            for(var j = 0; j<price.length; j++){
                sum=sum+parseInt(price[j]['price'])
            }
            avg_price=Math.ceil(sum/price.length)
            Sha_ctu_mar_prices.push(avg_price)
            // console.log(avg_price)
        }



        const Bjs_ctu_mar_dates = await Bjs_ctu_mar.distinct('dep_date')
        const Bjs_ctu_mar_prices=[]
        for(var i = 0; i <Bjs_ctu_mar_dates.length; i++){
            // console.log(dates[i])
            
            // var price = await Sha_ctu_mar.find({dep_date:dates[i]})
            // var price = await Sha_ctu_mar.find({price:{dep_date:dates[i]}})
        const Bjs_ctu_mar_dates = await Bjs_ctu_mar.distinct('dep_date')
            var price = await Bjs_ctu_mar.find({dep_date:Bjs_ctu_mar_dates[i]},'price')
            var sum=0
            var avg_price=0
            for(var j = 0; j<price.length; j++){
                sum=sum+parseInt(price[j]['price'])
            }
            avg_price=Math.ceil(sum/price.length)
            Bjs_ctu_mar_prices.push(avg_price)
            // console.log(avg_price)
        }



        res.send({
            Sha_ctu_mar_dates,
            Sha_ctu_mar_prices,
            Bjs_ctu_mar_dates,
            Bjs_ctu_mar_prices
        })
        // 1、生成当月dates
        // 2、根据date 取find，找到 price，把price取平均
        // 3、整理出相应信息与格式返回给前端



        // const user = await Sha_ctu_mar.find({})
        // res.send('user')
        // console.log(user)
    })



    app.use('',authMiddle(),router)
    app.use(async (err, req, res, next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}