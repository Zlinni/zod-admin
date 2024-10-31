<script lang="tsx" setup>
import type { RouteRecordRaw } from 'vue-router'
import { homeRoute } from '@/core/router/routers'
import IconTool from '@core/components/Icon/IconTool.vue'
import RushAdminLogo from '@core/components/Logos/RushAdminLogo.vue'
import { useFileOptions } from '@core/hooks/useFileOptions.tsx'
import router from '@core/router'
import { watchImmediate } from '@vueuse/core'
import { NFlex, NMenu } from 'naive-ui'

const { fileOptions } = useFileOptions()

const leftSiderActiveKey = ref<string>('')

const getActiveKeys = (route: RouteRecordRaw, keys: string[] = []) => {
  route.meta &&
    !route.meta?.isBase &&
    !route.meta?.isTop &&
    route.name &&
    keys.push(route.name as string)
  route.children?.forEach((i) => getActiveKeys(i, keys))
  return keys
}
const activeKey = getActiveKeys(homeRoute)

watchImmediate(
  () => router.currentRoute.value.name,
  (val) => {
    if (val) {
      const routerName = val as unknown as string
      activeKey.includes(routerName) && (leftSiderActiveKey.value = routerName)
    }
  }
)
const expandedKeys = ref<string[]>([])
const renderExpandIcon = () => (
  <IconTool icon="tabler-chevron-right" size="20" />
)

onMounted(() => {
  expandedKeys.value = fileOptions.value.map((i) => i.key) as string[]
})
</script>

<template>
  <NFlex vertical :size="0" class="h-full">
    <RushAdminLogo />
    <NScrollbar class="px-1 flex-1 h-full">
      <NMenu
        :options="fileOptions"
        :rootIndent="16"
        :indent="16"
        :watchProps="['defaultExpandedKeys']"
        :expandIcon="renderExpandIcon"
        v-model:value="leftSiderActiveKey" />
    </NScrollbar>
  </NFlex>
</template>

<style lang="scss" scoped>
:deep(.n-menu-item) {
  .n-menu-item-content__arrow {
    @apply rotate-90 text-xl;
  }
  .n-menu-item-content.n-menu-item-content--selected {
    &::before {
      background: var(--n-item-color-active);
    }
  }
  .n-menu-item-content.n-menu-item-content--child-active {
    &::before {
      background: var(--n-item-color-hover);
    }
  }
}
:deep(.n-menu-item-group) {
  .n-menu-item-group-title {
    padding-left: 24px !important;
  }
}
</style>
