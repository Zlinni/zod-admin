import type { MaybeRefOrGetter } from 'vue'
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import type { PaginationProps } from 'naive-ui'
import {
  type GenericObject,
  useForm,
  useIsFormDirty,
  useIsFormValid,
  useIsSubmitting,
  type FormState,
  type ResetFormOpts,
} from 'vee-validate'
import type { z } from 'zod'
import type { UnwrapZod } from '../components/Dialog/useAutoFormDialog'
import type { FieldConfigItem } from '../utils/types'

export function useRushTable<
  T extends GenericObject,
  K extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
  E extends unknown,
>(
  args: UseRushTableWithTransform<T, K, U, E>
): {
  data: E
} & RushTableReturnType<T, U>

export function useRushTable<
  T extends GenericObject,
  K extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
>(
  args: UseRushTable<T, K, U>
): {
  data: K
} & RushTableReturnType<T, U>

export function useRushTable<
  T extends GenericObject,
  K extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
  E,
>({
  schema,
  api,
  apiKeyAdapter,
  transform,
  fieldConfig,
}: UseRushTableWithPartialTransform<T, K, U, E>) {
  const { resetForm, handleSubmit, setValues, values } = useForm<UnwrapZod<U>>({
    validationSchema: toTypedSchema(schema),
  })
  const { page: pageKey, size: sizeKey } = apiKeyAdapter.params
  const { total: totalKey } = apiKeyAdapter.data
  const searchQueryOption = createFormSearchQueryOption()

  const { data, refetch } = useQuery({
    ...queryOptions({
      queryKey: [api.toString()],
      queryFn: () => api(values as T),
    }),
    ...searchQueryOption,
  })

  const total = computed(() => data.value?.[totalKey] || 0)

  const paginationProps = computed<PaginationProps>(() => {
    const page = (values as T)[pageKey]
    const pageSize = (values as T)[sizeKey]
    return {
      page,
      pageSize,
      pageCount: total.value ? Math.ceil(total.value / pageSize) : 0,
      onUpdatePage: (page) => {
        setValues({ [pageKey]: page })
        refetch()
      },
    }
  })

  const onSearch = handleSubmit(() => {})
  const onReset = resetForm

  const _data = computed(() =>
    data.value ?
      transform ? transform(data.value)
      : data.value
    : undefined
  )

  const formProps = computed(() => ({
    schema,
    fieldConfig: fieldConfig ? fieldConfig(values) : {},
  }))
  return {
    /**
     * 表格表单查询函数
     */
    onSearch,
    /**
     * 表格表单重置函数
     */
    onReset,
    /**
     * 表格分页参数
     */
    paginationProps,
    /**
     * 表格data
     */
    data: _data,
    /**
     * form values
     */
    values,
    /**
     * rush table props
     */
    formProps,
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

interface Transform<T extends GenericObject, K extends unknown> {
  transform: (v: T) => K
}
interface UseRushTable<
  T extends GenericObject,
  K extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
> {
  /**
   * schema
   */
  schema: z.ZodObject<U>
  /**
   * api
   * @param args
   * @returns
   */
  api: (...args: T[]) => Promise<K>
  /**
   * api适配器
   */
  apiKeyAdapter: {
    params: {
      page: keyof T
      size: keyof T
    }
    data: {
      total: keyof K
    }
  }
  /**
   * form field配置
   */
  fieldConfig?: (
    values: UnwrapZod<T>
  ) => Partial<Record<keyof T, FieldConfigItem>>
}
type UseRushTableWithTransform<
  T extends GenericObject,
  K extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
  E extends unknown,
> = UseRushTable<T, K, U> & Transform<K, E>

type UseRushTableWithPartialTransform<
  T extends GenericObject,
  K extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
  E extends unknown,
> = UseRushTable<T, K, U> & Partial<Transform<K, E>>

type RushTableReturnType<
  T extends GenericObject,
  U extends Record<keyof T, z.ZodTypeAny>,
> = {
  /**
   * 搜索函数
   * @param e
   * @returns
   */
  onSearch: (e?: Event | undefined) => Promise<void | undefined>
  /**
   * 重置函数
   * @param state
   * @param opts
   * @returns
   */
  onReset: (
    state?: Partial<FormState<GenericObject>> | undefined,
    opts?: Partial<ResetFormOpts> | undefined
  ) => void
  /**
   * 分页Props
   */
  paginationProps: globalThis.ComputedRef<PaginationProps>
  /**
   * schema values
   */
  values: UnwrapZod<T>
  /**
   * AutoForm props
   */
  formProps: MaybeRefOrGetter<{
    schema: z.ZodObject<U>
    fieldConfig?: Partial<Record<keyof T, FieldConfigItem>>
  }>
}
