<script lang="ts" setup generic="T, K extends HTMLElement">
import { type Table, type Row, FlexRender } from '@tanstack/vue-table'
import { type PaginationProps } from 'naive-ui'

const props = defineProps<{
  table: Table<T>
  paginationProps?: PaginationProps
  className?: string
}>()

const emits = defineEmits<{
  (
    e: 'click-row',
    option: {
      row: Row<T>
      event: Event
    }
  ): void
}>()

const slots = defineSlots<{
  subComponent(props: { row: Row<T> }): any
}>()

const getFixedClassName = (fixed?: string) => (fixed ? 'fixed-' + fixed : '')
</script>

<template>
  <NFlex class="relative" vertical :wrapItem="false">
    <div class="overflow-auto" :class="className">
      <NTable :bordered="false" :bottomBordered="false">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              :class="getFixedClassName(header.column.columnDef.meta?.fixed)">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </th>
          </tr>
        </thead>

        <tbody>
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <tr
              @click="
                (event) =>
                  emits('click-row', {
                    row,
                    event,
                  })
              ">
              <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="getFixedClassName(cell.column.columnDef.meta?.fixed)">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()" />
              </td>
            </tr>
            <tr
              v-if="row.getIsExpanded()"
              @click="
                (event) =>
                  emits('click-row', {
                    row,
                    event,
                  })
              ">
              <td :colSpan="row.getVisibleCells().length">
                <slot name="subComponent" :row="row" />
              </td>
            </tr>
          </template>
        </tbody>
      </NTable>
      <div
        v-if="table.getRowModel().rows.length === 0"
        class="w-full py-20 grid place-items-center">
        <NEmpty />
      </div>
    </div>
    <NFlex class="h-[52px] w-auto p-1" align="center" justify="flex-end">
      <NPagination
        v-if="props.paginationProps"
        v-bind="props.paginationProps"
        class="pr-6" />
    </NFlex>
  </NFlex>
</template>

<style lang="scss" scoped>
.n-table {
  @apply overflow-auto;

  .fixed-left {
    @apply sticky left-0;
    box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }

  .fixed-right {
    @apply sticky right-0;
    box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }

  thead {
    @apply sticky top-0 z-10 transition-shadow;

    &:has(.fixed-left, .fixed-right) {
      @apply shadow-none;
    }
  }

  tbody {
    tr {
      td {
        @apply whitespace-nowrap;
      }

      // &:hover {
      //   td {
      //     @apply bg-[#f8f7fa] dark:;
      //   }
      // }
    }
  }
}
</style>
