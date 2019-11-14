<template>
  <div id="audit">
    <!-- 展示区 -->
    <el-table
      :data="auditList"
      style="width: 70%;"
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
      <!-- 用户审核状态 -->
      <el-table-column label="审核状态" prop="auditStatu" min-width="20%">
        <template slot-scope="{row,$index}">
          <el-select v-model="row.auditStatu" v-show="showEdit[$index]">
            <el-option
              v-for="item in auditStatuList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <span v-show="!showEdit[$index]">{{row.auditStatu}}</span>
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
</template>
<script>
export default {
  name: "Audit",
  data(){
    return{
      auditList:[],
      authNameList:[],
      auditStatuList:[
        {
          name:'审核通过'
        },
        {
          name:'审核不通过'
        }
      ],
      pagesize: 10, //分页控制
      currentPage: 1, //分页控制
      total: 1000, //分页控制
      showEdit: [], //显示编辑框
      authNameList: [], //权限清单
      currentAuthName: "",
      currentAuditName:'',
    }
  },
  methods:{ 
     //点击编辑
    handleEdit(index, row) {
      this.currentAuthName = row.name;
      this.currentAuditName = row.auditStatu;
      for (var i = 0; i < this.auditList.length; i++) {
        if (this.showEdit[i]) {
          return;
        }
      }
      this.showAuditList();
      this.showEdit[index] = true;
    },
    //取消编辑
    cancelEdit(index, row) {
      this.showEdit[index] = false;
      this.showAuditList();
    },

    //初始化用户权限以及更改用户审核状态
    handleUpdate(row, index) {
      if (row.name != this.currentAuthName || row.auditStatu != this.currentAuditName) {
        var userDTO = {
          id: row.id,
          name: row.name,
          auditStatu: row.auditStatu
        };
        this.$axios
          .get("/user/audituser", { params: userDTO })
          .then(resp => {
            if (resp.data.isSuccess) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.showAuditList();
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
    showAuditList() {
      this.$axios.get("/user/showauditlist").then(res => {
        console.log(res);
        this.auditList = res.data.data;
        this.authNameList = res.data.data2;
        this.total = this.auditList.length;
      });
    }
  },
  created() {
    this.showAuditList();
  }
};
</script>

<style>
.userAuth_table .cell {
  text-align: center;
}
</style>