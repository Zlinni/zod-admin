<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { tokenHandler } from '@core/apis/tokenHandler'
import { userAPI } from '@core/apis/user/userAPI'
import { useRushTitle } from '@core/hooks/useRushTitle'
import router from '@core/router'
import { NSpin } from 'naive-ui'

const route = useRoute()

const { query } = route

useRushTitle('正在登录...')

onMounted(async () => {
  if (query.code) {
    const { token } = await userAPI.feishuLogin({
      code: query.code as string,
    })
    if (!token) {
      router.push({
        name: 'Login',
      })
    } else {
      tokenHandler.set(token)
      router.push({ path: '/' })
    }
  }
})
</script>

<template>
  <NText class="text-black text-2xl font-semibold">正在登录...</NText>
  <NSpin
    :theme-overrides="{
      color: '#323377',
    }"
    :size="96"
    class="my-auto"></NSpin>
</template>
