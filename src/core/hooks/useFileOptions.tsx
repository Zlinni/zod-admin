import { RouterLink, useRoute, type RouteRecordRaw } from 'vue-router'
import IconTool from '@core/components/Icon/IconTool.vue'
import { NEllipsis, NFlex, type MenuOption } from 'naive-ui'
import { homeRoute } from '../router/routers'

export const useFileOptions = () => {
  const route = useRoute()
  const renderLabel = ({
    label,
    name,
    icon,
    isBase,
  }: {
    label: string
    name?: string
    icon: string
    isBase?: boolean
  }) => {
    return () => (
      <NFlex align="center" wrap={false}>
        {!isBase && (
          <IconTool
            icon={icon ? icon : 'tabler:circle'}
            size={name ? '12' : '22'}
          />
        )}
        <NEllipsis>
          {{
            tooltip: () => label,
            default: () =>
              name ?
                <RouterLink
                  to={{
                    name: name,
                    query: route.query,
                  }}>
                  {label}
                </RouterLink>
              : label,
          }}
        </NEllipsis>
      </NFlex>
    )
  }

  const setFileOpts = (
    _route: RouteRecordRaw[],
    _target: MenuOption[] = []
  ) => {
    _route.forEach(({ children, name, meta }) => {
      const { title, icon, isTop, isBase } = meta || {}
      const target: MenuOption = {
        label: renderLabel({
          label: title as string,
          name: isTop ? undefined : (name as string),
          icon: icon as string,
          isBase: isBase as boolean,
        }),
        key: name as string,
        meta,
        type: isBase ? 'group' : undefined,
      }
      if (children) {
        target.children = setFileOpts(children, [])
      }
      _target.push(target)
    })

    return _target
  }
  const fileOptions = computed<MenuOption[]>(() =>
    setFileOpts(homeRoute.children, [])
  )
  return {
    fileOptions,
  }
}
