import { resolver } from "blitz"
import db from "db"
import { CreateBlizzardBattlenetAccountSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateBlizzardBattlenetAccountSchema),
  resolver.authorize(),
  async (input, ctx) => {
    const transactionResult = await db.$transaction(async (prisma) => {
      const blizzardBattlenetAccount = await prisma.blizzardBattlenetAccount.create({ data: input })
      const userRes = await prisma.user.updateMany({
        where: { id: ctx.session.userId, deletedAt: null },
        data: {
          blizzardBattlenetAccountId: blizzardBattlenetAccount.id,
        },
      })

      if (userRes.count) {
        throw new Error("account update fail: blizzardBattlenetAccountId is not set")
      }

      return blizzardBattlenetAccount
    })

    return transactionResult
  }
)
