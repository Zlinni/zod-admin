<script lang="ts" setup>
import { NInputNumber } from 'naive-ui'
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label?: string
  required?: boolean
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
    <NInputNumber v-model:value="value" v-bind="$attrs" />
  </NFormItem>
</template>
