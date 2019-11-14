<template>
  <div id="LeftNav">
    <el-menu>
      <el-menu-item>
        <router-link
          to="/main/shopping"
          tag="div"
        >
          <i class="el-icon-s-shop"></i>商品管理
        </router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link
          to="/main/order"
          tag="div"
        >
          <i class="el-icon-s-claim"></i>订单管理
        </router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link
          to="/main/usermanager"
          tag="div"
        >
          <i class="el-icon-s-custom"></i>用户管理
        </router-link>
      </el-menu-item>
      <el-menu-item >
        <router-link
          to="/main/authmanage"
          tag="div"
        >
          <i class="el-icon-info"></i>权限管理
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { checkRoleId, isAdmin } from "../utils/checkRoleId";
export default {
  name: "LeftNav",
  methods: {
    checkAdmin() {
      if (isAdmin == 700) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    checkRoleId();
  }
};
</script>

<style>
#LeftNav .el-menu-item {
  background-color: rgb(41, 39, 40);
  font-size: 20px;
  font-weight: 600;
  color: teal;
}
#LeftNav .el-menu-item:focus {
  background-color: rgb(105, 175, 236);
}
.el-menu {
  border-right: solid 1px rgb(41, 39, 40) !important;
}

#LeftNav .el-menu-item:hover {
  background-color: rgb(83, 159, 226);
}
</style>