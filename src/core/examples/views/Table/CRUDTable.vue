<script lang="ts" setup>
import TableContainer from '@core/components/Container/TableContainer.tsx'
import { useAutoFormDialog } from '@core/components/Dialog/useAutoFormDialog'
import AutoForm from '@core/components/Form/AutoForm.tsx'
import RushTable from '@core/components/Table/RushTable.vue'
import { useRushTable } from '@core/hooks/useRushTableV2'
import { API } from './api/application.api'
import { APISchema } from './api/application.zod'
import { columns } from './columns/columns'

const { onSearch, onReset, paginationProps, data, formProps } = useRushTable({
  schema: APISchema.readList.DTO,
  api: API.readList,
  apiKeyAdapter: {
    params: {
      page: 'page',
      size: 'size',
    },
    data: {
      total: 'total_size',
    },
  },
  fieldConfig(values) {
    return {
      page: {
        ignore: true,
      },
      size: {
        ignore: true,
      },
      fieldType: {
        inputProps: {
          showLabel: false,
          placeholder: '搜索类型',
        },
      },
      fieldValue: {
        inputProps: {
          showLabel: false,
          placeholder: '搜索值',
        },
      },
    }
  },
  transform(value) {
    return value.apps
  },
})

const { openAutoFormDialog } = useAutoFormDialog()
const openCreateDialog = () => {
  openAutoFormDialog({
    title: '新增',
    schema: APISchema.createOne.DTO,
    async onSubmit({ handleSubmit }) {
      handleSubmit(async (values) => {
        await API.createOne(values)
      })
    },
  })
}
</script>

<template>
  <TableContainer>
    <AutoForm
      :inline="true"
      label-placement="left"
      v-bind="formProps"
      @submit="onSearch()">
      <NFlex>
        <NButton type="primary" attrType="submit">查询</NButton>
        <NButton @click="onReset()">重置</NButton>
        <NButton @click="openCreateDialog()">新增</NButton>
      </NFlex>
    </AutoForm>
    <RushTable
      v-if="data && columns"
      :value="data"
      :columns="columns"
      :paginationProps />
  </TableContainer>
</template>
