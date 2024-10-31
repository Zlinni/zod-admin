<script lang="ts" setup>
import router from '@core/router'
import { NCard } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {}
)
defineSlots<{
  suffix(): any
  default(): any
}>()
const title = computed(
  () =>
    props?.title ?? (router.currentRoute.value.meta?.title as string) ?? 'Title'
)
</script>

<template>
  <NCard
    class="w-full mt-6 h-full flex-1 shadow-primary rounded-md overflow-hidden"
    :title
    content-class="flex">
    <template #header-extra>
      <slot name="suffix" />
    </template>
    <slot name="default" />
  </NCard>
</template>
