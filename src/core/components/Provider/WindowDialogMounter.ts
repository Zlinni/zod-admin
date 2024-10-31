import { type DefineComponent, defineComponent } from 'vue'
import { type DialogApi, useDialog } from 'naive-ui'

declare global {
  interface Window {
    $dialog: DialogApi
  }
}

/**
 * 将 useDialog 的实例挂载到 window，请在 NDialogProvider 组件内使用
 */
export const WindowDialogMounter: DefineComponent = defineComponent({
  setup: (_props, { slots }) => {
    window.$dialog = useDialog()

    return () => slots.default && slots.default()
  },
})
