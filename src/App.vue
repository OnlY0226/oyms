<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <Head></Head>
      </el-header>
      <el-container id="mainContent">
        <el-aside>
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <router-view name="title"></router-view>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
    <router-view name="fun"></router-view>
  </div>
</template>

<script>
import Head from "./components/header.vue";
import LeftNav from "./components/left_nav";
import Main from "./components/main_content";
import Foot from "./components/footer";
const Register = () => import("./components/function/register.vue");
const Login = () => import("./components/function/login.vue");
const Userinfo = () => import("./components/function/userinfo");
const ModifyUserinfo = () => import('./components/function/modifyUserinfo.vue')

export default {
  name: "app",
  components: {
    Head,
    LeftNav,
    Main,
    Foot,Register,Login,Userinfo,ModifyUserinfo
  },
};
</script>

<style>
@import "./static/css/app.css";
</style>
