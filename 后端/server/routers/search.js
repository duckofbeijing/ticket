module.exports = app =>{
    const express = require("express")
    const router = express.Router()
    const authMiddle = require('../middleware/auth')
    const assert = require('http-assert')
    const {Bjs_ctu_apr,Bjs_ctu_mar,Sha_ctu_apr,Sha_ctu_mar,Sha_tsn_apr,Sha_tsn_mar} = require('../models/user')
    const city_code = {
        '北京':'bjs', '成都':'ctu', '天津':'tsn', '上海':'sha'
    }
    month_dict= {
        '01':'jan','02':'feb','03':'mar','04':'apr','05':'may','06':'june',
        '07':'july','08':'aug','09':'sept','10':'oct','11':'nov','12':'dec'
        }
    
    router.get('/search', async(req,res) => {
        var objKey = Object.keys(req.query)
        // console.log(objKey.length)
        assert(objKey.length==3, 307, '请填入完整信息')
        const dep_date = req.query.dep_date
        // const reg_date = dep_date.split('-').slice(1).join('-')
        const reg_date = new RegExp(dep_date.split('-').slice(1).join('-'))
        var dep_code
        var arr_code
        var month
        for(i in city_code){
            // console.log(city_code[i])
            if(req.query.dep_city == i){
                dep_code = city_code[i]
            }
            else if(req.query.arr_city == i){
                arr_code = city_code[i]
            }
        }

        for(j in month_dict){
            if(dep_date.split('-')[1] == j){
                month = month_dict[j]
            }
        }
        // 1、找到相应数据库名
        const db_name = dep_code+'_'+arr_code+'_'+month
        const db_name1 = db_name.charAt(0).toUpperCase() + db_name.slice(1)
        
        // const a = eval(db_name1+".find({})")
        
        
        // if(!eval(db_name1+".find({})")){
            
        // }else{
        //     return res.status(308).send({
        //         message: '没有相应信息'
        //     })
        // }
        // assert(!eval(db_name1+".find({})"), 300 ,'没有相应信息')
        
        
        // 非模糊查询 dep_date: 2020-03-01
        // const res1 = await eval(db_name1+".find({dep_date: "+"'"+dep_date+"'"+"})")




        // const con = db_name1+".find({dep_date: "+"'"+dep_date+"'"+"})"
        // console.log(con)

        // const res1 =await Bjs_ctu_apr.find({dep_date:'2020-04-05'})
        //用于模糊查询  dep_date: 03-01
        // const res1 = await Bjs_ctu_apr.find({dep_date: { $regex: reg_date}})
        try{
            const res1 = await eval(db_name1+".find({dep_date: "+"{$regex:"+reg_date+"}})")
            res.send(res1)
        }catch(e){
            return res.status(308).send({
                        message: 'sorry, 没有相应信息'
                }) 
        }
        
       
       
    })


    app.use('',authMiddle(),router)
    app.use(async (err, req, res, next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}