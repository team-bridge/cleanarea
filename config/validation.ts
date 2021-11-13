import { z } from "zod"

const environmentConfig = z
  .object({
    DATABASE_URL: z.string().url(),
    SESSION_SECRET_KEY: z.string().min(32).optional(),
    PORT: z
      .string()
      .regex(/^\d+$/)
      .default("3000")
      .transform((x) => Number(x)),

    BLIZAARD_CLIENT_SECRET: z.string(),
    BLITZ_PUBLIC_BLIZAARD_CLIENT_ID: z.string(),
    APP_BASE_URL: z.string().url(),
  })
  .parse(process.env)

export const getConstant = () => {
  return environmentConfig
}
