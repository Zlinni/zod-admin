<script lang="ts" setup>
import type { SelectProps } from 'naive-ui'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    options: SelectProps['options']
    consistentMenuWidth?: SelectProps['consistentMenuWidth']
    label?: string
    required?: boolean
    placeholder?: string
  }>(),
  {
    consistentMenuWidth: false,
    placeholder: '请选择',
  }
)

const { value, errorMessage } = useField<SelectProps['value']>(() => props.name)
</script>

<template>
  <NFormItem
    :label="props.label"
    :showLabel="!!props.label"
    :required="props.required"
    :validationStatus="errorMessage ? 'error' : 'success'"
    :feedback="errorMessage"
    :showFeedback="!!errorMessage">
    <NSelect
      class="min-w-32"
      v-model:value="value"
      :options="props.options"
      :placeholder="props.placeholder"
      :consistentMenuWidth="props.consistentMenuWidth"
      v-bind="$attrs" />
  </NFormItem>
</template>
