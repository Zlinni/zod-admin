<script lang="ts" setup>
import OrderList from '@/core/components/Dashboards/Order/OrderList.vue'

const list = [
  {
    title: 'Pending Payment',
    value: '56',
    icon: 'tabler:calendar-stats',
  },
  {
    title: 'Completed',
    value: '12689',
    icon: 'tabler:checks',
  },
  {
    title: 'Refunded',
    value: '124',
    icon: 'tabler:wallet',
  },
  {
    title: 'Failed',
    value: '32',
    icon: 'tabler:alert-octagon',
  },
]
</script>

<template>
  <OrderList :list></OrderList>
</template>
