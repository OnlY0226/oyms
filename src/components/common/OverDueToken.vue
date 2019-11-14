<template>
  <div id="OverDueToken">
    <h1 id="Title1">登陆超时</h1>
    <h2 id="Title2">请重新登录</h2>
  </div>
</template>
<script>
export default {
  name: "OverDueToken"
};
</script>

<style>
#OverDueToken{
    background: url('../../assets/indexImg.jpg') ;
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