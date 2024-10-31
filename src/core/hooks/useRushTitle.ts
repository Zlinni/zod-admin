import type { MaybeRefOrGetter } from 'vue'
import { useTitle } from '@vueuse/core'
import * as config from '../../../zod-admin.config'
import { useEnvs } from './useEnvs'

export const useRushTitle = (title: MaybeRefOrGetter<string>) => {
  const { getEnv } = useEnvs()
  useTitle(
    computed(
      () =>
        `${toValue(title)} - ${config.default.site.title} - ${getEnv()?.i18n.cn}`
    )
  )
}
