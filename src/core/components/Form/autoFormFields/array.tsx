import { beautifyObjectName } from '@/core/utils/zodUtils'
import { NButton, NDivider, NFlex, NText } from 'naive-ui'
import { useFieldArray } from 'vee-validate'
import * as z from 'zod'
import AutoFormObject from './object'

function isZodArray(
  item: z.ZodArray<any> | z.ZodDefault<any>
): item is z.ZodArray<any> {
  return item instanceof z.ZodArray
}

function isZodDefault(
  item: z.ZodArray<any> | z.ZodDefault<any>
): item is z.ZodDefault<any> {
  return item instanceof z.ZodDefault
}

function isZodOptional(
  item: z.ZodArray<any> | z.ZodDefault<any> | z.ZodOptional<any>
): item is z.ZodOptional<any> {
  return item instanceof z.ZodOptional
}

const AutoFormArray = ({
  name,
  item,
  path = [],
  fieldConfig,
}: {
  name: string
  item: z.ZodArray<any> | z.ZodDefault<any>
  path?: string[]
  fieldConfig?: any
}) => {
  const _fieldConfig = computed(() => toValue(fieldConfig))
  const { fields, remove, push } = useFieldArray(name)
  const title = item._def.description ?? beautifyObjectName(name)

  const _item = isZodOptional(item) ? item._def.innerType : item

  const itemDefType =
    isZodArray(_item) ? _item._def.type
    : isZodDefault(_item) ? _item._def.innerType._def.type
    : null
  return (
    <NFlex vertical style={{ gridColumn: '1 / -1' }}>
      <NText>{title}</NText>
      {fields.value.map((_field, index) => {
        const key = _field.key
        return (
          <NFlex vertical key={`${key}`}>
            <AutoFormObject
              schema={itemDefType as z.ZodObject<any, any>}
              fieldConfig={computed(() =>
                typeof _fieldConfig.value === 'function' ?
                  _fieldConfig.value(_field.value)
                : _fieldConfig.value
              )}
              path={[...path, index.toString()]}
            />
            <NFlex justify="flex-end" class="my-4">
              <NButton onClick={() => remove(index)}>删除</NButton>
            </NFlex>
            <NDivider />
          </NFlex>
        )
      })}
      <NButton onClick={() => push({})} class="mt-4">
        添加{title}
      </NButton>
    </NFlex>
  )
}
AutoFormArray.displayName = 'AutoFormArray'

export default AutoFormArray
