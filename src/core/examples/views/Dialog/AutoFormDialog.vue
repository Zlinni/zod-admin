<script lang="ts" setup>
import { useAutoFormDialog } from '@/core/components/Dialog/useAutoFormDialog'
import { APISchema } from '../Table/api/application.zod'

const { openAutoFormDialog } = useAutoFormDialog()
const openCreateDialog = () => {
  openAutoFormDialog({
    title: '新增',
    schema: APISchema.createOne.DTO,
    async onSubmit({ handleSubmit }) {
      handleSubmit(async (values) => {
        //
      })
    },
  })
}
</script>

<template>
  <NFlex vertical>
    <NFlex align="center">
      <NButton type="primary" @click="openCreateDialog"
        >Open the dialog</NButton
      >
    </NFlex>
  </NFlex>
</template>
