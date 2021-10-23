import { z } from "zod"

export const CreateRiotAccount = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
})

export const GetRiotAccountByUserId = z.object({
  userId: z.number(),
})
