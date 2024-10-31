import type { MaybeRefOrGetter } from 'vue'
import { useCloseDialog } from '@/core/hooks/useCloseDialog'
import { submitErrorHandler } from '@core/utils/errorHandler'
import type { FieldConfigItem } from '@core/utils/types'
import { useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { watchImmediate } from '@vueuse/core'
import { NFlex, NText, NButton, type DialogReactive } from 'naive-ui'
import * as R from 'remeda'
import {
  useForm,
  type FormContext,
  type GenericObject,
  type SubmissionHandler,
} from 'vee-validate'
import type { z } from 'zod'
import AutoForm from '../Form/AutoForm'
import DialogBtnGroup from './DialogBtnGroup'

export type UnwrapZod<T extends Record<string, z.ZodTypeAny>> = z.infer<
  z.ZodObject<T>
>

interface AutoFormDialogOption<T extends Record<string, z.ZodTypeAny>> {
  /**
   * 接口返回data
   */
  data?: MaybeRefOrGetter<UnwrapZod<T> | undefined>
  /**
   * 标题
   */
  title: string
  /**
   * 提交按钮文本
   */
  submitText?: MaybeRefOrGetter<string>
  /**
   * 提交回调函数
   * @param option 返回原始值和提交函数
   * @returns
   */
  onSubmit?: (option: {
    originValues: UnwrapZod<T>
    form: FormContext<
      {
        [k in keyof z.objectUtil.addQuestionMarks<
          z.baseObjectOutputType<T>,
          any
        >]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, any>[k]
      },
      {
        [k in keyof z.objectUtil.addQuestionMarks<
          z.baseObjectOutputType<T>,
          any
        >]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, any>[k]
      }
    >
    /**
     * 返回带表单值的回调函数
     */
    handleSubmit: HandleSubmit<UnwrapZod<T>>
    /**
     * 结束回调函数
     */
    onFinish: () => void
  }) => Promise<void>
  fieldConfig?: (
    values: UnwrapZod<T>
  ) => Partial<Record<keyof T, FieldConfigItem>>
  schema: z.ZodObject<T>
  autoOpen?: boolean
  onClose?: () => void
}
type HandleSubmit<T extends GenericObject> = (
  cb: SubmissionHandler<T, T, any>
) => Promise<any>
export const useAutoFormDialog = () => {
  const openAutoFormDialog = <T extends Record<string, z.ZodTypeAny>>(
    dialogOption: AutoFormDialogOption<T>
  ) => {
    const AutoFormModal = defineComponent(() => {
      const data = computed(() => toValue(dialogOption?.data))
      const submitText = computed(() => toValue(dialogOption.submitText))
      const schema = dialogOption.schema
      const form = useForm<UnwrapZod<T>>({
        validationSchema: toTypedSchema(schema),
      })
      watchImmediate(
        data,
        (values: any) => values && form.resetForm({ values })
      )

      const queryClient = useQueryClient()
      const { close } = useCloseDialog()
      const onSubmit = () =>
        dialogOption.onSubmit &&
        dialogOption.onSubmit({
          originValues: data?.value!,
          form,
          handleSubmit: (cb) =>
            form.handleSubmit(async (...args) => {
              await cb(...args)
              queryClient.invalidateQueries()
              dialogOption?.onClose && dialogOption?.onClose()
              close()
            }, submitErrorHandler)(),
          onFinish: () => {
            queryClient.invalidateQueries()
            dialogOption?.onClose && dialogOption?.onClose()
            close()
          },
        })
      const fieldConfig = computed(() =>
        dialogOption.fieldConfig ? dialogOption.fieldConfig(form.values) : {}
      )
      return () => (
        <>
          <AutoForm
            label-width="auto"
            schema={schema}
            form-class="!px-0 grid grid-cols-2 gap-4"
            fieldConfig={fieldConfig}
            onSubmit={() => onSubmit()}></AutoForm>
          {dialogOption.onSubmit && (
            <DialogBtnGroup label={submitText.value} onSubmit={onSubmit} />
          )}
        </>
      )
    })
    const autoOpen =
      R.isBoolean(dialogOption.autoOpen) ? dialogOption.autoOpen : true
    const open = () =>
      window.$dialog.create({
        title: dialogOption.title,
        closable: false,
        showIcon: false,
        content: () => <AutoFormModal />,
      })
    autoOpen && open()

    return {
      component: <AutoFormModal />,
      title: dialogOption.title,
      open,
    }
  }
  const openGroupDialog = (option: {
    group: Array<{
      title: string
      open: () => DialogReactive
    }>
    title: string
    subTitle: string
  }) => {
    window.$dialog.create({
      title: () => (
        <NFlex justify="space-between" class="w-full">
          <NText class="n-dialog__title">{option.title}</NText>
        </NFlex>
      ),
      closable: false,
      showIcon: false,
      content: () => (
        <NFlex vertical size={12}>
          <NText>{option.subTitle}</NText>
          <NFlex vertical>
            {option.group.map((item, idx) => {
              const { title, open } = item
              return (
                <NButton
                  strong
                  secondary
                  class="cursor-pointer"
                  key={idx}
                  onClick={open}>
                  {title}
                </NButton>
              )
            })}
          </NFlex>
        </NFlex>
      ),
    })
  }
  return {
    openAutoFormDialog,
    openGroupDialog,
  }
}
