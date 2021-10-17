import { AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateArticle } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateArticle),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const article = await db.$transaction(async (prisma) => {
      const article = await prisma.article.findFirst({ where: { id, deletedAt: null } })

      if (!article) throw new NotFoundError("article not found")
      if (article.userId !== ctx.session.userId) {
        throw new AuthorizationError("unauthorized user")
      }

      const updatedArticle = await prisma.article.update({ where: { id }, data })

      return updatedArticle
    })

    return article
  }
)
