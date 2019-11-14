<template>
  <div id="Title">
    <h1 id="Title1">欢迎来到</h1>
    <h2 id="Title2">oy智能商城管理后台系统</h2>
  </div>
</template>
<script>
export default {
  name: "Title"
};
</script>

<style>
#Title{
    background: url('../assets/indexImg.jpg') ;
    background-size:100%;
    height:100%;
    width:100%;
    overflow: hidden;
    text-align:center;
    margin:0 auto;
}
#Title1{
    margin-top:200px;
    color:rgb(85, 148, 211);
    font-size: 50px;
    font-weight: 600;
}
#Title2{
    margin-top:20px;
    color:rgb(85, 148, 211);
    font-size: 40px;
    font-weight: 550;
}

</style>