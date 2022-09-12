<template>
  <el-card class="page-search">
    <BJForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="btn-box">
          <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </BJForm>
  </el-card>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import BJForm from '@/base-ui/form'

const emit = defineEmits<{(name: string, value?: any): void}>()

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const formItems = props.searchFormConfig.formItems ?? []
const formOriginData = {}
for (const item of formItems) {
  (formOriginData as any)[item.field] = ''
}
const formData = ref(formOriginData)

// 点击重置
function handleResetClick() {
  formData.value = formOriginData
  emit('handleResetClick')
}
// 搜索
function handleQueryClick() {
  emit('handleQueryClick', formData)
}
</script>
<style lang="less" scoped>

.header {
  text-align: center;
}
.btn-box {
  text-align: right;
}
</style>
