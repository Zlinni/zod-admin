import AutoFormCheckbox from '../components/Form/autoFormFields/checkbox'
import AutoFormDate from '../components/Form/autoFormFields/date'
import AutoFormEnum from '../components/Form/autoFormFields/enum'
import AutoFormFile from '../components/Form/autoFormFields/file'
import AutoFormInput from '../components/Form/autoFormFields/input'
import AutoFormNumber from '../components/Form/autoFormFields/number'
import AutoFormRadioGroup from '../components/Form/autoFormFields/radio-group'
import AutoFormSwitch from '../components/Form/autoFormFields/switch'
import AutoFormTextarea from '../components/Form/autoFormFields/textarea'
import {
  BooleanHelper,
  DateHelper,
  EllipsisHelper,
  type Helper,
} from '../components/Form/columns/Helpers'

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  fallback: AutoFormInput,
  file: AutoFormFile,
}

export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
  ZodBoolean: 'checkbox',
  ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
}

export const COLUMN_ZOD_HANDLERS: {
  [key: string]: Helper<any>
} = {
  ZodBoolean: BooleanHelper,
  ZodDate: DateHelper,
  ZodNumber: EllipsisHelper,
  ZodString: EllipsisHelper,
}
