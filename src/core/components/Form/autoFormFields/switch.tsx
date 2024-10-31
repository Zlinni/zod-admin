import type { AutoFormInputComponentProps } from '@core/utils/types'
import Switch from '../fields/Switch.vue'

const AutoFormSwitch = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  return (
    <Switch
      {...{
        ...fieldProps,
        required: isRequired,
        label: showLabel ? fieldProps.label : undefined,
      }}
    />
  )
}
AutoFormSwitch.displayName = 'AutoFormSwitch'

export default AutoFormSwitch
