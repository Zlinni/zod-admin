<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: string | number
    icon: string
    color?: string
  }>(),
  {
    size: '16',
  }
)
const isSvg = computed(() => /^svg:/.test(props.icon))

const isImg = computed(
  () => /^(http|https):\/\//.test(props.icon) || props.icon.endsWith('.png')
)
</script>

<template>
  <svg
    v-if="isSvg"
    aria-hidden="true"
    :width="size"
    :height="size"
    :viewBox="'0 0 ' + size + ' ' + size"
    class="cursor-pointer outline-none mt-[1px]">
    <use :href="'#' + icon" :fill="color" :width="size" :height="size" />
  </svg>
  <img
    v-else-if="isImg"
    :src="props.icon"
    :width="size"
    :height="size"
    class="cursor-pointer" />
  <iconify-icon
    v-else
    :icon="icon"
    :width="size"
    class="cursor-pointer mt-[1px]"
    :style="{
      color,
    }"></iconify-icon>
</template>
