import { type DefineComponent, defineComponent } from 'vue'
import { type MessageApi, useMessage } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApi
  }
}

/**
 * 将 useMessage 的实例挂载到 window，请在 NMessageProvider 组件内使用
 */
export const WindowMessageMounter: DefineComponent = defineComponent({
  setup: (_props, { slots }) => {
    window.$message = useMessage()

    return () => slots.default && slots.default()
  },
})
