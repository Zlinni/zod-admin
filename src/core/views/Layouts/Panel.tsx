import Bg from '@core/assets/background/cool-background.svg'
import { NButton, NCard, NFlex } from 'naive-ui'

const Panel = defineComponent({
  setup(prop, { slots }) {
    return () => (
      <NFlex
        vertical
        justify="center"
        align="center"
        class="w-full h-screen bg-repeat bg-center bg-fixed bg-cover"
        style={{ backgroundImage: `url(${Bg})` }}
        size={24}>
        <NCard
          class="w-full rounded-lg max-w-md"
          contentClass="!p-6 flex flex-col justify-start items-center gap-4">
          {slots?.default && slots?.default()}
        </NCard>
      </NFlex>
    )
  },
})
const Button = defineComponent({
  setup(props, { slots }) {
    return () => (
      <NButton
        round
        class="w-full mt-auto"
        theme-overrides={{
          colorHover: 'unset',
          textColorHover: 'unset',
          textColorPressed: 'unset',
          textColorFocus: 'unset',
          borderHover: 'unset',
          borderPressed: 'unset',
          borderFocus: 'unset',
        }}
        {...props}>
        {slots?.default && slots?.default()}
      </NButton>
    )
  },
})

Panel.Button = Button
export default Panel
