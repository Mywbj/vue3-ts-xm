<template>
  <BJPageSearch
    :searchFormConfig="searchFormConfig"
    @handleResetClick="handleResetClick"
    @handleQueryClick="handleQueryClick"
  />
  <BJPageContent :contentTableConfig="contentTableConfig" pageName="menu" ref="pageContentRef"/>
</template>
<script setup lang="ts">
import BJPageContent from '@/components/page-content'
import BJPageSearch from '@/components/page-search'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'
const {pageContentRef, handleResetClick, handleQueryClick} = usePageSearch()
</script>
<style lang="less" scoped></style>
