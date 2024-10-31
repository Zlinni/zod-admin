import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table'
import { NEllipsis } from 'naive-ui'
import { twMerge } from 'tailwind-merge'
import { type z } from 'zod'
import {
  createOptionHelper,
  type Helper,
} from '../components/Form/columns/Helpers'
import { COLUMN_ZOD_HANDLERS } from '../utils/config'
import { getBaseSchema, getBaseType } from '../utils/zodUtils'

type UnwrapZod<T extends Record<string, z.ZodTypeAny>> = z.infer<z.ZodObject<T>>
export const useRushColumns = <T extends Record<string, z.ZodTypeAny>>({
  /**
   * schema
   */
  schema,
  /**
   * autoform的fieldConfig
   */
  fieldConfig,
  /**
   * 自定义操作栏
   */
  suffix,
}: {
  schema: z.ZodObject<T>
  fieldConfig?: Partial<
    Record<
      keyof T,
      {
        render?: Helper<UnwrapZod<T>>
        colName?: string
        ignore?: boolean
        renderClass?: Helper<UnwrapZod<T>>
      }
    >
  >
  suffix?: Helper<UnwrapZod<T>>
}) => {
  const columnHelper = createColumnHelper<UnwrapZod<T>>()
  const { shape } = getBaseSchema(schema!) || {}
  if (!shape) return
  const columns = Object.keys(shape)
    .map((name) => {
      if (fieldConfig?.[name]?.ignore) return
      const item = shape[name] as z.ZodAny
      const itemName = fieldConfig?.[name]?.colName ?? item._def.description
      const zodBaseType = getBaseType(item)

      const RenderHelper = fieldConfig?.[name]?.render
      if (RenderHelper) {
        return columnHelper.accessor(name as any, {
          header: itemName,
          cell: RenderHelper,
        })
      }

      let options
      if (['ZodEnum', 'ZodNativeEnum', 'ZodArray'].includes(zodBaseType)) {
        const baseDef = (item as unknown as z.ZodEnum<any>)._def
        const baseValues = baseDef.values ?? baseDef?.type._def.values
        if (!Array.isArray(baseValues)) {
          options = Object.keys(baseValues).reduce(
            (pre, key) => {
              pre[baseValues[key]] = key
              return pre
            },
            {} as Record<string, any>
          )
        } else {
          options = baseValues.reduce(
            (pre, key) => {
              pre[key] = key
              return pre
            },
            {} as Record<string, any>
          )
        }
      }
      const OptionHelper =
        options ? createOptionHelper(options, false) : undefined
      const Helper = OptionHelper ?? COLUMN_ZOD_HANDLERS[zodBaseType]
      return columnHelper.accessor(name as any, {
        header: itemName,
        cell: (props) => {
          const className = fieldConfig?.[name]?.renderClass?.(props)
          return (
            <NEllipsis class={twMerge(className)}>
              {Helper(props as any)}
            </NEllipsis>
          )
        },
      })
    })
    .filter((i) => i)
  suffix &&
    columns.push(
      columnHelper.display({
        id: 'operation',
        header: '操作',
        cell: suffix,
        meta: {
          fixed: 'right',
        },
      }) as any
    )
  return columns as ColumnDef<UnwrapZod<T>, any>[]
}
