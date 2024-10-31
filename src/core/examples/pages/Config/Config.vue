<script setup lang="ts">
import * as defineRushConfig from '@/core/utils/defineRushConfig?raw'
import MicroContainer from '@core/components/Container/MicroContainer.vue'
import { NCode, NCollapse, NCollapseItem } from 'naive-ui'
import * as config from '../../../../../zod-admin.config?raw'
</script>

<template>
  <MicroContainer>
    <NCollapse arrow-placement="right" :default-expanded-names="[1, 2]">
      <NCollapseItem title="配置参考" :name="1">
        <NCode :code="config.default" language="typescript" show-line-numbers />
      </NCollapseItem>
      <NCollapseItem title="类型定义" :name="2">
        <NCode
          :code="defineRushConfig.default"
          language="typescript"
          show-line-numbers />
      </NCollapseItem>
    </NCollapse>
  </MicroContainer>
</template>
