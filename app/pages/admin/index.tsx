import AdminPageLayout from "app/admin/layouts/AdminPageLayout"
import { BlitzPage, Routes } from "blitz"

const AdminMainPage: BlitzPage = () => {
  return <>Hello Admin</>
}

AdminMainPage.redirectAuthenticatedTo = ({ session }) => {
  return session.role === "ADMIN" ? false : Routes.Home()
}

AdminMainPage.getLayout = (page) => <AdminPageLayout>{page}</AdminPageLayout>

export default AdminMainPage
