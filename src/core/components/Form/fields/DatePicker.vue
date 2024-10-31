<script lang="ts" setup>
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label?: string
  required?: boolean
  placeholder?: string
}>()

const { value, errorMessage } = useField<number>(() => props.name)
</script>

<template>
  <NFormItem
    :label="props.label"
    :showLabel="!!props.label"
    :required="props.required"
    :validationStatus="errorMessage ? 'error' : 'success'"
    :feedback="errorMessage"
    :showFeedback="!!errorMessage">
    <NDatePicker v-model:value="value" type="datetime" v-bind="$attrs" />
  </NFormItem>
</template>
