import { getErrorMessageByKey } from "app/lib/error"
import { z } from "zod"

const password = z
  .string({
    required_error: getErrorMessageByKey("requiredPassword"),
    invalid_type_error: getErrorMessageByKey("invalidPassword"),
  })
  .min(10, getErrorMessageByKey("invalidPasswordMinLength"))
  .max(100, getErrorMessageByKey("invalidPasswordMaxLength"))
const name = z
  .string({
    required_error: getErrorMessageByKey("requiredName"),
    invalid_type_error: getErrorMessageByKey("invalidName"),
  })
  .min(3, getErrorMessageByKey("invalidNameLength"))
  .max(20, getErrorMessageByKey("invalidNameLength"))
  .regex(/^[가-힣0-9A-Z]{3,20}$/g, getErrorMessageByKey("invalidNameFormat"))

const email = z
  .string({
    required_error: getErrorMessageByKey("requiredEmail"),
    invalid_type_error: getErrorMessageByKey("invalidEmail"),
  })
  .email(getErrorMessageByKey("invalidEmail"))

export const Signup = z.object({
  email,
  name,
  password,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
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
  currentPassword: z.string({
    required_error: getErrorMessageByKey("requiredPassword"),
    invalid_type_error: getErrorMessageByKey("invalidPassword"),
  }),
  newPassword: password,
})

export const SetUserInfo = z.object({ email, name })
