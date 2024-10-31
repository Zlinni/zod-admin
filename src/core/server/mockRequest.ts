import Mock, { type MockjsRequestOptions } from 'mockjs'
import { loginEntity } from './module/login/loginEntity'
import { tableEntity } from './module/table/tableEntity'

const modules = [tableEntity, loginEntity]
Mock.setup({
  timeout: '200-600',
})
modules.forEach((module) => {
  Object.keys(module).forEach((key) => {
    const { url, type, cb } = module[key]
    // 用正则是因为直接写地址的话 后续的?xxx=就匹配不到
    Mock.mock(new RegExp(url), type, (opts: MockjsRequestOptions) => {
      return Mock.mock(cb(opts))
    })
  })
})
