<script lang="ts" setup>
import { filesize } from 'filesize'
import IconTool from '../../Icon/IconTool.vue'

withDefaults(
  defineProps<{
    fields: File[]
    disabled: boolean
  }>(),
  {}
)
const emits = defineEmits<{
  (e: 'remove', val: number): void
}>()
</script>

<template>
  <NScrollbar class="max-h-60">
    <NList bordered hoverable :clickable="!disabled">
      <NListItem
        class="[&>div]:max-w-full"
        :class="{ 'bg-gray-100': disabled }"
        :style="{ maxWidth: '100%' }"
        v-for="(field, index) in fields"
        :key="index">
        <NFlex class="h-9" justify="space-between" align="center" :wrap="false">
          <NEllipsis>
            {{ field.name }}
          </NEllipsis>
          <NFlex class="flex-shrink-0" align="center" size="small">
            {{ field.size ? filesize(field.size) : '' }}
            <NTooltip v-if="!disabled" placement="right">
              <template #trigger>
                <div>
                  <NButton
                    quaternary
                    circle
                    type="primary"
                    @click="emits('remove', index)">
                    <IconTool icon="bi:x-circle" size="16" />
                  </NButton>
                </div>
              </template>
              删除文件
            </NTooltip>
          </NFlex>
        </NFlex>
      </NListItem>
    </NList>
  </NScrollbar>
</template>

<style lang="scss" scoped>
.n-list.n-list--bordered .n-list-item,
.n-list.n-list--hoverable .n-list-item {
  @apply py-0.5;
}
</style>
