import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { blue } from "@mui/material/colors"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { FormInnerMarginStyle, FormInnerPaddingStyle, FormInnerStyle, InputStyle } from "./styles"
import { useState } from "react"

import { default as MuiLink } from "@mui/material/Link"
import { Divider } from "@mui/material"

type LoginFormProps = {
  onSuccess?: () => void
}

const PHASE_REQUIRE_EMAIL = 0
const PHASE_REQUIRE_PASSWORD = 1

export const LoginForm = (props: LoginFormProps) => {
  const [phase, setPhase] = useState<number>(PHASE_REQUIRE_EMAIL)
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
          fontSize: 10,
        }}
      >
        <Form
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
            {phase === PHASE_REQUIRE_EMAIL ? (
              <a>
                청정구역에 로그인 또는&nbsp;
                <Link href={Routes.SignupPage()}>
                  <MuiLink>회원가입</MuiLink>
                </Link>
              </a>
            ) : (
              <MuiLink href="#" onClick={() => setPhase(PHASE_REQUIRE_EMAIL)}>
                뒤로
              </MuiLink>
            )}
            <LabeledTextField
              name="email"
              // type="email"
              placeholder="이메일"
              outerProps={{
                style: {
                  display: phase === PHASE_REQUIRE_EMAIL ? "unset" : "none",
                },
              }}
              style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
            />
            {phase === PHASE_REQUIRE_PASSWORD ? (
              <>
                <LabeledTextField
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
                />
                <a>
                  비밀번호를 잊어버리셨습니까? &nbsp;
                  <Link href={Routes.ForgotPasswordPage()}>
                    <MuiLink>비밀번호 찾기</MuiLink>
                  </Link>
                </a>
              </>
            ) : null}
            {phase === PHASE_REQUIRE_EMAIL ? (
              <Button
                type="button"
                size="small"
                variant="contained"
                onClick={() => {
                  setPhase(PHASE_REQUIRE_PASSWORD)
                }}
                style={FormInnerStyle}
              >
                계속
              </Button>
            ) : (
              <Button type="submit" size="small" variant="contained" style={FormInnerStyle}>
                로그인
              </Button>
            )}
            <Divider>또는</Divider>
            <Button type="button" size="small" variant="contained" style={FormInnerStyle}>
              <Link href="#">블리자드로 로그인</Link>
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default LoginForm
