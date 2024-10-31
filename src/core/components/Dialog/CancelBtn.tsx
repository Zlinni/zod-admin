import { useCloseDialog } from '@/core/hooks/useCloseDialog'
import { NButton } from 'naive-ui'

const CancelBtn = defineComponent({
  setup() {
    const { close } = useCloseDialog()
    return () => <NButton onClick={() => close()}>关闭</NButton>
  },
})

export default CancelBtn
