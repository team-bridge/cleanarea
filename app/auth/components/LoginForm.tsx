import { AuthenticationError, Link, useMutation, Routes, Image, Router } from "blitz"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { blue, grey } from "@mui/material/colors"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { FormInnerMarginStyle, FormInnerPaddingStyle, FormInnerStyle, InputStyle } from "./styles"
import { useState } from "react"
import battlenetSvg from "public/battlenet.svg"

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
          width: 350,
          mt: 2,
          mb: 2,
          padding: 5,
          border: `1px solid ${blue[500]}33`,
          borderRadius: 3,
          fontSize: 16,
          backgroundColor: `${grey[100]}`,
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
                ??????????????? ????????? ??????&nbsp;
                <Link href={Routes.SignupPage()}>
                  <MuiLink>????????????</MuiLink>
                </Link>
              </a>
            ) : (
              <MuiLink href="#" onClick={() => setPhase(PHASE_REQUIRE_EMAIL)}>
                ??????
              </MuiLink>
            )}
            <LabeledTextField
              name="email"
              // type="email"
              placeholder="?????????"
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
                  placeholder="????????????"
                  style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
                />
                <a>
                  ??????????????? ?????????????????????????&nbsp;
                  <Link href={Routes.ForgotPasswordPage()}>
                    <MuiLink>??????</MuiLink>
                  </Link>
                </a>
              </>
            ) : null}
            {phase === PHASE_REQUIRE_EMAIL ? (
              <Button
                type="button"
                size="large"
                variant="contained"
                onClick={() => {
                  setPhase(PHASE_REQUIRE_PASSWORD)
                }}
                style={FormInnerStyle}
              >
                ??????
              </Button>
            ) : (
              <Button type="submit" size="large" variant="contained" style={FormInnerStyle}>
                ?????????
              </Button>
            )}
            <Button
              size="large"
              variant="contained"
              style={FormInnerStyle}
              onClick={() => Router.push("/reset-password")}
            >
              ???????????? ?????????
            </Button>
            <Divider>??????</Divider>
            <Button type="button" size="large" variant="contained" style={FormInnerStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "space-around",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    mr: 1,
                  }}
                >
                  <Image src={battlenetSvg} alt="battlenet" />
                </Box>
                <a href="/api/auth/bnet">??????????????? ????????????</a>
              </Box>
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default LoginForm
