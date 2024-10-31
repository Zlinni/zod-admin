import type { RouteRecordRaw } from 'vue-router'
import * as R from 'remeda'
import type { RushMeta } from './defineRushConfig'

export const setFileRoute = <
  T extends Record<string, RushMeta>,
  K extends RushComponent,
>(
  routers: T,
  components: K,
  prefix: string
) => {
  const getComponentMeta = createComponentMeta(routers)
  const route = Object.keys(components).reduce((pre, key) => {
    const [componentGroupName, _componentName] = key.split('/').slice(-2)
    const componentName = _componentName.split('.')[0]
    const name = `${prefix}-${componentGroupName}`
    const index = pre.findIndex((i) => i.name === name)
    if (index !== -1) {
      pre[index].children?.push({
        name: `${prefix}-${componentGroupName}-${componentName}`,
        path: componentName.toLowerCase(),
        meta: getComponentMeta(componentName),
        component: components[key],
      })
    } else {
      const meta = getComponentMeta(componentGroupName)
      pre.push({
        name: name,
        path: componentGroupName.toLowerCase(),
        meta: {
          isTop: true,
          ...meta,
        },
        weight: R.isNumber(meta.weight) ? meta.weight : Infinity,
        children: [
          {
            name: `${prefix}-${componentGroupName}-${componentName}`,
            path: componentName.toLowerCase(),
            meta: getComponentMeta(componentName),
            component: components[key],
          },
        ],
      })
    }
    return pre
  }, [] as RouteRecordRaw[])
  const orderRoute = R.sortBy(
    route as unknown as {
      weight: number
    }[],
    R.prop('weight')
  )
  console.log(orderRoute, 'orderRoute')
  return orderRoute
}
export interface RushComponent extends Record<string, unknown> {}
const createComponentMeta = (routers: Record<string, RushMeta>) => {
  return (name: string) => {
    return {
      ...routers[name as keyof typeof routers],
      title: routers[name as keyof typeof routers]?.title ?? name,
    }
  }
}
