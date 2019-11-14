<template>
  <div id="goodType">
    <!-- 商品类型table -->
    <el-row style="width:100%" :gutter="30">
      <!-- 商品子类型管理 -->
      <el-col :span="14">
        <h2 class="table_title">子类型管理</h2>
        <!-- 子类型添加 -->
        <el-row style="width:100%;margin-top: 10px;">
          <el-col :span="20" style>
            <label class="add_title">商品子类型添加：</label>
            <template>
              <el-select
                v-model="parentType"
                filterable
                placeholder="选择父类型"
                style="width:30%; margin-right:5px"
              >
                <el-option v-for="item in typeOptions" :key="item.id" :value="item.pname"></el-option>
              </el-select>
            </template>
            <template>
              <el-input placeholder="商品子类型添加" v-model="goodType" clearable style="width:44%;"></el-input>
            </template>
          </el-col>
           <el-col :span="2" style>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8001/file/upload"
              name="imgUpload"
              :show-file-list="false"
              :on-success="goodTypeAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="uploadError"
              :header="token"
            >
              <img v-if="goodTypeImg" :src="goodTypeImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-col>
           <el-col :span="2" style>
          <el-button type="primary" icon="el-icon-plus" circle @click="addType"></el-button></el-col>
        </el-row>
        <!-- 展示子类型table -->
        <el-table
          :data="goodTypeList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :span-method="renderTable"
          border
          style="width: 100%;margin-top: 10px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="12%"></el-table-column>
          <el-table-column type="index" label="序号" min-width="12%"></el-table-column>
          <el-table-column prop="pname" label="商品父类型" min-width="20%"></el-table-column>
          <el-table-column label="图片" min-width="12%">
            <template slot-scope="{row}">
              <img style="width:40px;height:40px;" :src="row.imgSrc" />
            </template>
          </el-table-column>
          <el-table-column prop="cname" label="商品子类型" min-width="28%">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.cname" v-show="showEdit[$index]" placeholder="请输入内容"></el-input>
              <span v-show="!showEdit[$index]">{{row.cname}}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" min-width="25%">
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
              <!-- 删除 -->
              <el-button
                size="medium"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteGoodType(row.id)"
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
      </el-col>

      <!-- 展示商品父类型 -->
      <el-col :span="10">
        <h2 class="table_title">父类型管理</h2>
        <!-- 父类型添加 -->
        <el-row style="width:100%;margin-top: 10px;">
          <el-col :span="18" style>
            <label class="add_title">商品父类型添加：</label>
            <template>
              <el-input
                placeholder="商品父类型添加"
                v-model="parentTypeVal"
                clearable
                style="width:180px;"
              ></el-input>
            </template>
          </el-col>
          <el-col :span="3" style>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8001/file/upload"
              name="imgUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="uploadError"
              :header="token"
            >
              <img v-if="parentTypeImg" :src="parentTypeImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="3" style>
            <el-button type="primary" icon="el-icon-plus" circle @click="addParentType"></el-button>
          </el-col>
        </el-row>
        <!-- 展示父类型列表 -->
        <el-table
          :data="typeOptions"
          border
          style="width: 100%; margin-top: 10px;"
          max-height="681px"
          id="parentTable"
        >
          <el-table-column type="index" label="序号" min-width="10%"></el-table-column>
          <el-table-column label="图片" min-width="10%">
            <template slot-scope="{row}">
              <img style="width:40px;height:40px;" :src="row.imgUrl" />
            </template>
          </el-table-column>
          <el-table-column prop="pname" label="商品父类型" min-width="22%">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.pname" v-show="showParentEdit[$index]" placeholder="请输入内容"></el-input>
              <span v-show="!showParentEdit[$index]">{{row.pname}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="25%">
            <template slot-scope="{row,$index}">
              <!-- 修改 -->
              <el-button
                size="medium"
                @click="handleUpdate2(row,$index)"
                v-show="showParentEdit[$index]"
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
                @click="cancelEdit2($index,row)"
                v-show="showParentEdit[$index]"
              ></el-button>
              <!-- 编辑 -->
              <el-button
                type="primary"
                size="medium"
                @click="parentEdit($index, row)"
                icon="el-icon-edit"
                circle
                v-if="!showParentEdit[$index]"
              ></el-button>
              <!-- 删除 -->
              <el-button
                size="medium"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deletePatrentGoodType(row.id)"
                v-if="!showParentEdit[$index]"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { checkRoleId, isAdmin } from "../../../utils/checkRoleId.js";
export default {
  name: "goodType",
  data() {
    return {
      parentTypeVal: "", //父类型修改类型
      parentTypeImg: "", //父类型图片
      goodTypeImg : "", //子类型图片
      goodTypeTable: false,
      pos: "", //计算行列
      serchText: "", //搜索内容
      //管理商品类型选择器
      typeOptions: [],
      typeOptionsCope: [],
      parentType: [],
      SpanArr: [], //获取表格合并行列数
      goodType: "", //商品子类型
      goodTypeList: [], //获取所有商品类型
      FgoodTypeList: [],
      pagesize: 10, //分页控制
      currentPage: 1,
      total: 1000,
      showEdit: [], //显示子类型编辑框
      showParentEdit: [], //显示父类型编辑框
      tableChecked2: [],
      token: "dasad"
    };
  },

  methods: {
    //检查权限
    checkAdmin() {
      if (isAdmin != 700 && isAdmin != 701) {
        this.$message({
          type: "error",
          message: "你没有权限进行此操作!"
        });
        throw SyntaxError();
      }
    },
    //获取批量选择的行
    handleSelectionChange(val) {
      this.tableChecked2 = val;
    },
    //点击编辑
    handleEdit(index, row) {
      for (var i = 0; i < this.goodTypeList.length; i++) {
        if (this.showEdit[i]) {
          return;
        }
      }
      this.checkAdmin();
      this.showGoodType();
      this.showEdit[index] = true;
    },
    //取消编辑
    cancelEdit(index, row) {
      this.showEdit[index] = false;
      this.showGoodType();
    },

    //修改子类型
    handleUpdate(row, index) {
      if (row.cname != null && row.cname != "") {
        var goodType = {
          id: row.id,
          cname: row.cname
        };
        this.$axios
          .get("/goods/goodTypeModify", { params: goodType })
          .then(resp => {
            if (resp.data.isSuccess) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.showGoodType();
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
          message: "类型名称不能为空!"
        });
      }
    },
    //点击编辑父类型
    parentEdit(index, row) {
      for (var i = 0; i < this.typeOptions.length; i++) {
        if (this.showParentEdit[i]) {
          return;
        }
      }
      this.checkAdmin();
      this.showGoodType();
      this.showParentEdit[index] = true;
    },
    //取消父编辑
    cancelEdit2(index, row) {
      this.showGoodType();
      this.showParentEdit[index] = false;
    },

    //修改父类型
    handleUpdate2(row, index) {
      if (row.pname != null && row.pname != "") {
        var parentGoodType = {
          id: row.id,
          pname: row.pname
        };
        this.$axios
          .get("/goods/parentGoodTypeModify", { params: parentGoodType })
          .then(resp => {
            if (resp.data.isSuccess) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.showGoodType();
              this.showParentEdit[index] = false;
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
          message: "类型名称不能为空!"
        });
      }
    },
    //添加商品类型
    addType() {
      this.checkAdmin();
      const that = this;
      if (
        this.parentType != null &&
        this.parentType != "" &&
        this.parentType != undefined
      ) {
        for (var j = 0; j < this.goodTypeList.length; j++) {
          if (this.goodType == this.goodTypeList[j].cname) {
            alert("子类型已存在，请重新输入");
            return;
          }
        }
        var params = new URLSearchParams();
        params.append("cname", this.goodType);
        params.append("pname", this.parentType);
        params.append("imgSrc", this.goodTypeImg);
        this.$axios
          .post("/goods/addType", params)
          .then(response => {
            if (!response.data.isSuccess) {
              this.$error({
                type: "error",
                message: "提交失败!"
              });
              return;
            } else {
              this.$message({
                type: "success",
                message: "提交成功!",
              });
              this.goodType = ''
              this.parentType = ''
               this.goodTypeImg = ''
              this.showGoodType();
            }
          })
          .catch(err => {
            console.log(error);
          });
      } else {
        alert("请选择父类型");
      }
    },
    //添加商品父类型
    addParentType() {
      this.checkAdmin();
      const that = this;
      if (this.parentTypeVal.length < 5) {
        for (var j = 0; j < this.typeOptions.length; j++) {
          if (this.parentTypeVal == this.typeOptions[j].pname) {
            alert("父类型已存在，请重新输入");
            return;
          }
        }
        var params = new URLSearchParams();
        params.append("pname", this.parentTypeVal);
         params.append("imgUrl", this.parentTypeImg);
        this.$axios
          .post("/goods/addParentType", params)
          .then(response => {
            if (!response.data.isSuccess) {
              this.$error({
                type: "error",
                message: "提交失败!"
              });
              return;
            } else {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.parentTypeImg = ''
              this.parentTypeVal = ''
              this.showGoodType();
            }
          })
          .catch(err => {
            console.log(error);
          });
      } else {
        this.$message({
          type: "error",
          message: "请输入长度小于5的父类型名称"
        });
      }
    },
    //上传图片功能
    handleAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.parentTypeImg = res.message;
      } else {
        alert("图片上传失败");
        return;
      }
    },
    //上传商品子类型图片
    goodTypeAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.goodTypeImg = res.message;
      } else {
        alert("图片上传失败");
        return;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或者 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    uploadError(err, file) {
      console.log(err);
    },
    //计算要合并的行列
    getRowAndColumn(arr) {
      this.SpanArr = [];
      // for(var j = 0; j < arr.length; j++){
      for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
          this.SpanArr.push(1);
          this.pos = 0;
        } else {
          //判断当前元素与上个元素是否相同
          if (i % 10 != 0) {
            if (arr[i].pname == arr[i - 1].pname) {
              this.SpanArr[this.pos] += 1;
              this.SpanArr.push(0);
            } else {
              this.SpanArr.push(1);
              this.pos = i;
            }
          } else {
            this.SpanArr.push(1);
            this.pos = i;
          }
        }
      }
      //   i = 0;
      // }
    },
    //合并行列
    renderTable({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        const rows = this.SpanArr[rowIndex + (this.currentPage - 1) * 10];
        return {
          rowspan: rows,
          colspan: 1
        };
      }
    },
    //分页函数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //显示商品类型并计算要合并的行列数
    showGoodType() {
      this.$axios.get("/goods/showType").then(res => {
        this.goodTypeList = res.data.data;
        this.FgoodTypeList = res.data.data;
        this.total = this.goodTypeList.length;
        this.getRowAndColumn(this.goodTypeList);
        this.typeOptions = res.data.data2; //获取父类型列表
      });
    },
    //删除子类型
    deleteGoodType(id) {
      this.checkAdmin();
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("/goods/goodTypedelete", {
              params: {
                goodTypeId: id
              }
            })
            .then(response => {
              if (response.data.isSuccess) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.showGoodType();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除父类型
    deletePatrentGoodType(id) {
      this.checkAdmin();
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("/goods/parentGoodTypedelete", {
              params: {
                parentGoodTypeId: id
              }
            })
            .then(response => {
              if (response.data.isSuccess) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.showGoodType();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  created() {
    checkRoleId();
  }
};
</script>

<style>
.add_title {
  font-size: 14px;
  color: #282c34;
}
.table_title {
  margin-top: 20px;
  font: 2em sans-serif;
  color: #282c34;
}

#goodType .avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
#goodType .avatar{
 color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>