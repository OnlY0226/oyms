<template>
  <div id="header">
    <el-col>
      <el-col :span="15">
        <div class="title">OY智能商城后台管理系统</div>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-row v-show="showUserMessage" class="userContent">
            <div id="settingIcon">
              <el-dropdown :hide-on-click="true">
                <span class="el-dropdown-link"  id="setting">
                  <i class="el-icon-s-tools"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="settingList">
                  <router-link to="/userinfo" tag="div">
                    <el-dropdown-item>用户信息</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item @click.native="exitLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <h2 class="name" >{{userName}}</h2>
            <div class="user_avatar">
              <img :src="userImgUrl" class="avatar" style="width:40px;height:40px;" id="userImg"/>
            </div>
          </el-row>
          <div v-show="!showUserMessage" class="rightNav">
            <router-link to="/login" tag="div">
              <el-button type="success" plain>登录</el-button>
            </router-link>
            <router-link to="/register" tag="div">
              <el-button type="success" plain>注册</el-button>
            </router-link>
          </div>
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      showUser:false,
    };
  },
  methods:{
     exitLogin() {
      localStorage.clear();
      this.$store.state.showUserMessage = false
      this.$router.push('/')
      this.$message({
                  type: "success",
                  message: "已退出!"
                });
    }
  },
    computed:{
      showUserMessage(){
        return this.$store.state.showUserMessage
      },
      userName(){
        return this.$store.state.userName
      },
      userImgUrl(){
        if(this.$store.state.userImgUrl != null && this.$store.state.userImgUrl != ''){
        return this.$store.state.userImgUrl
        }else{
          return require('../assets/logo.png')
        }
      }
    }

};
</script>

<style>
#userImg{
  width:40px;
  height:40px;
  border-radius:50px; 
}
.name {
  width: 100px;
  text-align: left;
  height: 60px;
  line-height: 60px;
  float: right;
  font-size: 18px;
  color: #67c23a;
  font-weight: 600;
}
.user_avatar {
  float: right;
  height: 60px;
  line-height: 60px;
  width: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightNav .el-button--success.is-plain {
  background: rgb(95, 99, 104);
  height: 40px;
  width: 80px;
  margin-top: 10px;
  margin-right: 20px;
  border: none;
}
#settingIcon {
  font-size: 30px;
  float: right;
  padding-right: 64px;
}
.el-icon-s-tools {
  font-size: 32px;
}
.rightNav {
  display: flex;
  float: right;
}
.title {
  font-size: 28px;
  text-align: left;
  margin-left: 60px;
  font-weight: 600;
  color: rgb(194, 150, 150);
}
#setting :hover{
  color:rgb(105, 58, 58)
}
#settingList{
  margin-top: -30px;
}
</style>