
module.exports = options => async (req,res,next)=>{
    const SECRET = 'dfyeuesrgt63'
    const {User} = require('../models/user')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    // pop()提取数组里的最后一个元素
    const token = String(req.headers.authorization || '').split(' ').pop()
    // app.get('secret')
    // console.log(token)
    assert(token, 401, '请先登陆')
    const {id} = jwt.verify(token, SECRET)
    assert(token, 401, '请先登陆')
    req.user = await User.findById(id)
    assert(req.user, 401, '请先登陆')
    await next()
}