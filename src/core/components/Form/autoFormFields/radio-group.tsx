import type { AutoFormInputComponentProps } from '@core/utils/types'
import { getBaseSchema } from '@core/utils/zodUtils'
import type { SelectProps } from 'naive-ui'
import * as R from 'remeda'
import type { z } from 'zod'
import RadioGroup from '../fields/RadioGroup.vue'

const AutoFormRadioGroup = ({
  fieldProps,
  zodItem,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  let options: SelectProps['options'] = fieldProps?.option ?? []
  const baseSchema = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
  const baseValues = baseSchema.values ?? baseSchema.type?._def?.values
  if (baseValues && options?.length === 0) {
    options =
      !Array.isArray(baseValues) ?
        R.pipe(
          R.keys(baseValues),
          R.map((key) => ({
            label: key,
            value: baseValues[key],
          }))
        )
      : R.pipe(
          baseValues,
          R.map((value) => ({
            label: value,
            value,
          }))
        )
  }

  return (
    <RadioGroup
      {...{
        ...fieldProps,
        options,
        required: isRequired,
        label: showLabel ? fieldProps.label : undefined,
      }}
    />
  )
}
AutoFormRadioGroup.displayName = 'AutoFormRadioGroup'

export default AutoFormRadioGroup
