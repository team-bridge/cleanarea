import { resolver, NotFoundError } from "blitz"
import db from "db"
import { GetBlizzardBattlenetAccountByUserIdSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(GetBlizzardBattlenetAccountByUserIdSchema),
  resolver.authorize(),
  async ({ userId }) => {
    const user = await db.user.findFirst({
      where: { id: userId },
      include: {
        blizzardBattlenetAccount: true,
      },
    })

    if (!user?.blizzardBattlenetAccount) throw new NotFoundError()

    return user.blizzardBattlenetAccount
  }
)
