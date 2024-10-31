import * as config from '../../../zod-admin.config'

const primaryColor = config.default.site.theme.primaryColor?.join(',')

export const configThemeVars = {
  primaryColor,
}
