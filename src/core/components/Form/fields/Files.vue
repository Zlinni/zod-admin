<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { yieldOrContinue } from 'main-thread-scheduling'
import { NText, type UploadFileInfo } from 'naive-ui'
import type { OnUpdateFileList } from 'naive-ui/es/upload/src/interface'
import { useFieldArray, useFieldError } from 'vee-validate'
import IconTool from '../../Icon/IconTool.vue'
import FileList from './FileList.vue'

const props = defineProps<{
  name: string
  label?: string
  required?: boolean
  accept?: string
}>()

const { fields, push, remove } = useFieldArray<File>(() => props.name)

const error = useFieldError(() => props.name)

const fileListRef = ref<UploadFileInfo[]>([])

const isPending = ref(false)

const handleUpdateFileList = useDebounceFn<OnUpdateFileList>(
  async (fileList) => {
    isPending.value = true

    for (const { file } of fileList) {
      if (file) {
        await yieldOrContinue('interactive')

        push(file)
      }
    }

    fileListRef.value.length = 0
    isPending.value = false
  },
  200
)

const disabled = computed(
  () =>
    fields.value.length > 0 &&
    fields.value.every((field) => !(field.value instanceof File))
)
</script>

<template>
  <NFormItem
    :required="props.required"
    :label="props.label ?? ''"
    :validationStatus="error ? 'error' : 'success'"
    :feedback="error"
    :showFeedback="!!error">
    <NFlex class="w-full">
      <NUpload
        v-if="!disabled"
        multiple
        directoryDnd
        :showFileList="false"
        v-model:file-list="fileListRef"
        :accept
        @updateFileList="handleUpdateFileList">
        <NUploadDragger>
          <NFlex justify="center" align="center">
            <IconTool icon="ic:round-plus" size="16" />
            <NText>点击或者拖动文件到该区域来上传</NText>
          </NFlex>
        </NUploadDragger>
      </NUpload>
      <NFlex v-if="isPending" align="center">
        <NSpin :size="12" />
        正在载入文件，请稍等...
      </NFlex>
      <NText v-if="fields.length > 0">已选择 {{ fields.length }} 个文件</NText>
      <FileList
        v-if="fields.length > 0"
        :fields="fields.map((i) => i.value)"
        :disabled
        @remove="remove" />
    </NFlex>
  </NFormItem>
</template>
