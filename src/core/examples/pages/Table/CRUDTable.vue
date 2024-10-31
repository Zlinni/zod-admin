<script setup lang="tsx">
import IconTool from '@/core/components/Icon/IconTool.vue'
import MicroContainer from '@core/components/Container/MicroContainer.vue'
import CRUDTable from '../../views/Table/CRUDTable.vue'
import * as CRUDTableRaw from '../../views/Table/CRUDTable.vue?raw'

const codeOpen = ref(false)

const fileList = import.meta.glob('../../views/Table/*/*', {
  eager: true,
  as: 'raw',
})
const getIcon = (name: string) => {
  if (name.includes('tsx')) return 'tabler:file-type-tsx'
  if (name.includes('ts')) return 'tabler:file-type-ts'
  return 'tabler:folder-filled'
}
const transformFileList = () => {
  return Object.keys(fileList).reduce((pre, key) => {
    const splitFile = key.split('/')
    const tableKey = splitFile.findIndex((i) => i === 'Table')
    const [file, curFile] = splitFile.slice(tableKey + 1)
    const curIdx = pre.findIndex((i: { key: string }) => i.key === file)
    if (pre.length === 0 || curIdx === -1) {
      pre.push({
        label: file,
        key: file,
        prefix: () => <IconTool icon={getIcon(file)} />,
        children: [
          {
            label: curFile,
            key,
            prefix: () => <IconTool icon={getIcon(curFile)} />,
          },
        ],
      })
    } else {
      pre[curIdx].children.push({
        label: curFile,
        key,
        prefix: () => <IconTool icon={getIcon(curFile)} />,
      })
    }

    return pre
  }, [] as any)
}
const list = transformFileList()

const code = ref('')
const onUpdateSelectedKeys = (keys: string | any[]) => {
  if (keys.length > 0) {
    code.value = (fileList[keys[0]] as string) || ''
  }
}
</script>

<template>
  <MicroContainer title="简单的文件结构">
    <NGrid :cols="2" :xGap="12">
      <NGi>
        <NTree
          :data="list"
          expand-on-click
          default-expand-all
          selectable
          @update-selected-keys="onUpdateSelectedKeys" />
      </NGi>
      <NGi>
        <NCollapse>
          <NCollapseItem title="code" name="code">
            <NCode :code language="typescript" wordWrap />
          </NCollapseItem>
        </NCollapse>
      </NGi>
    </NGrid>
  </MicroContainer>
  <MicroContainer>
    <template #suffix>
      <IconTool
        icon="tabler:code"
        @click="codeOpen = !codeOpen"
        class="ml-auto" />
    </template>
    <CRUDTable />
    <div v-if="codeOpen">
      <NDivider />
      <NCode
        :code="CRUDTableRaw.default"
        language="typescript"
        showLineNumbers></NCode>
    </div>
  </MicroContainer>
</template>
