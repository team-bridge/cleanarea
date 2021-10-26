import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { blue } from "@mui/material/colors"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <>
      <Box
        sx={{
          width: 250,
          mt: 2,
          mb: 2,
          padding: 2,
          border: `1px solid ${blue[500]}`,
          borderRadius: 2,
        }}
      >
        <Form
          submit={"로그인"}
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <Button type="submit" size="small" variant="contained">
              로그인
            </Button>
          </Box>
        </Form>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          color: blue[900],
        }}
      >
        <Link href={Routes.ForgotPasswordPage()}>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            비밀번호 찾기
          </Button>
        </Link>
        <Link href={Routes.SignupPage()}>
          <Button size="small" variant="outlined">
            회원가입
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default LoginForm
