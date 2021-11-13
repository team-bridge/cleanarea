import { resolver } from "@blitzjs/core/server"
import { SetBattleTagValidation } from "../validations"

export default resolver.pipe(
  resolver.zod(SetBattleTagValidation),
  resolver.authorize(),
  async ({ battleTag }, ctx) => {}
)
