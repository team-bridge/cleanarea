import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetArticlesInput
  extends Pick<Prisma.ArticleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetArticlesInput) => {
  const {
    items: articles,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.article.count({ where }),
    query: (paginateArgs) =>
      db.article.findMany({ ...paginateArgs, where: { ...where, deletedAt: null }, orderBy }),
  })

  return {
    articles,
    nextPage,
    hasMore,
    count,
  }
})
