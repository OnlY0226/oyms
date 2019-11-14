import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import store from '../store/index';
let isAdmin = ""
function checkRoleId() {
    return new Promise((resolve, reject) => {
    axios.get("/user/getRoleId", {
        params: {
            token: store.state.token
        }
    }).then((res) => {
        isAdmin=res.data.code
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
}
export {
    checkRoleId,
    isAdmin
}