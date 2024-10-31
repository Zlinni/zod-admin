<script lang="tsx" setup>
import DailySalesChart from '@/core/components/Dashboards/Charts/DailySalesChart.vue'
import EcommerceProfitChart from '@/core/components/Dashboards/Charts/EcommerceProfitChart.vue'
import TotalOrdersChart from '@/core/components/Dashboards/Charts/TotalOrdersChart.vue'
import TotalProfitChart from '@/core/components/Dashboards/Charts/TotalProfitChart.vue'

const DailySales = (
  <DailySalesChart
    name="收益"
    labels={['第一季度', '第二季度', '第三季度', '第四季度']}
    sparklineData={[400, 200, 650, 500]}
    totalSaleThisMonth={28450}
  />
)

const TotalOrders = (
  <TotalOrdersChart
    sparklineData={[45, 85, 65, 50, 70, 120, 60]}
    totalSaleLastWeek="124k"
  />
)

const TotalProfit = (
  <TotalProfitChart
    sparklineData={[0, 20, 5, 30, 15, 45]}
    totalSaleLastMonth="124k"
  />
)
</script>

<template>
  <NGrid cols="4" class="-mx-3 !w-auto" item-responsive responsive="screen">
    <NGi span="4 m:2" class="p-3">
      <DailySales />
    </NGi>
    <NGi span="2 m:1" class="p-3">
      <DailySales />
    </NGi>
    <NGi span="2 m:1" class="p-3">
      <DailySales />
    </NGi>
  </NGrid>
  <NGrid cols="6" class="-mx-3 !w-auto" item-responsive responsive="screen">
    <NGi span="6 s:2 m:1" class="p-3">
      <TotalOrders />
    </NGi>
    <NGi span="6 s:2 m:1" class="p-3">
      <EcommerceProfitChart />
    </NGi>
    <NGi span="6 s:2 m:1" class="p-3">
      <TotalProfit />
    </NGi>
  </NGrid>
</template>
