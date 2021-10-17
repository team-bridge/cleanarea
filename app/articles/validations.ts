import { z } from "zod"

export const CreateArticle = z.object({
  content: z.string(),
})
