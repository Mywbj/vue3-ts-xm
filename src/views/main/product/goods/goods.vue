<template>
  <BJPageSearch
    :searchFormConfig="searchFormConfig"
    @handleResetClick="handleResetClick"
    @handleQueryClick="handleQueryClick"
  />
  <BJPageContent :contentTableConfig="contentTableConfig" pageName="goods" ref="pageContentRef">
    <template #imgUrl="scope">
      <el-image
        style="width: 100px; height: 100px"
        preview-teleported
        :z-index="9999"
        :src="scope.row.imgUrl"
        :preview-src-list="[scope.row.imgUrl]"
        fit="cover"
      />
    </template>
    <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }} </template>
    <template #newPrice="scope"> ￥{{ scope.row.newPrice }} </template>
    <template #status="scope">
      <el-button plain size="small" :type="scope.row.status ? 'success' : 'danger'">
        {{ scope.row.status ? '启用' : '禁用' }}
      </el-button>
    </template>
  </BJPageContent>
</template>
<script setup lang="ts">
import BJPageSearch from '@/components/page-search'
import BJPageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
</script>
<style lang="less" scoped></style>
