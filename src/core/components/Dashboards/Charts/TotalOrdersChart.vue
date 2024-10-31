<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useThemeVars } from '@/core/hooks/useThemeVars'
import { breakpoints } from '@/core/utils/breakpoints'
import { RGB } from '@/core/utils/rgbUtil'

const props = withDefaults(
  defineProps<{
    sparklineData: number[]
    totalSaleLastWeek: string
  }>(),
  {}
)
const themeVars = useThemeVars()

const series = [
  {
    data: props.sparklineData,
  },
]

const chartOptions = computed<ApexCharts.ApexOptions>(() => ({
  chart: {
    type: 'bar',
    stacked: false,
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  tooltip: { enabled: false },
  legend: { show: false },
  dataLabels: { enabled: false },
  colors: [RGB.A(themeVars.value.primaryColor)],
  states: {
    hover: {
      filter: {
        type: 'lighten',
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'darken' /* none, lighten, darken */,
      },
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
      horizontal: false,
      columnWidth: '32%',
      colors: {
        backgroundBarRadius: 5,
        backgroundBarColors: props.sparklineData.map((_) =>
          RGB.with(themeVars.value.chartsBg)
        ),
      },
    },
  },
  grid: {
    show: false,
    padding: {
      top: -30,
      left: -10,
    },
  },
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: { show: false },
  responsive: [
    {
      breakpoint: 1350,
      options: {
        plotOptions: {
          bar: { columnWidth: '45%' },
        },
      },
    },
    {
      breakpoint: breakpoints.m,
      options: {
        plotOptions: {
          bar: { columnWidth: '20%' },
          grid: {
            padding: {
              top: -30,
              left: 0,
            },
          },
        },
      },
    },
    {
      breakpoint: breakpoints.s,
      options: {
        plotOptions: {
          bar: { columnWidth: '15%' },
        },
      },
    },
  ],
}))
</script>

<template>
  <NCard :borderd="false" class="h-fit shadow-primary">
    <template #header>
      <NFlex vertical :size="0">
        <NH5 class="mb-0 text-lg"> 订单数 </NH5>
        <NP class="m-0 text-base"> 上周 </NP>
      </NFlex>
    </template>
    <VueApexCharts
      :options="chartOptions"
      :series="series"
      :height="62"></VueApexCharts>
    <template #footer>
      <NH4 class="mb-0 text-2xl">{{ props.totalSaleLastWeek }}</NH4>
    </template>
  </NCard>
</template>
