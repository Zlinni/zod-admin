import type { GlobalThemeOverrides } from 'naive-ui'
import { RGB } from '../utils/rgbUtil'
import { configThemeVars } from './configTheme'

const primaryColor = configThemeVars.primaryColor as string
export const themeVars = {
  baseColor: {
    light: '255,255,255',
    dark: '255,255,255',
  },
  primaryColor,
  textColor: {
    light: '47,43,61',
    dark: '225,222,245',
  },
  borderRadius: '8px',
  bodyColor: {
    light: '248, 247, 250',
    dark: '37, 41, 60',
  },
  cardColor: {
    light: '255, 255, 255',
    dark: '47, 51, 73',
  },
  coverHover: {
    light: '244, 243, 244',
    dark: '56, 60, 82',
  },
  linearGradientColor: `linear-gradient(270deg, ${RGB.A(primaryColor.split(',').slice(0, 3).join(','), 0.7)}, ${RGB.with(primaryColor)})`,
  chartsBg: {
    light: '241, 240, 242',
    dark: '58, 63, 87',
  },
}

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: RGB.with(themeVars.primaryColor),
    primaryColorHover: RGB.with(themeVars.primaryColor),
    primaryColorPressed: RGB.with(themeVars.primaryColor),
    primaryColorSuppl: RGB.with(themeVars.primaryColor),
    borderRadius: themeVars.borderRadius,
    borderColor: RGB.A(themeVars.textColor.light, 0.12),
    textColorBase: RGB.A(themeVars.textColor.light, 0.9),
    textColor1: RGB.A(themeVars.textColor.light, 0.9),
    textColor2: RGB.A(themeVars.textColor.light, 0.7),
    textColor3: RGB.A(themeVars.textColor.light, 0.4),
    baseColor: RGB.with(themeVars.baseColor.light),
    modalColor: RGB.with(themeVars.cardColor.light),
    bodyColor: RGB.with(themeVars.bodyColor.light),
    hoverColor: RGB.with(themeVars.coverHover.light),
    tableHeaderColor: RGB.with(themeVars.cardColor.light),
    popoverColor: RGB.with(themeVars.cardColor.light),
    tableColor: RGB.with(themeVars.cardColor.light),
    tagColor: RGB.with(themeVars.cardColor.light),
    avatarColor: RGB.with(themeVars.cardColor.light),
    invertedColor: RGB.with(themeVars.cardColor.light),
    inputColor: RGB.with(themeVars.cardColor.light),
    codeColor: RGB.with(themeVars.cardColor.light),
    tabColor: RGB.with(themeVars.cardColor.light),
    actionColor: RGB.with(themeVars.cardColor.light),
    cardColor: RGB.with(themeVars.cardColor.light),
  },
  Tag: {
    borderRadius: themeVars.borderRadius,
  },
  Form: {
    labelTextColor: RGB.A(themeVars.textColor.light, 0.9),
  },
  Input: {
    color: RGB.with(themeVars.baseColor.light),
    colorFocus: RGB.with(themeVars.baseColor.light),
  },
  Select: {
    peers: {
      InternalSelection: {
        color: RGB.with(themeVars.baseColor.light),
        colorActive: RGB.with(themeVars.baseColor.light),
      },
    },
  },
  Table: {
    thColor: RGB.with(themeVars.baseColor.light),
    borderColor: RGB.A(themeVars.textColor.light, 0.12),
  },
  Pagination: {
    itemColorDisabled: RGB.with(themeVars.baseColor.light),
  },
  Dialog: {
    padding: '24px',
    contentMargin: '0',
  },
  Menu: {
    itemIconColor: RGB.A(themeVars.textColor.light, 0.9),
    itemIconColorActive: RGB.with(themeVars.baseColor.light),
    itemIconColorHover: RGB.A(themeVars.textColor.light, 0.9),
    itemTextColor: RGB.A(themeVars.textColor.light, 0.9),
    itemTextColorActive: RGB.with(themeVars.baseColor.light),
    itemTextColorHover: 'unset',
    itemTextColorActiveHover: RGB.with(themeVars.baseColor.light),
    itemTextColorChildActive: RGB.A(themeVars.textColor.light, 0.9),
    itemTextColorChildActiveHover: RGB.A(themeVars.textColor.light, 0.9),
    itemColorHover: RGB.with(themeVars.coverHover.light),
    itemColorActive: themeVars.linearGradientColor,
  },
  Button: {
    paddingMedium: '0 20px',
  },
  Dropdown: {
    padding: '8px',
  },
  Drawer: {
    bodyPadding: '0',
  },
}
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: RGB.with(themeVars.primaryColor),
    primaryColorHover: RGB.with(themeVars.primaryColor),
    primaryColorPressed: RGB.with(themeVars.primaryColor),
    primaryColorSuppl: RGB.with(themeVars.primaryColor),
    borderRadius: themeVars.borderRadius,
    borderColor: RGB.A(themeVars.textColor.dark, 0.12),
    textColorBase: RGB.A(themeVars.textColor.dark, 0.9),
    textColor1: RGB.A(themeVars.textColor.dark, 0.9),
    textColor2: RGB.A(themeVars.textColor.dark, 0.7),
    textColor3: RGB.A(themeVars.textColor.dark, 0.4),
    baseColor: RGB.with(themeVars.baseColor.dark),
    modalColor: RGB.with(themeVars.cardColor.dark),
    bodyColor: RGB.with(themeVars.bodyColor.dark),
    hoverColor: RGB.with(themeVars.coverHover.dark),
    tableHeaderColor: RGB.with(themeVars.cardColor.dark),
    popoverColor: RGB.with(themeVars.cardColor.dark),
    tableColor: RGB.with(themeVars.cardColor.dark),
    tagColor: RGB.with(themeVars.cardColor.dark),
    avatarColor: RGB.with(themeVars.cardColor.dark),
    invertedColor: RGB.with(themeVars.cardColor.dark),
    inputColor: RGB.with(themeVars.cardColor.dark),
    codeColor: RGB.with(themeVars.cardColor.dark),
    tabColor: RGB.with(themeVars.cardColor.dark),
    actionColor: RGB.with(themeVars.cardColor.dark),
    cardColor: RGB.with(themeVars.cardColor.dark),
  },
  Tag: {
    borderRadius: themeVars.borderRadius,
  },
  Form: {
    labelTextColor: RGB.A(themeVars.textColor.dark, 0.9),
  },
  Input: {
    color: RGB.with(themeVars.cardColor.dark),
    colorFocus: RGB.with(themeVars.cardColor.dark),
    border: '1px solid ' + RGB.A(themeVars.textColor.dark, 0.12),
  },
  Select: {
    peers: {
      InternalSelection: {
        color: RGB.with(themeVars.cardColor.dark),
        colorActive: RGB.with(themeVars.cardColor.dark),
        border: '1px solid ' + RGB.A(themeVars.textColor.dark, 0.12),
      },
    },
  },
  Table: {
    thColor: RGB.with(themeVars.cardColor.dark),
    borderColor: RGB.A(themeVars.textColor.dark, 0.12),
  },
  Pagination: {
    itemColorDisabled: 'rgb(53, 56, 79)',
    itemColor: 'rgb(60, 63, 86)',
  },
  Dialog: {
    padding: '24px',
    contentMargin: '0',
  },
  Menu: {
    itemIconColor: RGB.A(themeVars.textColor.dark, 0.9),
    itemIconColorActive: RGB.A(themeVars.textColor.dark, 0.9),
    itemIconColorHover: RGB.A(themeVars.textColor.dark, 0.9),
    itemTextColor: RGB.A(themeVars.textColor.dark, 0.9),
    itemTextColorActive: '#fff',
    itemTextColorHover: 'unset',
    itemTextColorActiveHover: 'unset',
    itemTextColorChildActive: RGB.A(themeVars.textColor.dark, 0.9),
    itemTextColorChildActiveHover: 'unset',
    itemColorHover: RGB.with(themeVars.coverHover.dark),
    itemColorActive: themeVars.linearGradientColor,
    arrowColorChildActive: RGB.A(themeVars.textColor.dark, 0.9),
    arrowColorHover: 'unset',
    arrowColorActiveHover: 'unset',
  },
  Button: {
    paddingMedium: '0 20px',
  },
  Dropdown: {
    padding: '8px',
    color: RGB.with(themeVars.cardColor.dark),
  },
  Drawer: {
    bodyPadding: '0',
  },
}
