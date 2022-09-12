<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <span class="username">{{ userName }}</span>
        <el-icon class="el-icon--right">
          <ArrowDownBold />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import cache from '@/utils/cache'
import router from '@/router'
const store = useStore()
const userName = computed(() => store.state.login.userInfo.name)
function handleExitLogin() {
  cache.deleteCache('token')
  router.push('/login')
}
</script>
<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  .username {
    margin-left: 5px;
  }
}
</style>
