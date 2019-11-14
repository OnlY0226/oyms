<template>
  <div id="Register">
    <div class="bg_layout">
      <div class="form_layout">
        <!--  -->
        <div class="fun_head">登录</div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm ab_parent"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" prefix-icon="el-icon-user" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              type="password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha_code">
            <el-input
              class="log-input"
              v-model="ruleForm.captcha_code"
              placeholder="验证码"
              prefix-icon="icon-login_auth"
              @keydown.enter.native="collateCode('form')"
            ></el-input>
            <span class="checkCode" @click="createCode">{{ checkCode}}</span>
          </el-form-item>
          <div class="clickBtn my_footer">
            <el-button type="success" plain @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="success" plain @click="exitForm">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        captcha_code:''
      },
      checkCode:'',
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      }
    };
  },
 
mounted () {
    this.createCode();
  },
  methods: {
    
    createCode() {
		var code = "";
		const codeLength = 4; //验证码的长度  
		const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
		for(let i = 0; i < codeLength; i++) { //循环操作  
			let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
			code += random[index]; //根据索引取得随机数加到code上  
		}
		this.checkCode = code; //把code值赋给验证码  
  },
  collateCode() {
      if(this.form.captcha_code != this.checkCode) {
         this.$message({
              message: "验证码错误，注意大写字母",
              type: "warning"
        });
        this.createCode();
        return false;
      };
  },
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = new URLSearchParams()
          params.append('username',this.ruleForm.name)
          params.append('userpassword',this.ruleForm.password)
          this.$axios
              .post("/user/login", params)
              .then((response) => {
                console.log(response)
                if(response.data.isSuccess){
                  localStorage.setItem("username",this.ruleForm.name)
                  localStorage.setItem("userImg",response.data.message)
                  localStorage.setItem("islogin",response.data.isSuccess)
                  localStorage.setItem("token",response.data.token)
                  this.$router.push('/')
                  this.$store.state.showUserMessage = true
                  this.$store.state.userName = localStorage.getItem("username")
                  this.$store.state.userImgUrl = localStorage.getItem("userImg")
                  this.$store.state.token = localStorage.getItem("token")
                  this.$message({
                  type: "success",
                  message: "登录成功!"
                });
                }else{
                  alert("用户名或密码错误")
                  return
                }
              })
              .catch(err => {
                this.$message({
                  type: "error",
                  message: "服务器错误，请稍后重新登陆!"
                });
                console.log(err);
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    exitForm() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style>
/* 透明层背景 */
.fun_head {
  margin: 0 auto;

  height: 60px;
  line-height: 60px;
  background-color: #67c23a;
  text-align: center;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.bg_layout {
  position: absolute;
  width: 100%;
  height: 1000px;
  z-index: 999;
  margin-top: -970px;
  background-color: rgba(0, 0, 0, 0.7);
}
/* 主要内容的容器 */
.form_layout {
  width: 400px;
  height: 500px;
  margin: 200px auto;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.demo-ruleForm {
  padding-top: 15px;
  padding-right: 50px;
  padding-left: 50px;
}
.ab_parent {
  height: 425px;
  position: relative;
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