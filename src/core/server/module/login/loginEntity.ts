import { RGB } from '@/core/utils/rgbUtil'
import Mock from 'mockjs'
import * as config from '../../../../../zod-admin.config'
import type { MockEntity } from '../entity'

const mockDepartmentList = () => ({
  dep_id: Mock.mock('@guid'),
  dep_name: Mock.mock('@ctitle(3, 5)'),
})
const color = RGB.toHex(
  RGB.A((config.default.site.theme.primaryColor as number[])?.join(','))
)
const mockGetFeishuUserInfoData = () => ({
  avatar_big: Mock.mock(`@image("200x200", "${color}")`),
  avatar_middle: Mock.mock(`@image("100x100", "${color}")`),
  avatar_thumb: Mock.mock(`@image("50x50", "${color}")`),
  department_list: Mock.mock({
    'array|1-3': [mockDepartmentList(), null],
  }),
  email: Mock.mock('@email'),
  given_name: Mock.mock('@cname'),
  is_activated: Mock.mock('@boolean'),
  is_tenant_manager: Mock.mock('@boolean'),
  nick_name: Mock.mock('@cname'),
  phone: Mock.mock(/^1[3456789]\d{9}$/),
  user_id: Mock.mock('@guid'),
})

// 使用示例
export const loginEntity: MockEntity = {
  readList: {
    url: /\/mock\/admin\/login?(?:\?.*)?$/g,
    type: 'get',
    cb: (options) => {
      const query = options.url.split('?')[1] || ''
      const params = new URLSearchParams(query)
      const email = params.get('email')
      const password = params.get('password')
      if (email === 'admin@google.com' && password === 'admin@google.com') {
        return {
          code: 0,
          data: {
            token: 'have a nice day!',
          },
        }
      }
      return {
        code: -1,
        data: {
          token: null,
        },
      }
    },
  },
  userInfo: {
    url: '/mock/admin/user/info',
    type: 'get',
    cb: (options) => {
      return {
        code: 0,
        data: mockGetFeishuUserInfoData(),
      }
    },
  },
}
