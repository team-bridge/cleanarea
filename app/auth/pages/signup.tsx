import { useRouter, BlitzPage, Routes } from "blitz"
import AuthPageLayout from "app/auth/layouts/AuthPageLayout"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <AuthPageLayout>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </AuthPageLayout>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
