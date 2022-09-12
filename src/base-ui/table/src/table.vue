<template>
  <div class="bj-table">
    <div class="header _flex-center-between">
      <slot name="header">
        <div class="left">
          <h4>{{ title }}</h4>
        </div>
        <div class="right">
          <slot name="headerHandle">
          </slot>
        </div>
      </slot>
    </div>
    <el-table :data="data" border @selection-change="handleSelecttionChange" v-bind="childrenProps">
      <el-table-column v-if="showSelectColumn" type="selection" align="center" />
      <el-table-column v-if="showIndexColumn" type="index" label="序号" width="80" align="center" />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.prop" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer _flex-center-between">
      <slot name="footer" v-if="showFooter">
        <div></div>
        <div>
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 15, 20, 30, 50]"
            :small="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
          />
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  totalCount: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: '列表'
  },
  propList: {
    type: Array as PropType<any>,
    default: () => []
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  page: {
    type: Object,
    default: () => ({
      pageSize: 10,
      currentPage: 0
    })
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{ (name: string, value: any): void }>()

function handleSelecttionChange(value: any) {
  emit('selectionChange', value)
}

function handlePageSizeChange(pageSize: number) {
  emit('update:page', { ...props.page, pageSize })
}
function handleCurrentPageChange(currentPage: number) {
  emit('update:page', { ...props.page, currentPage })

}
</script>
<style lang="less" scoped>
.footer {
  margin-top: 10px;
}
</style>
