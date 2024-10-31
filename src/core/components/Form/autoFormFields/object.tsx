import type { MaybeRefOrGetter } from 'vue'
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from '@core/utils/config'
import type { FieldConfig, FieldConfigItem } from '@core/utils/types'
import {
  type ZodObjectOrWrapped,
  getBaseSchema,
  getBaseType,
  beautifyObjectName,
} from '@core/utils/zodUtils'
import type { z } from 'zod'
import AutoFormArray from './array'

const handleIfZodNumber = (item: z.ZodAny) => {
  const isZodNumber = (item as any)._def.typeName === 'ZodNumber'
  const isInnerZodNumber =
    (item._def as any).innerType?._def?.typeName === 'ZodNumber'

  if (isZodNumber) {
    ;(item as any)._def.coerce = true
  } else if (isInnerZodNumber) {
    ;(item._def as any).innerType._def.coerce = true
  }

  return item
}
export interface AutoFormObjectProps<SchemaType extends ZodObjectOrWrapped> {
  schema: ZodObjectOrWrapped
  fieldConfig?:
    | MaybeRefOrGetter<FieldConfig<z.infer<SchemaType>>>
    | MaybeRefOrGetter<
        (values: ZodObjectOrWrapped) => FieldConfig<z.infer<SchemaType>>
      >
  path?: string[]
}
const AutoFormObject = defineComponent(
  <SchemaType extends ZodObjectOrWrapped>({
    schema,
    fieldConfig,
    path = [],
  }: AutoFormObjectProps<SchemaType>) => {
    const { shape } = getBaseSchema(schema!) || {}
    if (!shape) {
      return () => <></>
    }
    return () =>
      Object.keys(shape)
        .map((name) => {
          const _fieldConfig = computed(() => toValue(fieldConfig))
          const fieldConfigItem = (_fieldConfig.value?.[name] ??
            {}) as FieldConfigItem
          if (fieldConfigItem?.ignore) return
          const key = [...path, name].join('.')
          let item = shape[name] as z.ZodAny
          item = handleIfZodNumber(item) as z.ZodAny
          const zodBaseType = getBaseType(item)
          const isOptional =
            item._def?.typeName === 'ZodOptional' ||
            item._def?.innerType?._def?.typeName === 'ZodOptional'
          const isRequired =
            !isOptional || fieldConfigItem.inputProps?.required || false
          if (zodBaseType === 'ZodObject') {
            return (
              <AutoFormObject
                key={key}
                schema={item as unknown as z.ZodObject<any, any>}
                fieldConfig={
                  fieldConfigItem as FieldConfig<z.infer<typeof item>>
                }
                path={[...path, name]}
              />
            )
          }
          if (
            zodBaseType === 'ZodArray' &&
            (item._def?.type?._def.typeName === 'ZodObject' ||
              item._def?.innerType?._def.type._def.typeName === 'ZodObject')
          ) {
            return (
              <AutoFormArray
                key={key}
                name={name}
                item={item as unknown as z.ZodArray<any>}
                fieldConfig={computed(() => fieldConfigItem)}
                path={[...path, name]}
              />
            )
          }

          const itemName = item._def.description ?? beautifyObjectName(name)
          const inputType =
            fieldConfigItem?.fieldType ??
            DEFAULT_ZOD_HANDLERS[zodBaseType] ??
            'fallback'

          const fieldProps = {
            name: key,
            label: itemName ?? beautifyObjectName(name),
            ...fieldConfigItem.inputProps,
          }
          const InputComponent = INPUT_COMPONENTS[inputType]
          return (
            <InputComponent
              key={key}
              fieldProps={fieldProps}
              fieldConfigItem={fieldConfigItem}
              zodItem={item}
              isRequired={isRequired}></InputComponent>
          )
        })
        .filter((i) => i)
  },
  {
    props: ['schema', 'fieldConfig', 'path'],
  }
)

export default AutoFormObject
