import type { AutoFormInputComponentProps } from '@core/utils/types'
import NumberInput from '../fields/NumberInput.vue'

const AutoFormNumber = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  return (
    <NumberInput
      {...{
        ...fieldProps,
        required: isRequired,
        label: showLabel ? fieldProps.label : undefined,
      }}
    />
  )
}
AutoFormNumber.displayName = 'AutoFormNumber'

export default AutoFormNumber
