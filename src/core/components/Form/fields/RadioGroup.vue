<script lang="ts" setup>
import { NRadio, type SelectProps } from 'naive-ui'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    options: SelectProps['options']
    label?: string
    required?: boolean
  }>(),
  {}
)

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
    <NRadioGroup v-model:value="value" v-bind="$attrs">
      <NFlex>
        <NRadio
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          v-bind="$attrs">
          {{ option.label }}
        </NRadio>
      </NFlex>
    </NRadioGroup>
  </NFormItem>
</template>
