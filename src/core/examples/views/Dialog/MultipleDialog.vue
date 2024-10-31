<script lang="tsx" setup>
import { useAutoFormDialog } from '@/core/components/Dialog/useAutoFormDialog'
import { NFlex, type NButton } from 'naive-ui'
import { z } from 'zod'

const { openAutoFormDialog } = useAutoFormDialog()
const openCreateDialog = () => {
  const Dialog1 = openAutoFormDialog({
    title: '新增',
    autoOpen: false,
    schema: z.object({
      input: z.string().describe('输入框1'),
    }),
    async onSubmit({ handleSubmit }) {
      handleSubmit(async (values) => {
        //
      })
    },
  })
  const Dialog2 = openAutoFormDialog({
    title: '新增',
    autoOpen: false,
    schema: z.object({
      input: z.string().describe('输入框2'),
    }),
    async onSubmit({ handleSubmit }) {
      handleSubmit(async (values) => {
        //
      })
    },
  })
  window.$dialog.create({
    title: '多个Dialog',
    closable: false,
    showIcon: false,
    content: () => (
      <NFlex>
        {Dialog1.component}
        {Dialog2.component}
      </NFlex>
    ),
  })
}
</script>

<template>
  <NFlex vertical>
    <NFlex align="center">
      <NButton type="primary" @click="openCreateDialog"
        >Open the multiple dialog</NButton
      >
    </NFlex>
  </NFlex>
</template>
