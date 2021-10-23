import { resolver } from "blitz"
import db from "db"
import { CreateRiotAccount } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateRiotAccount),
  resolver.authorize(),
  async (input) => {
    const riotAccount = await db.riotAccount.create({ data: input })

    return riotAccount
  }
)
