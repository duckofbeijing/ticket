const express = require("express")
const app = express()
const history = require('connect-history-api-fallback');
app.use(express.json())
app.use(require('cors')())
// const SECRET = 'dfyeuesrgt63' //token的secrte，不应该写在这里而是应该在一个本地文件里
// require('./routers/index')(app)
const login = require('./routers/login')
app.use('',login)
//错误处理函数 对接http-assert
app.use(async (err, req, res, next)=>{
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})
app.use( history());
// 把public文件夹托管到跟路径
app.use('/', express.static(__dirname + '/public'))
//查询用户
// app.get('/users', async(req, res)=>{
//     const users = await User.find()
//     res.send(users)
//     console.log(users)
// })
// app.set('SECRET','dfyeuesrgt63')    
require('./plugins/db')(app)
require('./routers/show')(app)
require('./routers/search')(app)






app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})