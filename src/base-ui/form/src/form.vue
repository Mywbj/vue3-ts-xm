<template>
  <div class="bj-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item v-if="!item.isHidden" :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="['input', 'password'].includes(item.type)">
                <el-input
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :model-value="modelValue[item.field]"
                @update:model-value="handleValueChange($event, item.field)">
                  <el-option v-for="option in item.options" :key="option.label" :label="option.label" :value="option.value" />
                </el-select>
              </template>
              <template v-else-if="item.type === 'date'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import { IFormItem } from '../types'

const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({
      padding: '10px 40px'
    })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  modelValue: {
    type: Object,
    required: true
  }
})

// const formData = ref({ ...props.modelValue })

const emit = defineEmits<{ (name: string, value: any): void }>()

// watch(
//   () => formData,
//   (newValue) => {
//     emit('update:modelValue', newValue)
//   },
//   { deep: true }
// )
function handleValueChange(value: string, field: string) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>
<style lang="less" scoped>
// ::v-deep .el-input__inner {
//   height: 35px;
// }
</style>
