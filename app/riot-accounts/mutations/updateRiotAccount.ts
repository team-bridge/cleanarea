import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateRiotAccount = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateRiotAccount),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const riotAccount = await db.riotAccount.update({ where: { id }, data })

    return riotAccount
  }
)
