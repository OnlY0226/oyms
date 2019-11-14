import Vue from 'vue'
import Vuex from 'vuex'
 
//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
      state:{
         token:localStorage.getItem("token"),
         showUserMessage:localStorage.getItem("islogin"),
         userName:localStorage.getItem("username"),
         userImgUrl:localStorage.getItem("userImg"),
      },
      mutations:{
         //改变登录状态方法
         changeLoginState(state){
            state.showUserMessage=!state.showUserMessage
         }
      },
      actions:{

      },
      getters:{

      },
      modules:{

      }
})

//3.导出store独享
export default store