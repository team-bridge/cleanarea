import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteArticle = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteArticle), resolver.authorize(), async ({ id }) => {
  //Soft Delete
  const article = await db.article.updateMany({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  })

  return article
})
