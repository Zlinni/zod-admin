import type { MockjsRequestOptions } from 'mockjs'

export type MockEntity = Record<
  string,
  {
    url: string | RegExp
    type: string
    cb: (options: MockjsRequestOptions) => any
  }
>
