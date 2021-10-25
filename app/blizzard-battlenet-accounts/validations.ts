import { z } from "zod"

export const GetBlizzardBattlenetAccountByUserIdSchema = z.object({
  userId: z.number(),
})

export const UpdateBlizzardBattlenetAccountSchema = z.object({
  id: z.number(),
  battleTag: z.string(),
})

export const CreateBlizzardBattlenetAccountSchema = z.object({
  battleTag: z.string(),
})
