import { SetUserInfoForm } from "app/auth/components/SetUserInfoForm"
import AuthPageLayout from "app/auth/layouts/AuthPageLayout"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Routes, useRouter } from "blitz"

const SetUserInfoPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <AuthPageLayout>
        <SetUserInfoForm onSuccess={() => router.push(Routes.Home())} />
      </AuthPageLayout>
    </>
  )
}

SetUserInfoPage.redirectAuthenticatedTo = "/"
SetUserInfoPage.getLayout = (page) => <Layout>{page}</Layout>

export default SetUserInfoPage
