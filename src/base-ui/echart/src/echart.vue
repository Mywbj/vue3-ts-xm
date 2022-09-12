<template>
  <div class="bj-echart">
    <div ref="echartsContainer" :style="{width: width, height: height}"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import useEChart from '@/hooks/use-echart'

const props = withDefaults(
  defineProps<{
    width?: string,
    height?: string,
    options?: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartsContainer = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEChart(echartsContainer.value as HTMLElement)
  watchEffect(() => {
    setOptions(props.options as EChartsOption)
  })
})
</script>
<style lang="less" scoped></style>
