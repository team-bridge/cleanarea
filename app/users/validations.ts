import { z } from "zod"

export const SetBattleTagValidation = z.object({
  battleTag: z.string().regex(/^[^\#]+#\d+$/g, "유효하지 않은 배틀패스 입니다."),
})
