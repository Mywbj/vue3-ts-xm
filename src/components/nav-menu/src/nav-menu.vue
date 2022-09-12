<template>
  <div class="nav-menu">
    <div class="logo-box">
      <img class="img" src="~@/assets/logo.png" alt="logo" />
      <span class="title" v-show="!isCollapse">Vue3+TS</span>
    </div>
    <el-menu
    :default-active="menuDefaultActive"
    :collapse="isCollapse"
    class="el-menu-vertical-demo" background-color="#020F20" text-color="#fff">
      <template v-for="(item) in userMenus" :key="item.id">
        <template v-if="item.type === 1">
        <el-sub-menu :index="item.id+''">
          <template #title>
            <!-- <i v-if="item.icon" :class="item.icon"></i> -->
            <el-icon v-if="item.icon">
              <component :is="changeElIcon(item.icon, ElementPlusIconsVue)" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(subitem) in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id+''" @click="handleMenuItemClick(subitem)">
              <el-icon v-if="subitem.icon">
                <component :is="changeElIcon(subitem.icon, ElementPlusIconsVue)" />
              </el-icon>
              <span>{{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import * as ElementPlusIconsVue  from '@element-plus/icons-vue'

import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '@/store'

import type { IMenuItem } from '@/service/login/types'

import { pathMapToMenu } from '@/utils/map-menus'
import { changeElIcon } from '@/utils/util'

let menuDefaultActive = ref()
const router = useRouter()
const store = useStore()
const route = useRoute()
const userMenus = computed(() => store.state.login.userMenus)

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

setupPathToMenu(route.path)

onBeforeRouteUpdate((to) => {
  setupPathToMenu(to.path)
})

function setupPathToMenu(currentPath: string) {
  const routePath = pathMapToMenu(userMenus.value, currentPath)
  if (routePath) {
    menuDefaultActive.value = routePath.id + ''
  }
}

function handleMenuItemClick(menu: IMenuItem) {
  router.push({
    path: menu.url ?? '/not-found'
  })
}
</script>
<style lang="less" scoped>
.nav-menu {
  .logo-box {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    .img {
      width: 25px;
      height: 25px;
    }
    .title {
      font-size: 13px;
      color: #fff;
      margin-left: 10px;
    }
  }
}
.el-menu {
  border-right: none;
}
</style>
