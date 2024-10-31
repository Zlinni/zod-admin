<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useThemeVars } from '@/core/hooks/useThemeVars'
import { breakpoints } from '@/core/utils/breakpoints'
import { RGB } from '@/core/utils/rgbUtil'

// const props = withDefaults(
//   defineProps<{
//     sparklineData: number[]
//     totalSaleLastMonth: string
//   }>(),
//   {}
// )
const themeVars = useThemeVars()
const series = [{ data: [0, 19, 7, 27, 15, 40] }]
const chartOptions = computed(() => ({
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  tooltip: { enabled: false },
  grid: {
    strokeDashArray: 6,
    //   borderColor: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`),
    xaxis: {
      lines: { show: true },
    },
    yaxis: {
      lines: { show: false },
    },
    padding: {
      top: -20,
      left: -5,
      right: 10,
      bottom: -10,
    },
  },
  stroke: {
    width: 3,
    lineCap: 'butt',
    curve: 'straight',
  },
  colors: [RGB.A(themeVars.value.primaryColor)],
  markers: {
    size: 4,
    strokeWidth: 3,
    colors: RGB.A(themeVars.value.primaryColor),
    strokeColors: 'transparent',
    discrete: [
      {
        size: 5.5,
        seriesIndex: 0,
        strokeColor: RGB.A(themeVars.value.primaryColor),
        fillColor: RGB.with(themeVars.value.cardColor),
        dataPointIndex: series[0].data.length - 1,
      },
    ],
  },
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: {
    labels: { show: false },
  },
  responsive: [
    {
      breakpoint: 1300,
      options: {
        plotOptions: {
          bar: { columnWidth: '65%' },
        },
      },
    },
    {
      breakpoint: breakpoints.m,
      options: {
        plotOptions: {
          bar: { columnWidth: '45%' },
        },
      },
    },
    {
      breakpoint: breakpoints.s,
      options: {
        plotOptions: {
          bar: { columnWidth: '30%' },
        },
      },
    },
    {
      breakpoint: breakpoints.xs,
      options: {
        plotOptions: {
          bar: { columnWidth: '50%' },
        },
      },
    },
  ],
}))
</script>

<template>
  <NCard :borderd="false" class="h-fit shadow-primary">
    <h6>Profit</h6>
    <h2 class="font-weight-bolder mb-1"> 6,24k </h2>
    <!-- chart -->
    <vue-apex-charts height="70" :options="chartOptions" :series="series" />
  </NCard>
</template>
