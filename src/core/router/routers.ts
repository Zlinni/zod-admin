import type { RouteRecordRaw } from 'vue-router'
import * as config from '../../../zod-admin.config'
import type { RushMeta } from '../utils/defineRushConfig'
import { setFileRoute, type RushComponent } from '../utils/setFileRoute'

interface GenericKeys<T extends any> {
  page: T
  examples: T
}
const components: GenericKeys<RushComponent> = {
  page: import.meta.glob('../../views/Module/Admin/pages/*/*.vue', {
    eager: true,
    import: 'default',
  }),
  examples: import.meta.glob('../examples/pages/*/*.vue', {
    eager: true,
    import: 'default',
  }),
}
const routers: GenericKeys<Record<string, RushMeta>> = {
  page: config.default.routers,
  examples: {
    Table: {
      icon: 'tabler:table',
    },
    Schema: {
      icon: 'tabler:checkbox',
    },
    Dialog: {
      icon: 'tabler:square',
    },
  },
}
const fileRouters: GenericKeys<RouteRecordRaw[]> = {
  page: setFileRoute(routers.page, components.page, 'page'),
  examples: setFileRoute(routers.examples, components.examples, 'examples'),
}
const createBaseRoute = ({
  routers,
  title,
  name,
}: {
  routers: RouteRecordRaw[]
  title?: string
  name: string
}) => {
  return {
    path: name.toLowerCase(),
    name,
    meta: {
      isBase: true,
      title: title ?? name,
    },
    redirect: {
      name: routers[0]?.children?.[0]?.name ?? routers[0]?.name,
    },
    component: () => import('@core/views/Main.vue'),
    children: routers,
  }
}
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
export const homeRoute = {
  path: '/',
  name: 'Home',
  redirect: {
    name: fileRouters.page.length > 0 ? 'Admin' : 'Examples',
  },
  children: [
    createBaseRoute({
      name: 'Admin',
      title: 'Pages',
      routers: fileRouters.page,
    }),
  ].concat(
    process.env.NODE_ENV === 'development' ?
      [
        createBaseRoute({
          name: 'Examples',
          routers: fileRouters.examples,
        }),
      ]
    : []
  ),
}
