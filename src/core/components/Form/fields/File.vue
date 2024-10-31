<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { yieldOrContinue } from 'main-thread-scheduling'
import { NText, type UploadFileInfo } from 'naive-ui'
import type { OnUpdateFileList } from 'naive-ui/es/upload/src/interface'
import { useField } from 'vee-validate'
import IconTool from '../../Icon/IconTool.vue'
import FileList from './FileList.vue'

const props = defineProps<{
  name: string
  label?: string
  required?: boolean
  accept?: string
}>()

const { value, errorMessage } = useField<File | undefined>(() => props.name)

const fileListRef = ref<UploadFileInfo[]>([])

const isPending = ref(false)

const handleUpdateFileList = useDebounceFn<OnUpdateFileList>(
  async (fileList) => {
    isPending.value = true

    for (const { file } of fileList) {
      if (file) {
        await yieldOrContinue('interactive')

        value.value = file
      }
    }

    fileListRef.value.length = 0
    isPending.value = false
  },
  200
)

const disabled = computed(
  () => !!(value.value && !(value.value instanceof File))
)
</script>

<template>
  <NFormItem
    :required="props.required"
    :label="props.label ?? ''"
    :validationStatus="errorMessage ? 'error' : 'success'"
    :feedback="errorMessage"
    :showFeedback="!!errorMessage">
    <NFlex class="w-full">
      <NUpload
        v-if="!disabled"
        directoryDnd
        :showFileList="false"
        :accept
        v-model:file-list="fileListRef"
        @updateFileList="handleUpdateFileList">
        <NUploadDragger>
          <NFlex justify="center" align="center">
            <IconTool icon="ic:round-plus" class="size-4" />
            <NText>点击或者拖动文件到该区域来上传</NText>
          </NFlex>
        </NUploadDragger>
      </NUpload>
      <NFlex v-if="isPending" align="center">
        <NSpin :size="12" />
        正在载入文件，请稍等
      </NFlex>
      <FileList
        v-if="value"
        :fields="[value]"
        :disabled
        @remove="() => (value = undefined)" />
    </NFlex>
  </NFormItem>
</template>
