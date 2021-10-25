import { AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"
import { UpdateBlizzardBattlenetAccountSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateBlizzardBattlenetAccountSchema),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const blizzardBattlenetAccount = await db.$transaction(async (prisma) => {
      const user = await prisma.user.findFirst({
        where: { id: ctx.session.userId, deletedAt: null },
      })

      if (!user?.blizzardBattlenetAccountId) {
        throw new NotFoundError()
      } else if (user.blizzardBattlenetAccountId !== id) {
        throw new AuthorizationError()
      }

      const blizzardBattlenetAccount = await prisma.blizzardBattlenetAccount.update({
        where: { id: user.blizzardBattlenetAccountId },
        data,
      })

      return blizzardBattlenetAccount
    })

    return blizzardBattlenetAccount
  }
)
