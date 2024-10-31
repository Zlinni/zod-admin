<script lang="ts" setup>
import IconTool from '../../Icon/IconTool.vue'

const props = withDefaults(
  defineProps<{
    list: {
      title: string
      value: string
      icon: string
    }[]
  }>(),
  {}
)
</script>

<template>
  <NCard :borderd="false" class="h-fit shadow-primary" content-class="!p-6">
    <NGrid :cols="4" item-responsive responsive="screen" class="-m-3 !w-auto">
      <NGi
        v-for="(item, idx) in props.list"
        :key="idx"
        span="4 s:2 m:1"
        class="relative px-6 py-3">
        <NFlex
          :class="{
            'pb-4 min-[960px]:pb-0 border-b min-[960px]:border-b-0': [
              0, 1,
            ].includes(idx),
            'pb-4 min-[600px]:pb-0 border-b min-[600px]:border-b-0': idx === 2,
            '': idx === 3,
          }"
          justify="space-between"
          :wrap="false">
          <NFlex vertical>
            <NH4 class="text-2xl m-0">{{ item.value }}</NH4>
            <NText class="text-base">{{ item.title }}</NText>
          </NFlex>
          <NFlex
            justify="center"
            align="center"
            class="bg-[#f4f3f4] size-[44px] rounded-md">
            <IconTool :icon="item.icon" size="28" />
          </NFlex>
        </NFlex>
        <NDivider
          vertical
          class="absolute right-0 top-0 !h-full max-h-[88px] !m-0 opacity-0"
          :class="{
            'min-[960px]:opacity-100': [1].includes(idx),
            'min-[600px]:opacity-100': [0, 2].includes(idx),
          }" />
      </NGi>
    </NGrid>
  </NCard>
</template>
