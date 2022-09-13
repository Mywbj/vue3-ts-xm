<template>
  <div class="pie-echart">
    <BJEchart :options="options" />
  </div>
</template>
<script setup lang='ts'>
import { defineProps, computed } from 'vue'
import * as echarts from 'echarts'
import BJEchart from '@/base-ui/echart'
import { IDataType } from '../types'

const props = defineProps<{
  data: IDataType[]
}>()
const options = computed<echarts.EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style scoped>
</style>
