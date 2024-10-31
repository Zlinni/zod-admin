import { useDark } from '@vueuse/core'
import { lightTheme, darkTheme } from 'naive-ui'
import { darkThemeOverrides, lightThemeOverrides } from '../configs/theme'

export const useTheme = () => {
  const isDark = useDark()
  return computed(() =>
    isDark.value ?
      {
        themeOverrides: darkThemeOverrides,
        theme: darkTheme,
      }
    : {
        themeOverrides: lightThemeOverrides,
        theme: lightTheme,
      }
  )
}
