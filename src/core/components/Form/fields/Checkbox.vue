<script lang="ts" setup>
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label?: string
  required?: boolean
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
    <NCheckbox v-model:checked="value" v-bind="$attrs" />
  </NFormItem>
</template>
