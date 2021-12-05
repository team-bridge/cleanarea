import { Image, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useState } from "react"
import { Box, Button, Divider, Grid } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import { FormInnerMarginStyle, FormInnerPaddingStyle, FormInnerStyle, InputStyle } from "./styles"
import battlenetSvg from "public/battlenet.svg"

import { EmailAlreadyExistsError } from "app/lib/error"

type SignupFormProps = {
  onSuccess?: () => void
}

const PHASE_SIGNIN_HOME = 0

export const SignupForm = (props: SignupFormProps) => {
  const [phase, setPhase] = useState<number>(PHASE_SIGNIN_HOME)
  const [signupMutation] = useMutation(signup)

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
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

          justifyContent: "center",
        }}
      >
        <Form
          name="create account"
          schema={Signup}
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error instanceof EmailAlreadyExistsError) {
                // This error comes from Prisma
                return { email: error.message }
              } else if (error.code === "P2002" && error.meta?.target?.includes("name")) {
                // This error comes from Prisma
                return { name: "이미 사용중인 닉네임이에요." }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <LabeledTextField
            name="name"
            label="닉네임"
            style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
          />
          <LabeledTextField
            name="email"
            label="이메일"
            style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
          />
          <LabeledTextField
            name="password"
            type="password"
            label="비밀번호"
            style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
          />
          <Button type="submit" size="large" variant="contained" style={FormInnerStyle}>
            회원가입
          </Button>
        </Form>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ m: 2 }}></Divider>
      <Box
        sx={{
          width: 350,
          mt: 2,
          mb: 2,

          fontSize: 16,

          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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
            <a href={"/api/auth/bnet"}>배틀넷으로 계속하기</a>
          </Box>
        </Button>
      </Box>
    </Grid>
  )
}

export default SignupForm
