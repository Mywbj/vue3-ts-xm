<template>
  <div class="dashboard">
    <!-- <div ref="echartsContainer" :style="{width: '600px', height: '500px'}"></div> -->
    <el-row :gutter="10">
      <el-col :span="7">
        <BJCard title="分类商品数量(饼图)">
          <template #content>
            <BJPieEchart :data="pieData" />
          </template>
        </BJCard>
      </el-col>
      <el-col :span="10">
        <BJCard title="不同城市商品销量">
          <template #content>
            <BJMapEchart :data="mapData" />
          </template>
        </BJCard>
      </el-col>
      <el-col :span="7">
        <BJCard title="分类商品数量(玫瑰图)">
          <template #content>
            <BJRoseEchart :data="pieData" />
          </template>
        </BJCard>
      </el-col>
    </el-row>

    <div class="content-row">
      <el-row :gutter="10">
        <el-col :span="12">
          <BJCard title="分类商品的销量">
            <template #content>
              <BJLineEchart v-bind="lineData" />
            </template>
          </BJCard>
        </el-col>
        <el-col :span="12">
          <BJCard title="分类商品的收藏">
            <template #content>
              <BJBarEchart v-bind="barData" />
            </template>
          </BJCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import BJCard from '@/base-ui/card'
import { BJPieEchart, BJRoseEchart, BJLineEchart, BJBarEchart, BJMapEchart } from '@/components/page-echarts'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

const pieData = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map(item => {
    return { name: item.name, value: item.goodsCount }
  })
})

const lineData = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return { xLabels, values }
})

const barData = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLabels, values }
})

const mapData = computed(() => {
  return store.state.dashboard.addressGoodsSale.map(item => {
    return { name: item.address, value: item.count }
  })
})


</script>
<style lang="less" scoped>
.content-row {
  margin-top: 20px;
}
</style>
