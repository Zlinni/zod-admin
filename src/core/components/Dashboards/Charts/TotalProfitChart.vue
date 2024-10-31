<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useThemeVars } from '@/core/hooks/useThemeVars'
import { RGB } from '@/core/utils/rgbUtil'

const props = withDefaults(
  defineProps<{
    sparklineData: number[]
    totalSaleLastMonth: string
  }>(),
  {}
)

const series = [
  {
    data: [0, 20, 5, 30, 15, 45],
  },
]
const themeVars = useThemeVars()

const chartOptions = computed(() => {
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    grid: {
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: {
        top: -10,
        left: -7,
        right: 5,
        bottom: 5,
      },
    },
    stroke: {
      width: 3,
      lineCap: 'butt',
      curve: 'straight',
    },
    colors: [RGB.A(themeVars.value.primaryColor)],
    markers: {
      size: 6,
      offsetY: 4,
      offsetX: -2,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 5.5,
          seriesIndex: 0,
          strokeColor: RGB.A(themeVars.value.primaryColor),
          fillColor: RGB.with(themeVars.value.chartsBg),
          dataPointIndex: series[0].data.length - 1,
        },
      ],
      hover: { size: 7 },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
  }
})
</script>

<template>
  <NCard :borderd="false" class="h-fit shadow-primary">
    <template #header>
      <NFlex vertical :size="0">
        <NH5 class="mb-0 text-lg"> 收益 </NH5>
        <NP class="m-0 text-base"> 上个月 </NP>
      </NFlex>
    </template>
    <VueApexCharts
      type="line"
      :options="chartOptions"
      :series="series"
      :height="100" />
    <template #footer>
      <NH4 class="mb-0 text-2xl">{{ props.totalSaleLastMonth }}</NH4>
    </template>
  </NCard>
</template>
