<script lang="ts" setup>
import { NInput, type InputProps } from 'naive-ui'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    required?: boolean
    type?: InputProps['type']
    maxlength?: InputProps['maxlength']
    showCount?: InputProps['showCount']
    placeholder?: string
    themeOverrides?: InputProps['themeOverrides']
    onBlur?: InputProps['onBlur']
  }>(),
  { placeholder: '请输入' }
)

defineSlots<{
  prefix(): any
  suffix(): any
}>()

const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <NFormItem
    :label="props.label"
    :showLabel="!!props.label"
    :required="props.required"
    :validationStatus="errorMessage ? 'error' : 'success'"
    :feedback="errorMessage"
    :showFeedback="!!errorMessage">
    <NInput
      v-model:value="value"
      :type="type"
      :maxlength="props.maxlength"
      :showCount="props.showCount"
      :placeholder="props.placeholder"
      :themeOverrides="props.themeOverrides"
      :onBlur="props.onBlur"
      v-bind="$attrs">
      <template #prefix>
        <slot name="prefix" />
      </template>
      <template #suffix>
        <slot name="suffix" />
      </template>
    </NInput>
  </NFormItem>
</template>
