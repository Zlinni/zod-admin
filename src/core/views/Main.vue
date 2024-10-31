<script lang="ts" setup>
import { useRushTitle } from '@core/hooks/useRushTitle'
import router from '@core/router'
import Header from '@core/views/Layouts/Header'
import LeftSider from '@core/views/Layouts/LeftSider.vue'
import { NDrawer, NDrawerContent, NLayout, NLayoutSider } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useDrawerOpen } from '../stores/useDrawerOpen'

useRushTitle(
  computed(() => (router.currentRoute.value.meta?.title as string) || '')
)

const { open } = storeToRefs(useDrawerOpen())
</script>

<template>
  <div class="w-full h-[100vh] overflow-hidden relative">
    <NLayout class="absolute top-0 left-0 bottom-0 right-0" has-sider>
      <NDrawer v-model:show="open" :auto-focus="false" placement="left">
        <NDrawerContent>
          <LeftSider />
        </NDrawerContent>
      </NDrawer>
      <NLayoutSider
        :width="260"
        :border="false"
        class="!max-w-0 desktop:!max-w-[260px] h-full overflow-hidden shadow-primary fixed flex-shrink-0 transition-[max-width] will-change-auto">
        <LeftSider />
      </NLayoutSider>
      <NLayout
        class="pl-0 desktop:pl-[260px] w-full h-full overflow-y-auto transition-[padding] will-change-auto">
        <NFlex
          class="max-w-[1440px] mx-auto px-6 min-h-full h-auto"
          vertical
          :size="0">
          <Header />
          <RouterView />
        </NFlex>
      </NLayout>
    </NLayout>
  </div>
</template>
