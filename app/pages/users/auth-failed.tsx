import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import queryString from "query-string"

export const getServerSideProps = async ({ req }) => {
  const qs = queryString.parse(req.url.split("?")[1])
  if (typeof qs?.authError === "string" && qs.authError.split(": ")[1]) {
    return {
      redirect: {
        destination: qs.authError.split(": ")[1],
        permanent: false,
      },
    }
  }
  return { props: {} }
}

const AuthFailedPage: BlitzPage = () => {
  return <></>
}

AuthFailedPage.getLayout = (page) => <Layout>{page}</Layout>

export default AuthFailedPage
