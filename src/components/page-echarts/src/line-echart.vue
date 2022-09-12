<template>
  <div class="line-echart">
    <BJEchart :options="options" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
import BJEchart from '@/base-ui/echart'
import { IDataType } from '../types'
const props = withDefaults(
  defineProps<{
    data: IDataType[]
    title: string
    xLabels: string[]
    values: any[]
  }>(),
  {
  }
)

const options = computed(() => {
  return {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['分类销量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '分类销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: props.values
      }
    ]
  }
})
</script>
<style scoped></style>
