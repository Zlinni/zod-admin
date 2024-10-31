import Mock from 'mockjs'
import type { MockEntity } from '../entity'

// 模拟 App 对象
const mockApp = () => ({
  'id|+1': Mock.mock('@increment(1)').toString(), // 随机生成一个 GUID 作为 ID
  app_ch_name: Mock.mock('@ctitle(5, 10)'), // 随机生成5-10个汉字的应用全名
  app_name: Mock.mock(/\w{3,8}/), // 随机生成3-8个字母或数字的应用简称
  app_producer: Mock.mock('@cname'), // 随机生成一个中文姓名作为制作人/制作团队
  client_id: Mock.mock('@guid'), // 随机生成一个 GUID 作为 ClientID
  created_at: +Mock.Random.date('T'), // 随机生成一个日期作为创建时间
  updated_at: +Mock.Random.date('T'), // 随机生成一个日期作为更新时间
})

// 模拟 ReadListData 对象
const mockReadListData = (options: { page: number; size: number }) => {
  const { page = 1, size = 10 } = options || {}
  const total_size = Mock.mock('@natural(100, 1000)') // 随机生成一个100-1000之间的总数
  const apps = []
  for (let i = 0; i < size; i++) {
    apps.push(mockApp())
  }
  return {
    code: 0,
    data: {
      apps,
      page,
      size,
      total_size,
    },
    msg: '',
  }
}

const mockReadOneData = () => ({
  code: 0,
  data: {
    app: mockApp(),
  },
  msg: '',
})

export const tableEntity: MockEntity = {
  readList: {
    url: '/mock/admin/app',
    type: 'get',
    cb: (options) => {
      if (options.url.includes('?')) {
        const query = options.url?.split('?')[1] || ''
        const params = new URLSearchParams(query)
        const page = parseInt(params.get('page') || '1', 10)
        const size = parseInt(params.get('size') || '10', 10)
        return mockReadListData({ page, size })
      }
      const id = options.url.split('/').at(-1) || ''
      if (id) {
        return mockReadOneData()
      }
    },
  },
  createOne: {
    url: /\/mock\/admin\/app?(?:\?.*)?$/g,
    type: 'post',
    cb: () => {
      return {
        code: 0,
        data: {
          app: mockReadOneData(),
        },
      }
    },
  },
  deleteOne: {
    url: /\/mock\/admin\/app\/\w+/g,
    type: 'delete',
    cb: () => {
      return {
        code: 0,
        data: {
          app: mockReadOneData(),
        },
      }
    },
  },
  updateOne: {
    url: /\/mock\/admin\/app\/\w+/g,
    type: 'put',
    cb: () => {
      return {
        code: 0,
        data: {
          app: mockReadOneData(),
        },
      }
    },
  },
}
