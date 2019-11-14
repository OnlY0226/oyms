<template>
  <div id="NoToken">
    <h1 id="Title1">你还未登录</h1>
    <h2 id="Title2">请先登录</h2>
  </div>
</template>
<script>
export default {
  name: "NoToken"
};
</script>

<style>
#NoToken{
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