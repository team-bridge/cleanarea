import { BlitzPage, Router, useMutation } from "blitz"
import AuthPageLayout from "app/auth/layouts/AuthPageLayout"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { blue, grey } from "@mui/material/colors"
import React from "react"
import { Box, Button } from "@mui/material"
import {
  FormInnerMarginStyle,
  FormInnerPaddingStyle,
  FormInnerStyle,
  InputStyle,
} from "../components/styles"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <AuthPageLayout>
      <Box
        sx={{
          width: 400,
          mt: 2,
          mb: 2,
          padding: 5,
          border: `1px solid ${blue[500]}33`,
          borderRadius: 3,
          fontSize: 16,
          backgroundColor: `${grey[100]}`,
        }}
      >
        {isSuccess ? (
          <div>
            입력하신 이메일로 비밀번호 초기화할 수 있는 링크를 전송했어요.
            <Button
              size="large"
              variant="contained"
              style={FormInnerStyle}
              onClick={() => Router.push("/")}
            >
              홈으로 가기
            </Button>
          </div>
        ) : (
          <Form
            schema={ForgotPassword}
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await forgotPasswordMutation(values)
              } catch (error: any) {
                return {
                  [FORM_ERROR]: "알 수 없는 오류가 발생했습니다.",
                }
              }
            }}
          >
            <LabeledTextField
              name="email"
              // type="email"
              placeholder="이메일"
              label="비밀번호를 잊으셨나요? 이메일을 입력해주세요"
              style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
            />
            <Button type="submit" size="large" variant="contained" style={FormInnerStyle}>
              비빌번호 찾기
            </Button>
          </Form>
        )}
      </Box>
    </AuthPageLayout>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="비밀번호 찾기">{page}</Layout>

export default ForgotPasswordPage
