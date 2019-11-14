<template>
  <div id="Register">
    <div class="bg_layout">
      <div class="form_layout">
        <div class="fun_head">修改用户信息</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm ab_parent1"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="isPassword">
            <el-input v-model="ruleForm.isPassword" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <el-form-item label="上传头像" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8001/file/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :header="token"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-row class="clickBtn my_footer">
            <el-button type="success" plain @click="submitForm('ruleForm')">修改</el-button>
            <el-button type="success" plain @click="exitForm">取消</el-button>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModifyUserinfo",
  data() {
    return {
      token: "dasad",
      ruleForm: {
        name: "",
        password: "",
        isPassword: "",
        imageUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" }
        ],
        isPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      if (this.ruleForm.password == this.ruleForm.isPassword) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios
              .post("http://localhost:8001/user/register", {
                userName: this.ruleForm.name,
                userPassword: this.ruleForm.password,
                userImageUrl: this.ruleForm.imageUrl
              })
              .then((response) => {
                if(!response.data.isSuccess){
                  alert("用户名已存在")
                  return
                }else{
                  alert("注册成功")
                  this.$router.go(-1);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            return false;
          }
        });
      } else {
        alert("两次密码不一致");
        return;
      }
    },
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
.demo-ruleForm {
  padding-top: 10px;
  padding-right: 50px;
  padding-left: 50px;
}
.ab_parent1 {
  height: 435px;
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
/* 头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>