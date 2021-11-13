import to from "await-to-js"
import { AuthenticationError, passportAuth, PublicData, RedirectError } from "blitz"
import { getConstant } from "config"
import db from "db"
import BnetStrategey from "passport-bnet"
import { Role } from "types"

export default passportAuth(({ ctx }) => {
  const userId = ctx.session.userId

  return {
    successRedirectUrl: "/",
    errorRedirectUrl: "/users/auth-failed",
    strategies: [
      {
        strategy: new BnetStrategey(
          {
            clientID: getConstant().BLITZ_PUBLIC_BLIZAARD_CLIENT_ID,
            clientSecret: getConstant().BLIZAARD_CLIENT_SECRET,
            callbackURL: `${getConstant().APP_BASE_URL}/api/auth/bnet/callback`,
            region: "kr",
          },
          async (
            accessToken,
            refreshToken,
            profile: {
              sub: string
              id: number
              battletag: string
              provider: string
              token: string
            },
            done
          ) => {
            if (!userId) {
              const blizzardBattlenetAccount = await db.blizzardBattlenetAccount.upsert({
                where: {
                  battlenetId: profile.id,
                },
                create: {
                  battlenetId: profile.id,
                  battleTag: profile.battletag,
                },
                update: {
                  battlenetId: profile.id,
                  battleTag: profile.battletag,
                },
              })

              const user = await db.user.findFirst({
                where: {
                  blizzardBattlenetAccountId: blizzardBattlenetAccount.id,
                },
              })

              if (user) {
                const publicData: PublicData = {
                  userId: user.id,
                  role: user.role as Role,
                  battleTagId: user.blizzardBattlenetAccountId,
                }
                done(null, { publicData })
                return
              }

              await ctx.session.$setPrivateData({
                blizzardBattlenetAccountId: blizzardBattlenetAccount.id,
              })

              done(new RedirectError("/users/set-user-info"))

              return
            }

            const [err, user] = await to(
              db.$transaction(async (prisma) => {
                const user = await prisma.user.findFirst({
                  where: { id: userId, deletedAt: null },
                })

                if (!user) {
                  throw new Error("User not found in BnetStrategey")
                }

                const blizzardBattlenetAccount = await prisma.blizzardBattlenetAccount.upsert({
                  where: {
                    battlenetId: profile.id,
                  },
                  create: {
                    battlenetId: profile.id,
                    battleTag: profile.battletag,
                  },
                  update: {
                    battlenetId: profile.id,
                    battleTag: profile.battletag,
                  },
                })

                return await prisma.user.update({
                  where: { id: user.id },
                  data: { blizzardBattlenetAccountId: blizzardBattlenetAccount.id },
                })
              })
            )

            if (err || !user) {
              done(err, user)
              return
            }

            const publicData: PublicData = {
              userId: user.id,
              role: user.role as Role,
              battleTagId: user.blizzardBattlenetAccountId,
            }

            done(null, { publicData })
          }
        ),
      },
    ],
  }
})
