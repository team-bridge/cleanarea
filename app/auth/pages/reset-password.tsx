import React from "react"
import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import AuthPageLayout from "../layouts/AuthPageLayout"
import { Box } from "@mui/system"
import { blue, grey } from "@mui/material/colors"
import {
  FormInnerMarginStyle,
  FormInnerPaddingStyle,
  FormInnerStyle,
  InputStyle,
} from "../components/styles"
import { Button } from "@mui/material"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

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
            성공적으로 비밀번호가 초기화 되었어요.
            <br />
            <Link href={Routes.Home()}>여기</Link>를 눌러서 홈으로 이동하세요.
          </div>
        ) : (
          <Form
            schema={ResetPassword}
            initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
            onSubmit={async (values) => {
              try {
                await resetPasswordMutation(values)
              } catch (error: any) {
                if (error.name === "ResetPasswordError") {
                  return {
                    [FORM_ERROR]: error.message,
                  }
                } else {
                  return {
                    [FORM_ERROR]: "알 수 없는 오류가 발생했습니다.",
                  }
                }
              }
            }}
          >
            <LabeledTextField
              name="password"
              type="password"
              label="새로운 비밀번호"
              style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
            />

            <LabeledTextField
              name="passwordConfirmation"
              type="password"
              label="새로운 비밀번호 확인"
              style={{ ...InputStyle, ...FormInnerMarginStyle, ...FormInnerPaddingStyle }}
            />

            <Button type="submit" size="large" variant="contained" style={FormInnerStyle}>
              비빌번호 초기화
            </Button>
          </Form>
        )}
      </Box>
    </AuthPageLayout>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="비밀번호 초기화">{page}</Layout>

export default ResetPasswordPage
