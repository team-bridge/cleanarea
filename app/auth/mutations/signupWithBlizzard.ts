import { resolver } from "@blitzjs/core/server"
import { EmailAlreadyExistsError } from "app/lib/error"
import { BlizzardAccountNotExists } from "app/lib/error/error-class/blizzard-account-not-exists.error"
import db from "db"
import { Role } from "types"
import { SetUserInfo } from "../validations"

export default resolver.pipe(resolver.zod(SetUserInfo), async ({ email, name }, ctx) => {
  const loginEmail = email.toLowerCase().trim()

  const privateData = await ctx.session.$getPrivateData()

  const user = await db.$transaction(async (prisma) => {
    const existsUser = await prisma.user.findFirst({
      where: {
        email: loginEmail,
        deletedAt: null,
      },
    })

    if (existsUser) {
      throw new EmailAlreadyExistsError()
    }

    const blizzardBattlenetAccount = await prisma.blizzardBattlenetAccount.findFirst({
      where: {
        id: privateData.blizzardBattlenetAccountId,
      },
    })

    if (!blizzardBattlenetAccount) {
      throw new BlizzardAccountNotExists()
    }

    const upsertUserData = {
      email: loginEmail,
      name: name.toUpperCase(),
      role: "USER",
      blizzardBattlenetAccountId: blizzardBattlenetAccount.id,
      deletedAt: null,
    }

    const user = await prisma.user.upsert({
      where: {
        email: loginEmail,
      },
      create: upsertUserData,
      update: upsertUserData,
      select: { id: true, name: true, email: true, role: true, blizzardBattlenetAccountId: true },
    })

    return user
  })

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    battleTagId: user.blizzardBattlenetAccountId,
  })

  return user
})
