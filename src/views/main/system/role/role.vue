<template>
  <BJPageSearch
    :searchFormConfig="searchFormConfig"
    @handleResetClick="handleResetClick"
    @handleQueryClick="handleQueryClick"
  />
  <BJPageContent
    :contentTableConfig="contentTableConfig"
    pageName="role"
    ref="pageContentRef"
    @newBtnClick="handleNewBtnClick"
    @editBtnClick="handleEditBtnClick"
  />
  <BJPageModal pageName="role" :modalConfig="modalConfig" :defaultInfo="defaultInfo" :otherInfo="otherInfo" :slots="slots" ref="pageModalRef">
    <template #tree>
      <el-tree
        :data="treeMenus"
        show-checkbox
        node-key="id"
        :props="{children: 'children', label: 'name'}"
        :default-checked-keys="defaultTreeKeys"
        @check="handleCheck">
      </el-tree>
    </template>
  </BJPageModal>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store'

import BJPageContent from '@/components/page-content'
import BJPageSearch from '@/components/page-search'
import BJPageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig, slots } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { mapMenusToTree } from '@/utils/map-menus'
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()

const otherInfo = ref({})
const defaultTreeKeys = ref<number[]>([])

const editCallback = (item: any) => {
  // 设置tree默认选中
  defaultTreeKeys.value = mapMenusToTree(item.menuList ?? [])
}

const { pageModalRef, defaultInfo, handleNewBtnClick, handleEditBtnClick } = usePageModal(undefined, editCallback)


const store = useStore()
const treeMenus = computed(() => store.state.entireMenu)

const handleCheck = (data: any, node: any) => {
  const { checkedKeys, halfCheckedKeys } = node
  otherInfo.value = { menuList: [...checkedKeys, ...halfCheckedKeys] }

}
</script>
<style lang="less" scoped></style>
