import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main"
import Home from "../views/Home"
import Search from "../views/Search"
import Show from "../views/Show"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name:"login",
    redirect:'/login'
  },
  {
    path: "/login",
    name:"login",
    component: Login,
    meta:{isPublic: true}
  },
  {
    path: "/manage",
    name:"manage",
    component: Main,
    children:[
      {
        path:'',
        component:Home,
        meta:[]
      },
      {
        path:'/search',
        name:"search",
        component: Search,
        meta:['搜索']
      },
      {
        path:'/show',
        name:"show",
        component: Show,
        meta:['展示']
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 导航守卫 在进入/切换路由之前干什么
router.beforeEach((to ,from, next)=> {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  // console.log()
  next()
})
export default router;
