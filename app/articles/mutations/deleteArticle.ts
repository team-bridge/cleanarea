import { AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteArticle = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteArticle),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const article = await db.article.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!article) throw new NotFoundError("article not found")
    if (article.userId !== ctx.session.userId) {
      throw new AuthorizationError("unauthorized user")
    }

    //Soft Delete
    const updatedArticle = await db.article.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    })

    return updatedArticle
  }
)
