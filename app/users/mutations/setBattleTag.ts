import { resolver } from "blitz"
import { SetBattleTagValidation } from "../validations"

export default resolver.pipe(
  resolver.zod(SetBattleTagValidation),
  resolver.authorize(),
  async ({ battleTag }, ctx) => {}
)
