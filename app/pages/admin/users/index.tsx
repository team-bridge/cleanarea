import AdminPageLayout from "app/admin/layouts/AdminPageLayout"
import { BlitzPage, Routes } from "blitz"

const UserListPage: BlitzPage = () => {
  return <></>
}

UserListPage.redirectAuthenticatedTo = ({ session }) => {
  return session.role === "ADMIN" ? false : Routes.Home()
}

UserListPage.getLayout = (page) => <AdminPageLayout>{page}</AdminPageLayout>

export default UserListPage
