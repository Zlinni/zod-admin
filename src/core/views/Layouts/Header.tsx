import { httpClient } from '@/core/apis/httpClient'
import { useAutoFormDialog } from '@/core/components/Dialog/useAutoFormDialog'
import { useEnvs } from '@/core/hooks/useEnvs'
import {
  ClickRowType,
  useRushTableClickRow,
} from '@/core/hooks/useRushTableClickRow'
import { useThemeVars } from '@/core/hooks/useThemeVars'
import { useDrawerOpen } from '@/core/stores/useDrawerOpen'
import { RGB } from '@/core/utils/rgbUtil'
import { tokenHandler } from '@core/apis/tokenHandler'
import IconTool from '@core/components/Icon/IconTool.vue'
import { useFileOptions } from '@core/hooks/useFileOptions'
import router from '@core/router'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { onKeyStroke, useDark } from '@vueuse/core'
import {
  NAvatar,
  NButton,
  NDivider,
  NDropdown,
  NEllipsis,
  NFlex,
  NGrid,
  NGridItem,
  NInput,
  NLayoutHeader,
  NTag,
  NText,
  useDialogReactiveList,
} from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { storeToRefs } from 'pinia'
import { Key } from 'ts-key-enum'
import { match } from 'ts-pattern'
import { z } from 'zod'
import * as config from '../../../../zod-admin.config'

const Header = defineComponent({
  setup(props, { slots }) {
    const renderIcon = (icon: string) => () => (
      <IconTool icon={icon} size={'16'} />
    )
    const { url, method, apiKeyAdapter } = config.default.user.default
    const api = httpClient<
      unknown,
      {
        [key: string]: any
      }
    >({
      method,
      url,
    })

    const { avatar, nickName, email } = apiKeyAdapter
    const { data } = useQuery({
      ...queryOptions({
        queryKey: ['userinfo'],
        queryFn: () => api,
      }),
    })
    const avatarSrc = computed(() => (avatar ? data.value?.[avatar] : ''))
    const userName = computed(() =>
      nickName ? data.value?.[nickName] : '用户名称'
    )
    const dropdownOpts = computed<DropdownMixedOption[]>(() => {
      return [
        {
          key: 'header',
          type: 'render',
          render: () => (
            <NFlex vertical class={'w-[220px] mb-2'}>
              <NFlex align="center">
                <Avatar
                  avatar={avatarSrc.value}
                  userName={userName.value}
                  size={48}
                />
                <NEllipsis class="font-semibold !max-w-[100px]">
                  {userName.value}
                </NEllipsis>
              </NFlex>
              {email && (
                <NEllipsis class="body3 text-typography-secondary !max-w-[200px]">
                  {data.value?.[email]}
                </NEllipsis>
              )}
            </NFlex>
          ),
        },
        {
          key: 'header-divider',
          type: 'divider',
        },
        {
          label: '退出登录',
          key: 'logOut',
          icon: renderIcon('bi:box-arrow-left'),
        },
      ]
    })
    const handleSelect = (key: string) => {
      if (key === 'logOut') {
        tokenHandler.remove()
        router.push({ name: 'Login', params: { type: 'password' } })
      }
    }
    const dialogList = useDialogReactiveList()
    const openSearchDialog = () => {
      window.$dialog.create({
        showIcon: false,
        closable: false,
        content: () => <SearchModal />,
        class: 'p-4',
      })
    }
    onKeyStroke(
      [Key.Control, 'k'],
      (e) => {
        if (e.ctrlKey && e.key === 'k' && dialogList.value.length === 0) {
          e.preventDefault()
          openSearchDialog()
        }
      },
      { dedupe: true, target: document }
    )
    onKeyStroke(Key.Escape, (e) => {
      e.preventDefault()
      window.$dialog.destroyAll()
    })

    const isDark = useDark()
    const theme = computed(() => (isDark.value ? 'dark' : 'light'))
    const activeThemeIcon = computed(
      () => themeOption.find((i) => i.key === theme.value)?.meta.icon || ''
    )
    const themeOption = [
      {
        key: 'light',
        label: 'Light',
        icon: renderIcon('tabler:sun-high'),
        meta: {
          icon: 'tabler:sun-high',
        },
      },
      {
        key: 'dark',
        label: 'Dark',
        icon: renderIcon('tabler:moon-stars'),
        meta: {
          icon: 'tabler:moon-stars',
        },
      },
    ] as const
    const handleSelectTheme = (key: (typeof themeOption)[number]['key']) => {
      match(key)
        .with('light', () => (isDark.value = false))
        .with('dark', () => (isDark.value = true))
        .exhaustive()
    }
    const themeVars = useThemeVars()
    const color = computed(() => themeVars.value.bodyColor || '')

    const { open } = storeToRefs(useDrawerOpen())

    const { env, option, getEnv, localEnv } = useEnvs()
    const envOption = computed(() =>
      option.value.map((i) => ({
        ...i,
        label: i.i18n.cn + '-' + i.i18n.en,
      }))
    )
    const tagLabel = computed(() => getEnv()?.i18n.en)
    const handleSelectEnv = (key: (typeof envOption.value)[number]['key']) =>
      (env.value = key)

    const { openAutoFormDialog } = useAutoFormDialog()
    const { clickRowType } = useRushTableClickRow()
    const openLocalEnvDialog = () => {
      openAutoFormDialog({
        title: '系统设置',
        schema: z.object({
          envUrl: z
            .string()
            .optional()
            .describe('本地环境URL')
            .default(localEnv.value),
          clickRowType: z
            .nativeEnum(ClickRowType)
            .optional()
            .default(ClickRowType.打开详情)
            .describe('点击Table默认行为'),
        }),
        async onSubmit({ handleSubmit }) {
          handleSubmit((values) => {
            localEnv.value = values.envUrl
            clickRowType.value = values.clickRowType
          })
        },
      })
    }

    return () => (
      <NFlex class="w-full h-[78px] sticky top-0 z-[999]" align="center">
        <NLayoutHeader
          class="px-4 h-[54px] w-full shadow-primary flex justify-between items-center rounded-md overflow-hidden"
          style={{
            backdropFilter: 'blur(6px)',
            backgroundColor: RGB.A(themeVars.value.cardColor, 0.88),
          }}>
          <NFlex align="center" class="cursor-pointer">
            <IconTool
              icon="tabler:menu-2"
              size="22"
              class={'desktop:hidden'}
              onClick={() => (open.value = !open.value)}
            />
            <IconTool
              icon="tabler:search"
              size="22"
              onClick={() => openSearchDialog()}
            />
            <NText
              class={'!text-textColor3'}
              onClick={() => openSearchDialog()}>
              Search
            </NText>
            <NText
              class={
                '!text-textColor3 rounded-md border border-[rgba(47, 43, 61, 0.12)] dark:border-[rgba(225,222,245,0.12)] px-1'
              }>
              ⌘K
            </NText>
          </NFlex>
          <NFlex align="center" justify="flex-end">
            <NDropdown
              options={envOption.value}
              trigger="hover"
              onSelect={handleSelectEnv}>
              <NTag
                size="medium"
                class="text-white"
                color={{
                  color: RGB.with(themeVars.value.primaryColor),
                  borderColor: 'transparent',
                }}>
                {tagLabel.value}
              </NTag>
            </NDropdown>
            <IconTool
              icon={'tabler:settings-code'}
              size={'22'}
              onClick={() => openLocalEnvDialog()}
            />
            <NDropdown
              options={themeOption}
              trigger="hover"
              onSelect={handleSelectTheme}>
              <IconTool icon={activeThemeIcon.value} size={'22'} />
            </NDropdown>
            <NDropdown
              options={dropdownOpts.value}
              trigger="hover"
              onSelect={handleSelect}>
              <Avatar avatar={avatarSrc.value} userName={userName.value} />
            </NDropdown>
          </NFlex>
        </NLayoutHeader>
        <div
          class={'absolute z-[-1] w-full h-full'}
          style={{
            background: `linear-gradient(180deg, rgba(${color.value},70%) 44%,rgba(${color.value},43%) 73%,rgba(${color.value},0%))`,
            backdropFilter: 'blur(10px)',
            mask: `linear-gradient(black,black 18%,transparent 100%)`,
          }}></div>
      </NFlex>
    )
  },
})
export default Header

const Avatar = defineComponent(
  (props) => {
    const themeVars = useThemeVars()
    return () =>
      props.avatar ?
        <NAvatar round src={props.avatar} size={props.size}></NAvatar>
      : props.userName ?
        <NFlex
          class={'rounded-full size-9 text-white'}
          align="center"
          justify="center"
          style={{
            background: RGB.with(themeVars.value.primaryColor),
          }}>
          {props.userName.slice(0, 1)}
        </NFlex>
      : <></>
  },
  {
    props: {
      avatar: {
        type: String,
        required: false,
      },
      size: {
        type: Number,
        required: false,
      },
      userName: {
        type: String,
        required: false,
      },
    },
  }
)

const SearchModal = defineComponent(() => {
  const { fileOptions } = useFileOptions()
  const searchVal = ref('')

  const fileOptionsInSearch = computed(() =>
    [...fileOptions.value].flatMap((i) =>
      i.children?.flatMap((j) =>
        j.children?.filter((k) =>
          k?.meta?.title?.toLowerCase().includes(searchVal.value?.toLowerCase())
        )
      )
    )
  )

  const closeDialog = () => window.$dialog.destroyAll()
  return () => (
    <NFlex vertical>
      <NFlex align="center" justify="space-between" wrap={false}>
        <IconTool icon="tabler:search" size="22" />
        <NInput
          class={'w-full'}
          bordered={false}
          placeholder={''}
          v-model:value={searchVal.value}
        />
        <NText class={'whitespace-nowrap !text-textColor3'}>[esc]</NText>
        <IconTool icon="tabler:x" size="22" />
      </NFlex>
      <NDivider class={'!m-0'} />
      <NGrid class={'p-8'} cols={1}>
        <NGridItem class={'p-3 space-y-2'}>
          {searchVal.value ?
            <>
              <NText class={'!text-textColor3'}>搜索结果</NText>
              {fileOptionsInSearch.value.flatMap((i) => (
                <NButton
                  class={'p-1 w-full'}
                  key={i?.key}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeDialog()
                  }}>
                  {i?.label && i.label()}
                </NButton>
              ))}
            </>
          : <>
              <NText class={'!text-textColor3'}>常用子模块</NText>
              {fileOptions.value
                .flatMap((i) =>
                  i.children?.map((j) =>
                    j.children?.map((k) => (
                      <NButton
                        class={'p-1 w-full'}
                        key={k.key}
                        onClick={(e) => {
                          e.stopPropagation()
                          closeDialog()
                        }}>
                        {k.label && k.label()}
                      </NButton>
                    ))
                  )
                )
                .slice(0, 12)}
            </>
          }
        </NGridItem>
      </NGrid>
    </NFlex>
  )
})
