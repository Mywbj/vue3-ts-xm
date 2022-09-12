<template>
  <div class="nav-header">
    <div class="hader-left">
      <el-icon :size="25" color="#000" class="icon" @click="changeCollapseIcon">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="hader-right">
      <div class="hr-left">
        <BJBreadcrumd :breadcrumbs="breadcrumbs" />
      </div>
      <div class="hr-right">
        <UserInfo />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import BJBreadcrumd from '@/base-ui/breadcrumb'
import UserInfo from './cpns/user-info.vue'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

let timeId: number
let isCollapse = ref(false)
const emit = defineEmits<{ (name: 'update:changeCollapse', value: boolean): void }>()
function changeCollapseIcon() {
  emit('update:changeCollapse', (isCollapse.value = !isCollapse.value))
}

const store = useStore()
const route = useRoute()
const breadcrumbs = computed(() => pathMapBreadcrumbs(store.state.login.userMenus, route.path))

// 监听浏览器改变menu
window.addEventListener('resize', () => {
  if (timeId) {
    clearTimeout(timeId)
  }
  timeId = window.setTimeout(() => {
    const docWidth = document.body.clientWidth
    if (docWidth <= 768) {
      isCollapse.value = true
    } else {
      isCollapse.value = false
    }
    emit('update:changeCollapse', isCollapse.value)
  }, 200)
})
</script>
<style lang="less" scoped>
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  .hader-left {
    .icon {
      cursor: pointer;
    }
  }
  .hader-right {
    width: 100%;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    .hr-left {
      display: flex;
      align-items: center;
    }
    .hr-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
