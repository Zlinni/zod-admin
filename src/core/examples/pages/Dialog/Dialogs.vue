<script lang="ts" setup>
import MicroContainer from '@/core/components/Container/MicroContainer.vue'
import AutoFormDialog from '@/core/examples/views/Dialog/AutoFormDialog.vue'
import * as AutoFormDialogRaw from '@/core/examples/views/Dialog/AutoFormDialog.vue?raw'
import GroupDialog from '@/core/examples/views/Dialog/GroupDialog.vue'
import * as GroupDialogRaw from '@/core/examples/views/Dialog/GroupDialog.vue?raw'
import MultipleDialog from '@/core/examples/views/Dialog/MultipleDialog.vue'
import * as MultipleDialogRaw from '@/core/examples/views/Dialog/MultipleDialog.vue?raw'
import { NCode } from 'naive-ui'

const codeOpen = ref(false)
</script>

<template>
  <MicroContainer title="AutoFormDialog">
    <NGrid :cols="2" :xGap="12">
      <NGi>
        <AutoFormDialog @codeOpen="codeOpen = !codeOpen" />
      </NGi>
      <NGi>
        <NCollapse>
          <NCollapseItem title="code" name="code">
            <NCode
              :code="AutoFormDialogRaw.default"
              language="typescript"
              wordWrap />
          </NCollapseItem>
        </NCollapse>
      </NGi>
    </NGrid>
  </MicroContainer>
  <MicroContainer title="MultipleDialog">
    <NGrid :cols="2" :xGap="12">
      <NGi>
        <MultipleDialog @codeOpen="codeOpen = !codeOpen" />
      </NGi>
      <NGi>
        <NCollapse>
          <NCollapseItem title="code" name="code">
            <NCode
              :code="MultipleDialogRaw.default"
              language="typescript"
              wordWrap />
          </NCollapseItem>
        </NCollapse>
      </NGi>
    </NGrid>
  </MicroContainer>
  <MicroContainer title="GroupDialog">
    <NGrid :cols="2" :xGap="12">
      <NGi>
        <GroupDialog @codeOpen="codeOpen = !codeOpen" />
      </NGi>
      <NGi>
        <NCollapse>
          <NCollapseItem title="code" name="code">
            <NCode
              :code="GroupDialogRaw.default"
              language="typescript"
              wordWrap />
          </NCollapseItem>
        </NCollapse>
      </NGi>
    </NGrid>
  </MicroContainer>
</template>
