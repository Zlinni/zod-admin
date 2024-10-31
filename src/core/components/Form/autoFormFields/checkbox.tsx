import type { AutoFormInputComponentProps } from '@core/utils/types'
import Checkbox from '../fields/Checkbox.vue'

const AutoFormCheckbox = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  return (
    <Checkbox
      {...{
        ...fieldProps,
        required: isRequired,
        label: showLabel ? fieldProps.label : undefined,
      }}
    />
  )
}
AutoFormCheckbox.displayName = 'AutoFormCheckbox'

export default AutoFormCheckbox
