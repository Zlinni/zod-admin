<script lang="ts" setup>
import ProductList from '@/core/components/Dashboards/Product/ProductList.vue'

const list = [
  {
    title: 'In-Store Sales',
    value: '$5,345',
    icon: 'tabler:smart-home',
  },
  {
    title: 'In-Store Sales',
    value: '$5,345',
    icon: 'tabler:smart-home',
  },
  {
    title: 'In-Store Sales',
    value: '$5,345',
    icon: 'tabler:smart-home',
  },
  {
    title: 'In-Store Sales',
    value: '$5,345',
    icon: 'tabler:smart-home',
  },
]
</script>

<template>
  <ProductList :list></ProductList>
</template>
