<template>
  <BJPageSearch
    :searchFormConfig="searchFormConfig"
    @handleResetClick="handleResetClick"
    @handleQueryClick="handleQueryClick"
  />
  <BJPageContent
    :contentTableConfig="contentTableConfig"
    pageName="users"
    ref="pageContentRef"
    @newBtnClick="handleNewBtnClick"
    @editBtnClick="handleEditBtnClick"
  >
    <template #enable="scope">
      <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">
        {{ scope.row.enable ? '启用' : '禁用' }}
      </el-button>
    </template>
  </BJPageContent>
  <BJPageModal pageName="users" :defaultInfo="defaultInfo" ref="pageModalRef" :modalConfig="modalConfigRef"></BJPageModal>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import BJPageSearch from '@/components/page-search'
import BJPageContent from '@/components/page-content'
import BJPageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()

const newCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
  // eslint-disable-next-line
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
  // eslint-disable-next-line
  passwordItem!.isHidden = true
}
const { pageModalRef, defaultInfo, handleNewBtnClick, handleEditBtnClick } = usePageModal(newCallback, editCallback)

const store = useStore()
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
  // eslint-disable-next-line
  departmentItem!.options = store.state.entireDeparment.map((item) => ({ label: item.name, value: item.id }))

  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  // eslint-disable-next-line
  roleItem!.options = store.state.entireRole.map((item) => ({ label: item.name, value: item.id }))
  return modalConfig
})
</script>
<style lang="less" scoped></style>
