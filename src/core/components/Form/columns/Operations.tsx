import type { PropType } from 'vue'
import IconTool from '@core/components/Icon/IconTool.vue'
import { NFlex, NButton, NDropdown } from 'naive-ui'

export enum OperationKeys {
  detail = 'detail',
  update = 'update',
  delete = 'delete',
  download = 'download',
  retry = 'retry',
}
const Operations = defineComponent({
  emits: {
    select: (key: OperationKeys) => true,
  },
  props: {
    buttons: {
      type: Array as PropType<Array<keyof typeof OperationKeys>>,
      required: false,
      default: () => [
        OperationKeys.detail,
        OperationKeys.update,
        OperationKeys.delete,
      ],
    },
  },
  setup({ buttons }, { emit }) {
    const renderIcon = (icon: string) => <IconTool icon={icon} size="16" />
    const dropdownProps = {
      props: {
        onClick: (e: MouseEvent) => e.stopPropagation(),
      },
    }
    const dropdownOpts = [
      {
        label: '查看',
        key: OperationKeys.detail,
        icon: renderIcon('tabler:eye'),
        ...dropdownProps,
      },
      {
        label: '编辑',
        key: OperationKeys.update,
        icon: renderIcon('tabler:pencil'),
        ...dropdownProps,
      },
      {
        label: '删除',
        key: OperationKeys.delete,
        icon: renderIcon('tabler:trash'),
        ...dropdownProps,
      },
      {
        label: '下载',
        key: OperationKeys.download,
        icon: renderIcon('tabler:download'),
        ...dropdownProps,
      },
      {
        label: '重试',
        key: OperationKeys.retry,
        icon: renderIcon('tabler:refresh'),
        ...dropdownProps,
      },
    ].filter((i) => buttons.includes(i.key))
    const handleSelect = (key: OperationKeys) => emit('select', key)
    return () => (
      <NFlex class={'w-auto'} wrap={false}>
        {dropdownOpts
          .map(({ key, icon }, index) => {
            return (
              <NButton
                text
                class={key}
                onClick={(e) => {
                  e.stopPropagation()
                  emit('select', key)
                }}>
                {icon}
              </NButton>
            )
          })
          .filter(Boolean)}
        <NDropdown
          themeOverrides={{ padding: '8px' }}
          options={dropdownOpts as any}
          trigger="click"
          onSelect={handleSelect}>
          <NButton
            text
            onClick={(e) => {
              e.stopPropagation()
            }}>
            <IconTool icon="tabler:dots-vertical" />
          </NButton>
        </NDropdown>
      </NFlex>
    )
  },
})

export default Operations
