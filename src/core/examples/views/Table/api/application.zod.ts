import type { ExtractAPITypes } from '@/core/utils/types'
import { z } from 'zod'

// 字典
const Dict = {
  fieldType: {
    全部类型: '',
    应用全称: 'app_ch_name',
  },
} as const

// 实体
export const EntitySchema = {
  app: z.object({
    id: z.string().describe('ID'),
    app_ch_name: z.string().describe('应用全称'),
    app_name: z.string().describe('应用简称'),
    app_producer: z.string().describe('制作人/开发商'),
    client_id: z.string(),
    created_at: z.coerce.date().describe('创建时间'),
    updated_at: z.coerce.date().describe('更新时间'),
  }),
}

// 接口
export const APISchema = {
  readList: {
    DTO: z.object({
      fieldType: z
        .nativeEnum(Dict.fieldType)
        .optional()
        .default(Dict.fieldType.全部类型),
      fieldValue: z.string().optional().default(''),
      page: z.number().default(1),
      size: z.number().default(20),
    }),
    VO: z.object({
      apps: z.array(EntitySchema.app),
      page: z.number(),
      size: z.number(),
      total_size: z.number(),
    }),
  },
  readOne: {
    DTO: EntitySchema.app.pick({
      id: true,
    }),
    VO: z.object({
      app: EntitySchema.app,
    }),
  },
  createOne: {
    DTO: EntitySchema.app.pick({
      app_ch_name: true,
      app_name: true,
      app_producer: true,
    }),
    VO: z.object({
      app: EntitySchema.app,
    }),
  },
  deleteOne: {
    DTO: EntitySchema.app.pick({
      id: true,
    }),
  },
  updateOne: {
    DTO: EntitySchema.app.pick({
      id: true,
      app_name: true,
      app_producer: true,
    }),
  },
}

// 类型
export type APITypes = ExtractAPITypes<typeof APISchema>
