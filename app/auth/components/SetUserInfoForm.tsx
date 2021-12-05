import { Box, Button, Divider, Grid } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import React from "react"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { SetUserInfo } from "../validations"
import { useMutation } from "blitz"
import signupWithBlizzard from "app/auth/mutations/signupWithBlizzard"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { FormInnerMarginStyle, FormInnerPaddingStyle, FormInnerStyle, InputStyle } from "./styles"
import { EmailAlreadyExistsError } from "app/lib/error"

type SetUserInfoFormFormProps = {
  onSuccess?: () => void
}

export const SetUserInfoForm: React.FC<SetUserInfoFormFormProps> = (props) => {
  const [setUserInfoMutation] = useMutation(signupWithBlizzard)
  return (
    <>
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
          <div>필수 정보를 입력해서 회원가입을 완료해주세요.</div> <br />
          <Form
            name="필수정보 입력"
            schema={SetUserInfo}
            initialValues={{ name: "", email: "" }}
            onSubmit={async (values) => {
              try {
                await setUserInfoMutation(values)
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
            <Button type="submit" size="large" variant="contained" style={FormInnerStyle}>
              가입 완료
            </Button>
          </Form>
        </Box>
      </Grid>
    </>
  )
}
