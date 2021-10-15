import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateArticle = z.object({
  id: z.number(),
  content: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateArticle),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const article = await db.$transaction(async (prisma) => {
      const updateRes = await prisma.article.updateMany({ where: { id, deletedAt: null }, data })
      if (updateRes.count < 1) {
        throw new NotFoundError("article not found")
      }

      return await prisma.article.findUnique({ where: { id } })
    })

    if (!article) throw new NotFoundError("article not found")

    return article
  }
)
