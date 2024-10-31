<script lang="ts" setup generic="T">
import { type Table, type Row, FlexRender } from '@tanstack/vue-table'
import { NScrollbar, type PaginationProps } from 'naive-ui'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  table: Table<T>
  paginationProps?: PaginationProps
  className?: string
  scrollX?: number
}>()

const emits = defineEmits<{
  (e: 'click-row', row: Row<T>): void
}>()

const slots = defineSlots<{
  subComponent(props: { row: Row<T> }): any
}>()

const getFixedClassName = (fixed?: string) => (fixed ? 'fixed-' + fixed : '')
</script>

<template>
  <NFlex class="relative" vertical :wrapItem="false" :size="24">
    <NFlex
      vertical
      :size="0"
      class="overflow-y-hidden overflow-x-auto"
      :style="{
        minWidth: props.scrollX ? props.scrollX + 'px' : 'auto',
      }"
      :class="twMerge(className)">
      <NTable :bordered="false" :bottomBordered="false" class="table-fixed">
        <colgroup
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id">
          <col
            v-for="header in headerGroup.headers"
            :key="header.id"
            :style="{
              width: header.column.getSize() + 'px',
              minWidth: header.column.getSize() + 'px',
            }" />
        </colgroup>
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
      </NTable>
      <NScrollbar content-class="overflow-x-hidden ">
        <NTable :bordered="false" :bottomBordered="false" class="table-fixed">
          <colgroup
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id">
            <col
              v-for="header in headerGroup.headers"
              :key="header.id"
              :style="{
                width: header.column.getSize() + 'px',
                minWidth: header.column.getSize() + 'px',
              }" />
          </colgroup>
          <tbody>
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <tr @click="emits('click-row', row)">
                <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()" />
                </td>
              </tr>
              <tr v-if="row.getIsExpanded()" @click="emits('click-row', row)">
                <td :colSpan="row.getVisibleCells().length">
                  <slot name="subComponent" :row="row" />
                </td>
              </tr>
            </template>
          </tbody>
        </NTable>
      </NScrollbar>
      <div
        v-if="table.getRowModel().rows.length === 0"
        class="w-full py-20 grid place-items-center">
        <NEmpty />
      </div>
    </NFlex>
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
    tr {
      th {
        &:first-child {
          padding-left: 24px;
        }

        &:last-child {
          padding-right: 24px;
        }
      }
    }

    &:has(.fixed-left, .fixed-right) {
      @apply shadow-none;
    }
  }

  tbody {
    tr {
      td {
        @apply whitespace-nowrap;
      }
      td {
        &:first-child {
          padding-left: 24px;
        }

        &:last-child {
          padding-right: 24px;
        }
      }
      &:hover {
        td {
          @apply bg-[#f8f7fa];
        }
      }
    }
  }
}
</style>
