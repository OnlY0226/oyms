<template>
  <div id="Main">
     <router-view></router-view>
  </div>
</template>

<script>

const Order =() => import('../components/main-item/order.vue')
const Shopping =() => import('../components/main-item/shopping.vue')
const UserManager =() => import('../components/main-item/userManager.vue')

export default {
  name: "Main",
  components: {
    Order,
    Shopping,
    UserManager,
  }

};
</script>

<style>
</style>