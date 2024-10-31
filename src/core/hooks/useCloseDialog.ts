import { useDialogReactiveList } from 'naive-ui'

export const useCloseDialog = () => {
  const dialogList = useDialogReactiveList()
  const close = () => {
    dialogList.value.length > 0 && dialogList.value.at(-1)?.destroy()
  }
  return {
    close,
  }
}
