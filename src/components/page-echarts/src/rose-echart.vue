<template>
  <div class="rose-echart">
    <BJEchart :options="options" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BJEchart from '@/base-ui/echart'
import { IDataType } from '../types'

const props = defineProps<{
  data: IDataType[]
}>()
const options = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.data
      }
    ]
  }
})
</script>
<style scoped></style>
