import type { MaybeRefOrGetter, PropType } from 'vue'
import type { FieldConfig } from '@/core/utils/types'
import type { ZodObjectOrWrapped } from '@core/utils/zodUtils'
import { NForm } from 'naive-ui'
import { twMerge } from 'tailwind-merge'
import type { z } from 'zod'
import AutoFormObject from './autoFormFields/object'

const AutoForm = defineComponent({
  emits: {
    submit: () => true,
  },
  setup(props, { slots, emit, attrs }) {
    return () => (
      <NForm
        {...attrs}
        onSubmit={(e) => {
          e?.preventDefault()
          emit('submit')
        }}
        class={twMerge(
          `${props?.formClass ? props?.formClass : ''} ${attrs.inline ? '' : 'space-y-1'}`
        )}>
        <AutoFormObject
          {...props}
          fieldConfig={computed(() => toValue(props.fieldConfig))}
        />
        <div class={'contents'}>{() => slots?.default && slots?.default()}</div>
      </NForm>
    )
  },
  props: {
    schema: {
      type: Object as PropType<ZodObjectOrWrapped>,
    },
    fieldConfig: {
      type: Object as PropType<
        MaybeRefOrGetter<FieldConfig<z.infer<ZodObjectOrWrapped>>>
      >,
    },
    // 表单class
    formClass: {
      type: String,
    },
  },
})

export default AutoForm
