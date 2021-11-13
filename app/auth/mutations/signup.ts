import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { EmailAlreadyExistsError } from "app/lib/error"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const loginEmail = email.toLowerCase().trim()

  const upsertUserData = {
    email: loginEmail,
    hashedPassword,
    role: "USER",
    deletedAt: null,
  }

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
