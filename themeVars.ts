export const themeVars = {
  fontFamily: 'Noto Sans SC Variable',
  typography: {
    headline1: { fontSize: 36, fontWeight: 'normal', lineHeight: 60 },
    headline2: { fontSize: 24, fontWeight: 'bold', lineHeight: 40 },
    subtitle1: { fontSize: 16, fontWeight: 'bold', lineHeight: 32 },
    subtitle2: { fontSize: 14, fontWeight: 'bold', lineHeight: 26 },
    body1: { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
    body2: { fontSize: 14, fontWeight: 'normal', lineHeight: 22 },
    body3: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 },
  },
  colors: {
    primary: { base: '#FF86A8', light: '#FFB9CD', lighter: '#FFEEF7' },
    secondary: { base: '#9A56EE', light: '#DAB5F7' },
    auxiliary: {
      error: '#FF1414',
      warning: '#FFC860',
      success: '#58D385',
      info: '#5FD8F1',
    },
    typography: {
      primary: '#272727',
      regular: '#5A5A5A',
      secondary: '#8F8F8F',
      placeholder: '#B5BAC4',
    },
    background: {
      light: '#F2F2F2',
      dark: '#E2E2E2',
    },
    border: { base: '#AFAFAF' },
    other: {
      white: 'white',
      black: 'black',
      transparent: 'transparent',
    },
  },
  radius: { xs: 8, full: 9999 },
} as const
