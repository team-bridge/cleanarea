import { z } from "zod"

export const CreateArticle = z.object({
  content: z.string(),
})

export const UpdateArticle = z.object({
  id: z.number(),
  content: z.string(),
})
