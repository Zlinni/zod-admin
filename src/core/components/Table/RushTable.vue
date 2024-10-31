<script lang="ts" setup generic="T">
import { useRushTableClickRow } from '@/core/hooks/useRushTableClickRow'
import {
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
} from '@tanstack/vue-table'
import type { PaginationProps } from 'naive-ui'
import SharedTable from './SharedTable.vue'

const props = defineProps<{
  value: T[]
  columns: ColumnDef<T, any>[]
  paginationProps: PaginationProps
}>()

const table = useVueTable({
  get data() {
    return props.value ?? []
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
})
const { clickRow } = useRushTableClickRow()
</script>

<template>
  <SharedTable
    class="flex-1 overflow-auto"
    className="flex-1"
    :table
    :paginationProps
    :scroll-x="1280"
    @click-row="clickRow"
    v-bind="$attrs" />
</template>
