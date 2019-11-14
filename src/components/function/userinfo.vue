<template>
  <div id="Register">
    <div class="bg_layout">
      <div class="form_layout">
        <div class="ab_parent2">
          <div class="userAvater">
            <img src="../../assets/logo.png" class="avatar" />
          </div>
          <div class="userinfo_table">
          <table >
            <tr>
              <td class="userinfo_att">用户名</td>
              <td>Gates</td>
            </tr>
            <tr>
              <td class="userinfo_att">Steven</td>
              <td>Jobs</td>
            </tr>
          </table>
          </div>
          <el-row class="clickBtn my_footer">
            <el-button type="success" plain>修改</el-button>
            <el-button type="success" plain @click="exitForm">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Userinfo",
  data() {
    return {
      userName: localStorage.getItem("username"),
      userUrl: localStorage.getItem("userImg")
    };
  },
  //   mounted () {
  //     this.$axios
  //               .post("http://localhost:8001/user/login", {
  //                 userName: this.ruleForm.name,
  //                 userPassword: this.ruleForm.password
  //               })
  //               .then((response) => {
  //                 if(response.data.isSuccess){
  //                   alert("登录成功")
  //                   localStorage.setItem("username",this.ruleForm.name)
  //                   localStorage.setItem("userImg",response.data.message)
  //                    this.$router.push('/')
  //                    location.reload()
  //                 }else{
  //                   alert("用户名或密码错误")
  //                   return
  //                 }
  //               })
  //               .catch(function(error) {
  //                 console.log(error);
  //               });
  //   },
  methods: {
    exitForm() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style>
/* 透明层背景 */
.bg_layout {
  position: absolute;
  width: 100%;
  height: 1000px;
  z-index: 999;
  margin-top: -970px;
  background-color: rgba(0, 0, 0, 0.7);
}
/* 主要内容的容器 */
.fun_head {
  margin: 0 auto;

  height: 60px;
  line-height: 60px;
  background-color: #67c23a;
  text-align: center;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.form_layout {
  width: 400px;
  height: 500px;
  margin: 200px auto;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.ab_parent2 {
    width: 400px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}
/* 头像 */
.userAvater {
  background: rgba(103, 194, 58, 0.5);
  border-radius: 10px 10px 0 0;
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userAvater .avatar {
  border-radius: 50%;
  background: #fff;
}
/* 表格 */
.userinfo_table{
    width: 70%;
}
.userinfo_table .userinfo_att{
    width: 100px;
}
/* 底部注册栏 */

.clickBtn .el-button {
  height: 40px;
  width: 145px !important;
}

.my_footer {
  position: absolute;
  bottom: 20px;
}

</style>