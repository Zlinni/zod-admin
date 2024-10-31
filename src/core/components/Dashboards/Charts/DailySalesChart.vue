<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import numeral from 'numeral'

const props = withDefaults(
  defineProps<{
    sparklineData: number[]
    name: string
    labels?: string[]
    totalSaleThisMonth: number
  }>(),
  {
    labels: () => ['1', '2', '3', '4'],
  }
)

const series = [
  {
    name: props.name,
    data: props.sparklineData,
  },
]
const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'area',
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical', // 渐变类型为线性渐变
      shadeIntensity: 1, // 渐变着色强度
    },
  },
  labels: props.labels,
  xaxis: {
    type: 'category',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#28c76f'],
}
</script>

<template>
  <NCard :borderd="false" class="h-fit shadow-primary" content-class="!px-0">
    <template #header>
      <NFlex vertical :size="0">
        <NH5 class="mb-3 text-lg"> 日均销售额(季度) </NH5>
        <NP class="m-0 text-base"> 本月总销售额 </NP>
        <NH4 class="m-0 text-2xl">
          ¥{{ numeral(totalSaleThisMonth).format('0,0') }}
        </NH4>
      </NFlex>
    </template>
    <div class="h-[120px] desktop:h-[80px]">
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        height="100%"></VueApexCharts>
    </div>
  </NCard>
</template>
