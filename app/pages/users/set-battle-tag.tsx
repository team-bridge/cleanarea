import { BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

const SetBattleTag: BlitzPage = () => {
  return <></>
}

SetBattleTag.authenticate = true
SetBattleTag.redirectAuthenticatedTo = ({ session }) => {
  if (session.battleTagId) {
    return Routes.Home()
  }

  return false
}

SetBattleTag.getLayout = (page) => <Layout title={"배틀태그 설정"}>{page}</Layout>

export default SetBattleTag
