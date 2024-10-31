import { z } from 'zod'

enum Options {
  选项1 = 'option1',
  选项2 = 'option2',
  选项3 = 'option3',
}
export const schema = z.object({
  select: z
    .nativeEnum(Options)
    .optional()
    .describe('选择器')
    .default('option1'),
})
