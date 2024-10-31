<script lang="ts" setup>
import router from '@core/router'
import Panel from '@core/views/Layouts/Panel'

const time = ref(5)

const goHome = () => router.push({ path: '/' })
onMounted(() => {
  const timer = setInterval(() => {
    time.value -= 1
    if (!time.value) {
      clearInterval(timer)
      goHome()
    }
  }, 1000)
})
</script>

<template>
  <Panel>
    <NText class="text-black text-2xl font-semibold">404 Not Found</NText>
    <NText class="text-md">将在 {{ time }} 秒后返回</NText>
    <Panel.Button @click="goHome()"> 回到主页 </Panel.Button>
  </Panel>
</template>

<style lang="scss" scoped></style>
