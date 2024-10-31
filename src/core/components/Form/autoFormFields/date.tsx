import type { AutoFormInputComponentProps } from '@core/utils/types'
import DatePicker from '../fields/DatePicker.vue'

const AutoFormDate = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  return (
    <DatePicker
      {...{
        ...fieldProps,
        required: isRequired,
        label: showLabel ? fieldProps.label : undefined,
        style: { gridColumn: '1 / -1' },
        class: 'w-full',
      }}
    />
  )
}
AutoFormDate.displayName = 'AutoFormDate'
export default AutoFormDate
