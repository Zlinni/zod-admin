<script lang="ts" setup>
import { httpClient } from '@core/apis/httpClient'
import { tokenHandler } from '@core/apis/tokenHandler'
import AutoForm from '@core/components/Form/AutoForm'
import { useRushTitle } from '@core/hooks/useRushTitle'
import router from '@core/router'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as config from '../../../../zod-admin.config'

useRushTitle('登录')
const { method, url, schema, tokenKey } = config.default.login.default!
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})
const onSubmit = handleSubmit(async (values) => {
  const data = await httpClient({
    method: method,
    url: url,
    data: method === 'POST' ? values : {},
    params: method === 'GET' ? values : {},
  })
  const token = data[tokenKey as keyof typeof data]
  if (token) {
    tokenHandler.set(token)
    router.push({
      name: 'Home',
    })
  }
})
</script>

<template>
  <NFlex vertical :size="0">
    <NText
      class="tracking-tight text-2xl font-bold text-center text-[#09090b] dark:text-[#acabc2]"
      >登录</NText
    >
    <NP
      class="text-sm text-muted-foreground text-center text-[#71717A] dark:text-[#acabc2]"
      >请使用您的账号登录</NP
    >
  </NFlex>
  <AutoForm :schema form-class="!px-0 w-full" @submit="onSubmit">
    <NButton type="primary" attrType="submit" class="w-full mt-6">
      登录
    </NButton>
    <NEl class="mt-4 text-center text-sm text-[#181818] dark:text-[#acabc2]">
      <a>忘记密码？</a>
    </NEl>
  </AutoForm>
</template>
