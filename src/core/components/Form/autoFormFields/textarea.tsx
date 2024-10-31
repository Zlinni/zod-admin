import type { AutoFormInputComponentProps } from '@core/utils/types'
import AutoFormInput from './input'

const AutoFormTextarea = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  return (
    <AutoFormInput
      fieldProps={{
        ...fieldProps,
        type: 'textarea',
      }}
      isRequired={isRequired}
    />
  )
}
AutoFormTextarea.displayName = 'AutoFormTextarea'

export default AutoFormTextarea
