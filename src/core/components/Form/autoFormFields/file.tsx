import type { AutoFormInputComponentProps } from '@core/utils/types'
import File from '../fields/File.vue'
import Files from '../fields/Files.vue'

const AutoFormFile = ({
  fieldProps,
  isRequired,
}: AutoFormInputComponentProps) => {
  const { showLabel: _showLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  return fieldProps?.multiple ?
      <Files
        {...{
          ...fieldProps,
          required: isRequired,
          label: showLabel ? fieldProps.label : undefined,
        }}></Files>
    : <File
        {...{
          ...fieldProps,
          required: isRequired,
          label: showLabel ? fieldProps.label : undefined,
        }}
      />
}
AutoFormFile.displayName = 'AutoFormFile'

export default AutoFormFile
