import { z } from 'zod'

export enum Lanugage {
  '简中' = 'CN',
  '繁中' = 'CN-T',
  '英语' = 'EN',
  '日语' = 'JA',
  '韩语' = 'KO',
}
export const schema = z.object({
  i18n: z
    .array(
      z.object({
        language: z
          .nativeEnum(Lanugage)
          .describe('语言类型')
          .default(Lanugage.简中),
        title: z.string().describe('语言标题').default(''),
        content: z.string().describe('语言内容').default(''),
      })
    )
    .describe('多语言'),
})
