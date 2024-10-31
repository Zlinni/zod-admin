import { NFlex } from 'naive-ui'

const TableContainer = defineComponent((props, { slots }) => {
  return () => (
    <NFlex vertical class="flex-1 overflow-hidden">
      {slots?.default && slots.default()}
    </NFlex>
  )
})
export default TableContainer
