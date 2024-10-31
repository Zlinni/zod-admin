import { z } from 'zod'

export const options = ['option1', 'option2', 'option3'] as const

export const schema = z.object({
  dataFromOutSide: z.string().describe('数据来自于实时请求'),
  dataWithArrayObjectFromOutSide: z
    .array(
      z.object({
        option1: z.enum(options).describe('选项1'),
        option2: z.string().describe('选项2(选项2的值来自于选项1)'),
      })
    )
    .describe('嵌套数组中对象数据传递'),
})
