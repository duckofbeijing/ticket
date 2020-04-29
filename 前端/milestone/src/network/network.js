import axios from 'axios'
import Vue from 'vue'
import router from '../router'
// const baseURL = 'http://localhost:3000';

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || ''
  //  baseURL : 'http://localhost:3000'
})

//拦截器 请求之前干点什么
http.interceptors.request.use(function (config){
  if(localStorage.token){
    config.headers.Authorization ='Bearer '+ localStorage.token
  }
  
  return config
},function(error){
  return Promise.reject(error)
})


//拦截器 请求回来干点什么
http.interceptors.response.use(res => {
  // console.log('f')
  return res
},err => {
  if(err.response.data.message){
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if(err.response.status == 401){
      router.push('/login')
    }
    
  }
  
  
  return Promise.reject(err)
})

export default http

// ES6 Promise的封装
// export function request(options) {
//   return new Promise((resolve, reject) => {
//     // 1.创建axios的实例对象
//     const instance = axios.create({
//       baseURL: 'http://localhost:3000',
     
//     })

// //    过滤器(拦截器)
//     instance.interceptors.response.use(res => {
//       return res.data
// //		return res
//     })

//     // 通过实例发送网络请求
//     instance(options)
//         .then(res => {
//           resolve(res)
//         }).catch(err => {
//           reject(err)
//     })
//   })
// };
/** 
* 封装get方法

*/
// export function get_req(url,params={}){
//   url=baseURL+url
//   return new Promise((resolve,reject) => {
//    axios.get(url,{
//      params:params
//    })
//    .then(response => {
//      resolve(response.data);
//    })
//    .catch(err => {
//      reject(err)
//    })
//  })
// };

 /**
* 封装post请求

*/

// export function post_req(url,data = {}){
//  url=baseURL+url
//  return new Promise((resolve,reject) => {

//    axios.post(url,data)
//    .then(response => {
//      resolve(response.data);
//    },err => {
//      reject(err)
//    })
//  })
// };
