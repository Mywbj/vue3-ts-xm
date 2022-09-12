<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%" center destroy-on-close>
    <BJForm v-bind="modalConfig" v-model="formData" />
    <template v-for="item in slots" :key="item.name">
      <div class="form-box">
        <label>{{ item.label }}</label>
        <slot :name="item.name"></slot>
      </div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, defineProps, defineExpose, watch, PropType } from 'vue'
import BJForm from '@/base-ui/form'
import { useStore } from '@/store'
import { listKeys } from '@/store/main/list-data/types'

const props = defineProps({
  pageName: {
    type: String,
    required: true
  },
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  slots: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const dialogVisible = ref(false)
const dialogTitle = ref('hello')
const formData = ref({})

watch(
  () => props.defaultInfo,
  (newValue: any) => {
    for (const item of props.modalConfig.formItems) {
      ;(formData.value as any)[item.field] = newValue[item.field]
    }
  }
)

const store = useStore()

const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    store.dispatch('listData/' + listKeys.EDIT_PAGE_DATA_ACTION, {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    store.dispatch('listData/' + listKeys.CREATE_PAGE_DATA_ACTION, {
      pageName: props.pageName,
      newInfo: { ...formData.value, ...props.otherInfo }
    })
  }
}

const setDialogTitle = (title: string) => {
  dialogTitle.value = title
}

defineExpose({
  dialogVisible,
  setDialogTitle
})
</script>
<style lang="less" scoped>
  .form-box {
    display: flex;
    padding: 10px 40px;
    label {
      width: 100px;
      display: inline-block;
      text-align: right;
      padding-right: 12px;
      box-sizing: border-box;
    }
  }
</style>
