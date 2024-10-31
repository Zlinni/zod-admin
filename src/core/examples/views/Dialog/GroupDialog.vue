<script lang="tsx" setup>
import { useAutoFormDialog } from '@/core/components/Dialog/useAutoFormDialog'
import { NFlex, type NButton } from 'naive-ui'
import { z } from 'zod'

const { openAutoFormDialog, openGroupDialog } = useAutoFormDialog()
const openUpdateDialog = () => {
  const Dialog1 = openAutoFormDialog({
    title: '修改用户状态列表',
    autoOpen: false,
    schema: z.object({
      uid: z.string().describe('UID'),
      status: z.boolean().describe('当前状态'),
    }),
    async onSubmit({ handleSubmit }) {
      handleSubmit(async (values) => {
        //
      })
    },
  })
  const Dialog2 = openAutoFormDialog({
    title: '修改用户属性',
    autoOpen: false,
    schema: z.object({
      uid: z.string().describe('UID'),
      age: z.number().describe('年龄'),
    }),
    async onSubmit({ handleSubmit }) {
      handleSubmit(async (values) => {
        //
      })
    },
  })
  openGroupDialog({
    group: [Dialog1, Dialog2],
    title: '编辑用户',
    subTitle: '选择要修改的用户属性',
  })
}
</script>

<template>
  <NFlex vertical>
    <NFlex align="center">
      <NButton type="primary" @click="openUpdateDialog"
        >Open the group dialog</NButton
      >
    </NFlex>
  </NFlex>
</template>
