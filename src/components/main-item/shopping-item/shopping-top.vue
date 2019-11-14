<template>
  <div id="shopping-top">
    <el-row>
  <el-col :span="12"><h3 id="shoppingTitle">商品管理</h3></el-col>
  <el-col :span="12" id ="search">
      <el-input placeholder="请输入要搜索的商品" clearable id="searchContent">
      </el-input>
      <el-button type="primary" icon="el-icon-search" id="searchBtn">搜索</el-button>
      
</el-col>
</el-row>
  </div>
</template>
<script>
export default {
  name: "ShoppingTop"
};
</script>
<style>
#shoppingTitle{
    margin-top: 0;
    margin-left: 30px;
    font-family: Microsoft YaHei;
    font-weight: 700;
    font-size: 35px;
    color:rgb(36, 133, 230)
}
#search{
    display: flex;
}
#searchContent{
    width: 40%;
    float: right;
    margin-right: 10px;
}

</style>