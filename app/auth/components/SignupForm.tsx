import { Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useState } from "react"
import { Box, Button, Divider, Grid } from "@mui/material"
import { blue } from "@mui/material/colors"
import { FormInnerMarginStyle, FormInnerPaddingStyle, FormInnerStyle, InputStyle } from "./styles"

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
          width: 250,
          mt: 2,
          mb: 2,
          padding: 2,
          border: `1px solid ${blue[500]}33`,
          borderRadius: 2,
          fontSize: 10,
          backgroundColor: `${blue[100]}33`,

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
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
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
          <Button type="submit" size="small" variant="contained" style={FormInnerStyle}>
            회원가입
          </Button>
        </Form>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ m: 2 }}></Divider>
      <Box
        sx={{
          width: 250,
          mt: 2,
          mb: 2,
          fontSize: 10,

          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button type="button" size="small" variant="contained" style={FormInnerStyle}>
          <Link href="#">블리자드로 회원가입</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default SignupForm
