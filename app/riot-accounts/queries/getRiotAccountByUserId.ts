import { resolver, NotFoundError } from "blitz"
import db from "db"
import { GetRiotAccountByUserId } from "../validations"

export default resolver.pipe(resolver.zod(GetRiotAccountByUserId), async ({ userId }) => {
  const user = await db.user.findFirst({ where: { id: userId }, include: { riotAccount: true } })

  if (!user?.riotAccount) throw new NotFoundError()

  return user.riotAccount
})
