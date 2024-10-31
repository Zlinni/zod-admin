import { type RowData } from '@tanstack/vue-table'

interface TableMetaData {
  fixed: 'left' | 'right'
}

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue>
    extends Partial<TableMetaData> {}
}
