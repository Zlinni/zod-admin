import { z } from 'zod'

export const schema = z.object({
  file: z.instanceof(File).optional().describe('单文件上传'),
  multipleFile: z
    .array(z.instanceof(File).optional())
    .describe('多文件上传')
    .default([]),
})
