import { z } from 'zod'

export const schema = z.object({
  label: z.string().default(''),
})
