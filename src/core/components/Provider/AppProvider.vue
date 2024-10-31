<script setup lang="ts">
import { useEnvs } from '@/core/hooks/useEnvs'
import { useTheme } from '@/core/hooks/useTheme'
import { breakpoints } from '@/core/utils/breakpoints'
import { useQueryClient } from '@tanstack/vue-query'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import {
  NConfigProvider,
  zhCN,
  dateZhCN,
  NDialogProvider,
  NThemeEditor,
} from 'naive-ui'
import { WindowDialogMounter } from './WindowDialogMounter'
import { WindowMessageMounter } from './WindowMessageMounter'

hljs.registerLanguage('json', json)
hljs.registerLanguage('typescript', typescript)

const themeProps = useTheme()

const { env } = useEnvs()
const queryClient = useQueryClient()
watch(env, () => queryClient.invalidateQueries())
</script>

<template>
  <NConfigProvider
    class="h-dvh"
    v-bind="themeProps"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
    :breakpoints>
    <NGlobalStyle />
    <NDialogProvider>
      <NMessageProvider>
        <WindowDialogMounter>
          <WindowMessageMounter>
            <NThemeEditor>
              <slot />
            </NThemeEditor>
          </WindowMessageMounter>
        </WindowDialogMounter>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
