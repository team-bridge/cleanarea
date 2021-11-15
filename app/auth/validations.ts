import { getErrorMessageByKey } from "app/lib/error"
import { z } from "zod"

const password = z.string().min(10).max(100)

export const Signup = z.object({
  email: z.string().email(getErrorMessageByKey("invalidEmail")),
  name: z
    .string()
    .min(3, getErrorMessageByKey("invalidNameLength"))
    .max(20, getErrorMessageByKey("invalidNameLength"))
    .regex(/^[가-힣0-9A-Z]{3,20}$/g, getErrorMessageByKey("invalidNameFormat")),
  password,
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
