import { NButton, NDivider, NFlex } from 'naive-ui'
import CancelBtn from './CancelBtn'

const DialogBtnGroup = defineComponent({
  setup(props, { slots, emit }) {
    return () => (
      <NFlex vertical size={0} class={'w-full'}>
        <NDivider />
        <NFlex justify="flex-end" class="mt-2">
          <CancelBtn />
          {slots?.default ?
            slots.default()
          : <NButton
              type="primary"
              attrType="submit"
              onClick={() => emit('submit')}>
              {props.label ?? '提交'}
            </NButton>
          }
        </NFlex>
      </NFlex>
    )
  },
  props: {
    label: {
      required: false,
      type: String,
    },
  },
  emits: {
    submit: () => true,
  },
})

export default DialogBtnGroup
