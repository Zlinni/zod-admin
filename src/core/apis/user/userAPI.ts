import { httpClient } from '@core/apis/httpClient'
import type { FeishuLoginDTO, FeishuLoginData } from './userTypes'

const baseURL = '/mock'

export const userAPI = {
  feishuLogin: (params: FeishuLoginDTO) =>
    httpClient<unknown, FeishuLoginData>({
      method: 'GET',
      url: '/admin/user/feishu_login',
      baseURL,
      params,
    }),
}
