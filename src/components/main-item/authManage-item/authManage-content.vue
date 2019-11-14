<template>
  <div id="authManage">
    <!-- 标题栏 -->
    <el-row>
      <el-col :span="12">
        <h3 id="userManagementTitle">{{userManagementTitle}}</h3>
      </el-col>
      <el-col :span="5" :offset="7" id="search">
        <el-input
          v-model="serchText"
          :placeholder="defauleText"
          id="searchContent"
          type="text"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>
    </el-row>
    <!-- 功能区 -->
    <el-row class="fun_btn_row">
      <el-col :span="18">
        <el-button type="primary" round @click="authControl">用户权限控制</el-button>
        <el-button type="primary" round @click="audit">审核新建用户</el-button>
      </el-col>
    </el-row>
    <!-- 展示用户权限控制 -->
    <div v-if="userManagementTitle == '用户权限控制'">
      <!-- 展示区 -->
      <el-table
        :data="userAuthList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 60%;"
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        class="userAuth_table"
      >
        <el-table-column type="index" width="50" min-width="6%"></el-table-column>
        <el-table-column label="头像" prop="userImg" min-width="9%">
          <template slot-scope="{row}">
            <img style="width:40px;height:40px;" :src="row.userImg" />
          </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="userName" min-width="20%"></el-table-column>
        <!-- 权限 -->
        <el-table-column label="用户权限" prop="name" min-width="20%">
          <template slot-scope="{row,$index}">
            <el-select v-model="row.name" v-show="showEdit[$index]">
              <el-option
                v-for="item in authNameList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <span v-show="!showEdit[$index]">{{row.name}}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="{row,$index}">
            <!-- 修改 -->
            <el-button
              size="medium"
              @click="handleUpdate(row,$index)"
              v-show="showEdit[$index]"
              type="success"
              icon="el-icon-check"
              circle
            ></el-button>
            <!-- 取消 -->
            <el-button
              type="danger"
              size="medium"
              icon="el-icon-close"
              circle
              @click="cancelEdit($index,row)"
              v-show="showEdit[$index]"
            ></el-button>
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="medium"
              @click="handleEdit($index, row)"
              icon="el-icon-edit"
              circle
              v-if="!showEdit[$index]"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控制 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <div v-else>
      <Audit></Audit>
    </div>
  </div>
</template>
<script>
import Audit from "./audit";
export default {
  components: {
    Audit
  },
  name: "AuthManageContent",
  data() {
    return {
      serchText: "", //绑定搜索框内容
      defauleText: "搜索用户", //搜索框默认显示内容
      userManagementTitle: "用户权限控制", //标题内容 默认显示
      userAuthList: [], //带权限用户列表展示
      pagesize: 10, //分页控制
      currentPage: 1, //分页控制
      total: 1000, //分页控制
      showEdit: [], //显示编辑框
      authNameList: [], //权限清单
      currentAuthName: ""
    };
  },
  methods: {
    //切换到用户权限控制
    authControl() {
      this.userManagementTitle = "用户权限控制";
    },
    //切换到新建用户审核
    audit() {
      this.userManagementTitle = "审核新建用户";
    },
    //点击编辑
    handleEdit(index, row) {
      this.currentAuthName = row.name;
      for (var i = 0; i < this.userAuthList.length; i++) {
        if (this.showEdit[i]) {
          return;
        }
      }
      this.showUserList();
      this.showEdit[index] = true;
    },
    //取消编辑
    cancelEdit(index, row) {
      this.showEdit[index] = false;
      this.showUserList();
    },

    //修改用户权限
    handleUpdate(row, index) {
      if (row.name != this.currentAuthName) {
        var user = {
          id: row.id,
          name: row.name
        };
        this.$axios
          .get("/user/userAuthModify", { params: user })
          .then(resp => {
            if (resp.data.isSuccess) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.showUserList();
              this.showEdit[index] = false;
            } else {
              this.$message({
                type: "error",
                message: "修改失败!"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$message({
          type: "error",
          message: "用户权限无改变!"
        });
      }
    },
    //分页函数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //分页函数
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //获取用户权限信息
    showUserList() {
      this.$axios.get("/user/showuserlist").then(res => {
        this.userAuthList = res.data.data;
        this.authNameList = res.data.data2;
        this.total = this.userAuthList.length;
      });
    }
  },
  created() {
    this.showUserList();
  }
};
</script>
<style>
#userManagementTitle {
  margin-top: 0;
  font-family: Microsoft YaHei;
  font-weight: 700;
  font-size: 35px;
  color: rgb(36, 133, 230);
}
.fun_btn_row {
  margin-top: 10px;
  margin-bottom: 20px;
}

.userAuth_table .cell {
  text-align: center;
}
</style>