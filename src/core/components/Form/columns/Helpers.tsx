import {
  getZodSchemaFields,
  type ZodObjectOrWrapped,
} from '@/core/utils/zodUtils'
import IconTool from '@core/components/Icon/IconTool.vue'
import type { CellContext } from '@tanstack/vue-table'
import dayjs from 'dayjs'
import { NAvatar, NEllipsis, NFlex } from 'naive-ui'
import * as R from 'remeda'
import { z, ZodSchema } from 'zod'

export type Helper<T extends any> = (
  props: CellContext<T, any | undefined>
) => any
export const EllipsisHelper = <T extends any>(
  props: CellContext<T, any | undefined>
) => <NEllipsis>{props.getValue()}</NEllipsis>

export const DateHelper = <T extends any>(
  props: CellContext<T, Date | undefined>
) => dayjs(props.getValue()).format('YYYY-MM-DD HH:mm:ss')

export const AvatarHelper = ({
  avatar,
  name,
  description,
}: {
  /**
   * 用户头像url
   */
  avatar?: string
  /**
   * 用户名称
   */
  name?: string
  /**
   * 用户描述
   */
  description?: string
}) => (
  <NFlex align="center" wrap={false}>
    <NAvatar src={avatar} round class={'size-9 min-w-9'} />
    <NFlex vertical class={'min-w-0'}>
      {name && <NEllipsis>{name}</NEllipsis>}
      {description && <NEllipsis>{description}</NEllipsis>}
    </NFlex>
  </NFlex>
)
export const createOptionHelper =
  (options: Record<string, VNode | string>, isEllipsis?: boolean) =>
  <T extends any>(props: CellContext<T, any | undefined>) =>
    isEllipsis ?
      <NEllipsis>
        {{
          default: () => options[props.getValue() + ''],
        }}
      </NEllipsis>
    : options[props.getValue() + '']

export const BooleanHelper = createOptionHelper(
  {
    true: <IconTool icon={'tabler:check'} />,
    false: <IconTool icon={'tabler:x'} />,
  },
  false
)

export const EditorHelper = defineComponent(
  (props, { slots, emit }) => {
    return () => (
      <NFlex
        onClick={(e: Event) => {
          e.stopPropagation()
          emit('open')
        }}
        align="center"
        class="group cursor-pointer">
        {slots?.default && slots?.default()}
        <IconTool
          icon="tabler:pencil"
          class="opacity-0 group-hover:opacity-100 transistion-all"
        />
      </NFlex>
    )
  },
  {
    emits: {
      open: () => true,
    },
  }
)

const setReadonly = (value: Record<string, any>) => {
  return R.mapValues(value, (_v) => {
    if (_v instanceof Object) {
      return {
        ...setReadonly(_v),
        inputProps: {
          readonly: true,
          show: false,
        },
      }
    }
    return {
      inputProps: {
        readonly: true,
        show: false,
      },
    }
  })
}
export const ReadonlyHelper = (schema: ZodObjectOrWrapped) => {
  const keys = getZodSchemaFields(schema)
  return setReadonly(keys)
}
