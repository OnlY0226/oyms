//配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store'

const Order = () => import('../components/main-item/order.vue')
const Shopping = () => import('../components/main-item/shopping.vue')
const UserManager = () => import('../components/main-item/userManager.vue')
const AuthManage = () => import('../components/main-item/authManage.vue')
const Main = () => import('../components/main_content')
const Register = () => import('../components/function/register.vue')
const Login = () => import('../components/function/login.vue')
const Userinfo = () => import('../components/function/userinfo.vue')
const ModifyUserinfo = () => import('../components/function/modifyUserinfo.vue')
const Title = () => import('../components/title.vue')
const NoToken = () => import('../components/common/NoToken.vue')
const OverDueToken = () => import('../components/common/OverDueToken.vue')

//1.通过VUE,use（插件），安装插件
Vue.use(VueRouter)
//2.创建VueRouter对象
const routes = [
  {
    path: '/',
    components: {
      'title': Title
    },
  },
  {
    path:'/NoToken',
    requireAuth: true,
    components: {
      'title': NoToken
    },
  },
  {
    path:'/OverDueToken',
    requireAuth: true,
    components: {
      'title': OverDueToken
    },
  },
  {
    path: '/main/', component: Main,
    children: [
      {
        path: 'shopping',
        component: Shopping
      },
      {
        path: 'order',
        component: Order
      },
      {
        path: 'usermanager',
        component: UserManager
      },
      {
        path: 'authmanage',
        component: AuthManage
      }
      
    ]
  },
  {
    path: '/register',
    components: {
      'fun': Register
    }
  },
  {
    path: '/login',
    components: {
      'fun': Login
    }
  },
  {
    path: '/userinfo',
    components: {
      'fun': Userinfo
    }
  },
  {
    path: '/modifyuserinfo',
    components: {
      'fun': ModifyUserinfo
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})
export default router