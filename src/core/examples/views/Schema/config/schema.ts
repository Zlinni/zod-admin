const components = import.meta.glob('../components/*.tsx', {
  eager: true,
  import: 'default',
})
const componentsRaw = import.meta.glob('../components/*.tsx', {
  eager: true,
  as: 'raw',
})
const schemasRaw = import.meta.glob('../schemas/*.ts', {
  eager: true,
  as: 'raw',
})
const formatObject = (o: Object) => {
  return Object.keys(o).reduce(
    (pre, cur) => {
      const name = cur.split('/').at(-1)?.split('.')[0]!
      pre[name] = o[cur as keyof typeof o]
      return pre
    },
    {} as Record<string, any>
  )
}
export const getSchemasComponents = () => {
  const _components = formatObject(components)
  const _componentsRaw = formatObject(componentsRaw)
  const _schemasRaw = formatObject(schemasRaw)

  return Object.keys(components).map((key) => {
    const name = key.split('/').at(-1)?.split('.')[0]!
    return {
      name,
      components: _components[name],
      componentsRaw: _componentsRaw[name],
      schemasRaw: _schemasRaw[name],
    }
  })
}
