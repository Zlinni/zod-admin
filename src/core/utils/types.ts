import type { SelectProps } from 'naive-ui'
import type { z } from 'zod'
import type { INPUT_COMPONENTS } from './config'

export type FieldConfigItem = {
  /**
   * 是否忽略显示
   */
  ignore?: boolean
  inputProps?: {
    /**
     * 是否展示label
     */
    showLabel?: boolean
    /**
     * placeholder
     */
    placeholder?: string
    /**
     * 是否disabled
     */
    disabled?: boolean
    /**
     * 是否必须
     */
    required?: boolean
    /**
     * 是否多选
     */
    multiple?: boolean
    /**
     * 允许的文件类型
     */
    accept?: string
    /**
     * option选项
     */
    option?: SelectProps['options']
  }
  /**
   * 字段渲染的组件类型
   */
  fieldType?: keyof typeof INPUT_COMPONENTS
}

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
  [Key in keyof SchemaType]?: SchemaType[Key] extends object ?
    FieldConfig<z.infer<SchemaType[Key]>>
  : FieldConfigItem
}

export type AutoFormInputComponentProps = {
  fieldConfigItem?: FieldConfigItem
  fieldProps: any
  zodItem: z.ZodAny
  className?: string
  isRequired?: boolean
}

export type ExtractAPITypes<
  T extends Record<
    string,
    {
      DTO?: any
      VO?: any
    }
  >,
> = {
  [K in keyof T]: {
    DTO: z.infer<T[K]['DTO']>
    VO: z.infer<T[K]['VO']>
  }
}
