<template>
  <el-card class="page-content">
    <BJTable :data="dataList" :totalCount="dataCount" v-bind="contentTableConfig" v-model:page="pageInfo">
      <template #headerHandle>
        <el-button :icon="RefreshRight">刷新</el-button>
        <el-button type="primary" :icon="Avatar" v-if="isCreate" @click="newBtnClick">新建用户</el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <el-button :icon="Edit" link type="primary" v-if="isUpdate" @click="editBtnClick(scope.row)">编辑</el-button>
        <el-button :icon="Delete" link type="danger" v-if="isDelete" @click="handleDelete(scope.row)">删除</el-button>
      </template>
      <!-- 动态slot -->
      <template v-for="item in defineSlots" :key="item.prop" #[item.prop]="scope">
        <slot :name="item.prop" :row="scope.row"></slot>
      </template>
    </BJTable>
  </el-card>
</template>
<script setup lang="ts">
import { ref, defineProps, computed, defineExpose, watch, markRaw, defineEmits } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useStore } from '@/store'

import { Delete, Edit, Avatar, RefreshRight } from '@element-plus/icons-vue'
import BJTable from '@/base-ui/table'

import { usePermission } from '@/hooks/use-permission'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{(name: string, value?: any): void}>()

const store = useStore()
// 权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 页码
const pageInfo = ref({
  pageSize: 10,
  currentPage: 1
})
// 发起数据请求
function getPageData(queryInfo: any = {}) {
  if (!isQuery) {
    return
  }
  store.dispatch('listData/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      size: pageInfo.value.pageSize,
      offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
      ...queryInfo
    }
  })
}
// 当页码发现改变的时候自动请求数据
watch(pageInfo, () => getPageData(), { immediate: true })
// 获取表格数据
const dataList = computed(() => store.getters['listData/pageListData'](props.pageName))
// 获取数据总条数
const dataCount = computed(() => store.getters['listData/pageCountData'](props.pageName))
// 动态设计slot
const defineSlots = props.contentTableConfig.propList.filter((item: any) => item.defineSlot)

// 删除
async function handleDelete(rowIte: any) {
  try {
    const res = await ElMessageBox.confirm('将永久删除该数据，是否继续？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      icon: markRaw(Delete)
    })
    if (res) {
      store.dispatch('listData/deletePageDataAction', {
        pageName: props.pageName,
        id: rowIte.id,
        getPageData
      })
    }
  } catch (e) {
    console.log('e: ', e);
  }
}

function newBtnClick() {
  emit('newBtnClick')
}

function editBtnClick(item: any) {
  emit('editBtnClick', item)
}

defineExpose({
  getPageData
})
</script>
<style lang="less" scoped>
.page-content {
  margin-top: 15px;
  background-color: #fff !important;
}
</style>
