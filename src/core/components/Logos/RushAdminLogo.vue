<script lang="tsx" setup>
import { RGB } from '@/core/utils/rgbUtil'
import { themeVars } from '@core/configs/theme'
import { NFlex } from 'naive-ui'
import packge from '../../../../package.json'
import * as config from '../../../../zod-admin.config'
import IconTool from '../Icon/IconTool.vue'
</script>

<template>
  <NFlex align="center" :size="12" :wrap="false" class="py-5 mx-3">
    <NA class="no-underline flex items-center gap-3" href="/">
      <IconTool
        icon="octicon:feed-rocket-16"
        :color="RGB.with(themeVars.primaryColor)"
        size="32" />
      <NText
        class="text-xl font-bold whitespace-nowrap text-black dark:text-[rgba(225,222,245,0.9)]"
        >{{ config.default.site.logoName }}</NText
      >
    </NA>
    <NA
      class="no-underline"
      :href="config.default.env.git ?? '/'"
      target="_blank">
      <NTag
        size="small"
        :color="{
          color: RGB.with(themeVars.primaryColor),
          borderColor: 'transparent',
        }"
        class="text-white self-end cursor-pointer"
        >{{ packge.version }}</NTag
      >
    </NA>
  </NFlex>
</template>
