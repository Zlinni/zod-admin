import { z } from 'zod'

const options = ['option1', 'option2', 'option3'] as const

export const schema = z.object({
  number: z.coerce.number().optional().describe('数字输入').default(0),
  fallback: z.string().optional().describe('文本输入').default(''),
  textarea: z.string().optional().describe('文本输入2').default(''),
  checkbox: z.boolean().optional().describe('复选框').default(false),
  switch: z.boolean().optional().describe('开关').default(false),
  date: z.coerce
    .date()
    .optional()
    .describe('日期选择器')
    .default(new Date().valueOf() as unknown as Date),
  select: z.enum(options).optional().describe('选择器').default('option1'),
  multipleSelect: z
    .array(z.enum(['yellow', 'blue', 'pink']))
    .describe('多项选择器')
    .default([]),
  radio: z.enum(options).optional().describe('单选').default('option1'),
  file: z.instanceof(File).optional().describe('单文件上传'),
})
