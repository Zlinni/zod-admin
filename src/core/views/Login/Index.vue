<script lang="ts" setup>
import IconTool from '@/core/components/Icon/IconTool.vue'
import router from '@core/router'
import { getOAuth } from '@core/utils/oAuth'
import Panel from '@core/views/Layouts/Panel'
import type { NDivider, NFlex } from 'naive-ui'
import Middleware from './Middleware.vue'
import Password from './Password.vue'

const { feishuUrl } = getOAuth()

const type = computed(() => router.currentRoute.value.params?.type)

onMounted(() => {
  if (!router.currentRoute.value.params?.type) {
    router.push({ params: { type: 'password' } })
  }
})
</script>

<template>
  <Panel>
    <Password v-if="type === 'password'" />
    <Middleware v-else-if="type === 'middleware'" />
    <NFlex class="w-full" vertical :size="0" align="center">
      <NDivider class="!my-0">
        <NText class="text-xs text-[#71717A] dark:text-[#acabc2]"
          >或使用其他方式登录</NText
        >
      </NDivider>
      <NFlex class="space-x-2 mt-2">
        <NButton variant="outline" class="text-[#09090b] dark:text-[#acabc2]">
          <IconTool icon="tabler:brand-github" class="mr-2 h-4 w-4" />
          GitHub
        </NButton>
        <NButton variant="outline" class="text-[#09090b] dark:text-[#acabc2]">
          <IconTool icon="tabler:brand-google" class="mr-2 h-4 w-4" />
          Google
        </NButton>
      </NFlex>
    </NFlex>
  </Panel>
</template>

<style lang="scss" scoped></style>
