import * as echarts from 'echarts'
import chinaMapData from '@/base-ui/echart/data/china.json'

echarts.registerMap('china', chinaMapData)

export default function useEChart(el: HTMLElement) {
  const echartsInstance = echarts.init(el, 'light', {
    renderer: 'svg',
  })

  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const updateResize = () => {
    echartsInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  return {
    setOptions,
    updateResize,
    echartsInstance
  }
}
