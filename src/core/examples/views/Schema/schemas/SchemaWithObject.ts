import { z } from 'zod'

export const schema = z.object({
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
    })
    .default({
      street: '',
      city: '',
      zip: '',
    }),
})
