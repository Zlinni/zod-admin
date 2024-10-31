import type { AutoFormInputComponentProps } from '@core/utils/types'
import TextInput from '../fields/TextInput.vue'

const AutoFormInput = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  return (
    <TextInput
      {...{
        ...fieldProps,
        required: isRequired,
        label: showLabel ? fieldProps.label : undefined,
      }}
    />
  )
}
AutoFormInput.displayName = 'AutoFormInput'

export default AutoFormInput
