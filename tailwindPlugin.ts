import plugin from 'tailwindcss/plugin'
import type {
  CSSRuleObject,
  KeyValuePair,
  RecursiveKeyValuePair,
} from 'tailwindcss/types/config'
import { themeVars } from './themeVars'

export const tailwindPlugin = plugin(
  ({ addComponents }) => {
    const utilities: CSSRuleObject = {}

    //typography
    for (const key in themeVars.typography) {
      const style =
        themeVars.typography[key as keyof typeof themeVars.typography]

      const utility = {
        color: themeVars.colors.typography.regular,
        fontFamily: themeVars.fontFamily,
        fontSize: style.fontSize + 'px',
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight + 'px',
      }

      utilities[`.${key}`] = utility
    }

    addComponents(utilities)
  },
  {
    theme: {
      extend: {
        colors: (() => {
          const colors: RecursiveKeyValuePair = {}

          for (const colorKey in themeVars.colors) {
            const colorVariants =
              themeVars.colors[colorKey as keyof typeof themeVars.colors]

            const colorValues: KeyValuePair = {}

            for (const key in colorVariants) {
              const color = colorVariants[key as keyof typeof colorVariants]

              colorValues[key] = color
            }

            colors[colorKey] = colorValues
          }

          return colors
        })(),
      },
    },
  }
)
