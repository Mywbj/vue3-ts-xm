<template>
  <div class="map-echart">
    <BJEchart :options="options" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
// import * as echarts from 'echarts'
import BJEchart from '@/base-ui/echart'

// const props = defineProps<{
//   title?: string
// }>()

// function randomData() {
//   return Math.round(Math.random() * 1000)
// }

const options = computed<any>(() => {
  return {
    animation: true,
    animationThreshold: 2000,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDelay: 0,
    animationDurationUpdate: 300,
    animationEasingUpdate: 'cubicOut',
    animationDelayUpdate: 0,
    color: [
      '#c23531',
      '#2f4554',
      '#61a0a8',
      '#d48265',
      '#749f83',
      '#ca8622',
      '#bda29a',
      '#6e7074',
      '#546570',
      '#c4ccd3',
      '#f05b72',
      '#ef5b9c',
      '#f47920',
      '#905a3d',
      '#fab27b',
      '#2a5caa',
      '#444693',
      '#726930',
      '#b2d235',
      '#6d8346',
      '#ac6767',
      '#1d953f',
      '#6950a1',
      '#918597'
    ],
    series: [
      {
        type: 'map',
        name: '商品销量',
        label: {
          show: true,
          position: 'top',
          color: '#00f',
          margin: 8,
          formatter: '{b}:{c}'
        },
        mapType: 'china',
        data: [
          {
            name: '广州',
            value: 60
          },
          {
            name: '上海',
            value: 60
          },
          {
            name: '云南',
            value: 32
          },
          {
            name: '内蒙古',
            value: 19
          },
          {
            name: '北京',
            value: 82
          },
          {
            name: '吉林',
            value: 48
          },
          {
            name: '四川',
            value: 58
          },
          {
            name: '天津',
            value: 55
          },
          {
            name: '宁夏',
            value: 9
          },
          {
            name: '安徽',
            value: 47
          },
          {
            name: '山东',
            value: 145
          },
          {
            name: '山西',
            value: 35
          },
          {
            name: '广东',
            value: 48
          },
          {
            name: '广西',
            value: 33
          },
          {
            name: '新疆',
            value: 21
          },
          {
            name: '江苏',
            value: 132
          },
          {
            name: '江西',
            value: 73
          },
          {
            name: '河北',
            value: 91
          },
          {
            name: '河南',
            value: 77
          },
          {
            name: '浙江',
            value: 54
          },
          {
            name: '海南',
            value: 16
          },
          {
            name: '湖北',
            value: 90
          },
          {
            name: '湖南',
            value: 74
          },
          {
            name: '甘肃',
            value: 19
          },
          {
            name: '福建',
            value: 32
          },
          {
            name: '西藏',
            value: 3
          },
          {
            name: '贵州',
            value: 27
          },
          {
            name: '辽宁',
            value: 76
          },
          {
            name: '重庆',
            value: 27
          },
          {
            name: '陕西',
            value: 65
          },
          {
            name: '青海',
            value: 5
          },
          {
            name: '香港',
            value: 2
          },
          {
            name: '黑龙江',
            value: 67
          }
        ],
        roam: true,
        zoom: 1,
        showLegendSymbol: true,
        emphasis: {},
        rippleEffect: {
          show: true,
          brushType: 'stroke',
          scale: 2.5,
          period: 4
        }
      }
    ],
    legend: [
      {
        data: ['商品销量'],
        selected: {
          商品销量: true
        },
        show: true
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'mousemove|click',
      formatter(params: any) {
        return params.name + ' : ' + params.value
      },
      axisPointer: {
        type: 'line'
      },
      textStyle: {
        fontSize: 14
      },
      borderWidth: 0
    },
    visualMap: {
      show: true,
      type: 'continuous',
      min: 0,
      max: 150,
      text: ['高', '低'],
      inRange: {
        color: ['#50a3ba', '#eac763', '#d94e5d']
      },
      calculable: true,
      splitNumber: 5,
      orient: 'vertical',
      showLabel: true
    }
  }
})
</script>
<style scoped></style>
