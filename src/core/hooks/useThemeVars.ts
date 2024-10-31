import { useDark } from '@vueuse/core'
import { themeVars } from '../configs/theme'

export const useThemeVars = () => {
  const isDark = useDark()
  return computed(() => {
    const _isDark = isDark.value
    return Object.keys(themeVars).reduce(
      (pre, key) => {
        const _key = key as keyof typeof themeVars
        const value = themeVars[_key]
        if (typeof value === 'string') {
          pre[_key] = value
        } else {
          pre[_key] = _isDark ? value.dark : value.light
        }
        return pre
      },
      {} as Record<keyof typeof themeVars, string>
    )
  })
}
