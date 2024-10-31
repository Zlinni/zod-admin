import type { MaybeRefOrGetter } from 'vue'
import { keepPreviousData } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import type { PaginationProps } from 'naive-ui'
import {
  type GenericObject,
  useForm,
  useFormValues,
  useSetFieldValue,
  useIsFormDirty,
  useIsFormValid,
  useIsSubmitting,
} from 'vee-validate'
import type { z } from 'zod'

export const useRushTable = <T extends GenericObject>(option: {
  schema: z.ZodObject<Record<keyof T, z.ZodTypeAny>>
}) => {
  const { resetForm, handleSubmit, values } = useForm({
    validationSchema: toTypedSchema(option.schema),
  })

  const onSearch = handleSubmit(() => {})
  const onReset = () => resetForm({ values: {} }, { force: true })

  return {
    onSearch,
    onReset,
    values,
  }
}

export const createFormSearchQueryOption = () => {
  const isFormDirty = useIsFormDirty(),
    isSubmitting = useIsSubmitting(),
    isFormValid = useIsFormValid()

  return {
    placeholderData: keepPreviousData,
    enabled: () =>
      !isFormDirty.value || (isFormValid.value && isSubmitting.value),
  }
}

export const useRushTablePagination = <T extends GenericObject>(option: {
  page?: keyof T
  pageSize?: keyof T
  total: MaybeRefOrGetter<number>
  onRefetch: () => void
}) => {
  const formValues = useFormValues<T>(),
    setPageValue = useSetFieldValue<number>(option.page as string)
  const total = computed(() => toValue(option.total))
  // 表格分页
  const page = (option?.page as keyof GenericObject) ?? 'page'
  const pageSize = (option?.pageSize as keyof GenericObject) ?? 'pageSize'
  const paginationProps = computed<PaginationProps>(() => ({
    page: formValues.value[page],
    pageSize: formValues.value[pageSize],
    pageCount:
      total.value ? Math.ceil(total.value / formValues.value[pageSize]) : 0,
    onUpdatePage: (page) => {
      setPageValue(page)
      option.onRefetch()
    },
  }))

  return {
    paginationProps,
  }
}
