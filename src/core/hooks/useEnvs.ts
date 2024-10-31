import { useStorage } from '@vueuse/core'
import * as config from '../../../zod-admin.config'

export const useEnvs = () => {
  const localEnv = useStorage('LocalEnv', 'http://127.0.0.1:8001/api')
  const option = computed(() => {
    const _option = config.default.env.option.filter((i) => i.key)
    _option.push({
      i18n: {
        cn: '本地开发环境',
        en: 'Local',
      },
      key: localEnv.value,
    })
    return _option
  })
  const env = useStorage(
    config.default.env.storageKey ?? 'ENV',
    option.value[0].key
  )

  const getEnv = () => option.value.find((i) => i.key === env.value)
  return {
    env,
    option,
    getEnv,
    localEnv,
  }
}
