<template>
  <el-container class="main-content">
    <el-aside :width="collapse ? '64px' : '200px'" class="main-menus">
      <NavMenu :isCollapse="collapse"/>
    </el-aside>
    <el-container class="page">
      <el-header class="page-header">
        <NavHeader v-model:changeCollapse="collapse"/>
      </el-header>
      <el-main class="page-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { ElMessage } from 'element-plus'
let collapse = ref(false)
ElMessage({
  message: '欢迎回来~',
  type: 'success',
})
</script>
<style lang="less" scoped>
.main-content {
  height: 100vh;
  .main-menus {
    background-color: #091929;
    transition: all .3s;
    box-shadow: 2px 0 6px rgba(0, 0, 0, .3);
    z-index: 999;
  }
  .page-header {
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    z-index: 999;
  }
  .page-content {
    background-color: #f4f5f7;
  }
}
</style>
