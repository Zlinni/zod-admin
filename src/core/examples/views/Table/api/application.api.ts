import { httpClient } from '@core/apis/httpClient'
import type { APITypes } from './application.zod'

export const API = {
  // 基本查询
  readList: (params: APITypes['readList']['DTO']) =>
    httpClient.get<unknown, APITypes['readList']['VO']>('/mock/admin/app', {
      params,
    }),
  // 查询详情
  readOne: (params: APITypes['readOne']['DTO']) =>
    httpClient.get<unknown, APITypes['readOne']['VO']>(
      '/mock/admin/app/' + params.id
    ),
  // 增加
  createOne: (data: APITypes['createOne']['DTO']) =>
    httpClient.post<unknown, APITypes['createOne']['VO']>(
      '/mock/admin/app',
      data
    ),
  // 删除
  deleteOne: (data: APITypes['deleteOne']['DTO']) =>
    httpClient.delete<unknown>('/mock/admin/app/' + data?.id),
  // 编辑
  updateOne: (data: APITypes['updateOne']['DTO']) =>
    httpClient.post('/mock/admin/app/' + data?.id, data),
}
