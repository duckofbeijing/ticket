const express = require("express")
const router = express.Router()
const assert = require('http-assert')
const {User} = require('../models/user')
const SECRET = 'dfyeuesrgt63' //token的secrte，不应该写在这里而是应该在一个本地文件里
//登陆
router.post('/login', async(req, res)=>{

    const user = await User.findOne({
        username:req.body.user_name
    })
    //1）根据用户名找用户 如果不存在用户，返回422
    assert(user, 422 ,'用户不存在')
    // if(!user){
    //     return res.status(422).send({
    //         message: '用户不存在'
        // }) 等同于assert一行代码


        // res.send({
        //     status:422,
        //     message: '用户不存在'
        // })
    // }
    //2）如果户存在，校验密码
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    assert(isPasswordValid, 422, '密码无效')
    // if(!isPasswordValid){
    //     return res.status(422).send({
    //         message: '密码无效'
    //     })等同于assert一行代码



        // res.send({
        //     status:422,
        //     message: '密码无效'
        // })
    // }
    //3）生成token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign(
        {id: String(user._id)},
        SECRET
        // app.get('SECRET')//get方法，只有一个参数表示获取配置
    )

    res.send({
        user,
        token,
        // status: 200,
        message: '登陆成功'
    })
    
})

//注册用户
router.post('/registe', async(req, res)=> {
    // console.log(req.body )
    const user = await User.create({
        username:req.body.user_name,
        password:req.body.password
    })
    
})


module.exports = router