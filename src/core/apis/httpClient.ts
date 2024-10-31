import router from '@core/router'
import axios from 'axios'
import * as config from '../../../zod-admin.config'
import { useEnvs } from '../hooks/useEnvs'
import { tokenHandler } from './tokenHandler'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number
    data: T
    msg: string
  }
}
export const httpClient = axios.create()

httpClient.interceptors.request.use(
  (configs) => {
    console.log(process.env.NODE_ENV, 'NODE_ENV')
    const token = tokenHandler.get() ?? config.default.request.token?.mock

    if (configs.headers && token) {
      configs.headers['Authorization'] =
        (config.default.request.token?.prefix ?? '') + token
    }
    const { env } = useEnvs()

    configs.url = env.value + configs.url

    return configs
  },
  (error) => Promise.reject(error)
)

httpClient.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data

    if (code && code !== 0) {
      const message = data?.err ?? msg

      if (message) {
        window?.$message?.error(message)
      }

      throw new Error(message)
    }

    // 防止下载的时候后端不包一层外置
    if (!code && code !== 0) {
      const resType = Object.prototype.toString.call(response.data)
      const isBlob = resType === '[object Blob]'
      if (isBlob || resType === '[object String]') return response
    }

    return response.data?.data
  },
  (error) => {
    if (error.response?.data) {
      const { code, msg, data } = error.response.data

      const message = data?.err ?? msg

      if (message) {
        window?.$message.error(message)
      }
    } else if (error.message) {
      window?.$message.error(error.message)
    }

    if (error.response?.status === 401) {
      tokenHandler.remove()

      router.push({ name: 'Login', params: { type: 'password' } })
    }

    return Promise.reject(error)
  }
)
