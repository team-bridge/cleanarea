import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateArticle = z.object({
  content: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateArticle),
  resolver.authorize(),
  async (input, ctx) => {
    const article = await db.article.create({
      data: {
        content: input.content,
        userId: ctx.session.userId,
      },
    })

    return article
  }
)
