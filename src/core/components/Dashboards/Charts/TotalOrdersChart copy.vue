<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useThemeVars } from '@/core/hooks/useThemeVars'
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
  },
  grid: {
    show: false,
    padding: {
      top: -30,
      left: -10,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '40%',
      borderRadius: 4,
      startingShape: 'rounded',
      endingShape: 'rounded',
      distributed: true,
      colors: {
        backgroundBarColors: props.sparklineData.map((_) =>
          RGB.with(themeVars.value.chartsBg)
        ),
        backgroundBarRadius: 5,
      },
    },
  },
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
  legend: { show: false },
  dataLabels: { enabled: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { show: false },
  tooltip: { enabled: false },
  colors: [RGB.A(themeVars.value.primaryColor)],
  events: {
    selection: undefined,
  },
  animations: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 960,
      options: {
        grid: {
          padding: {
            top: -30,
            left: 0,
          },
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
