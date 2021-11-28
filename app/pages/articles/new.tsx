import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
// import Layout from "app/core/layouts/Layout"
// import createArticle from "app/articles/mutations/createArticle"
// import { ArticleForm, FORM_ERROR } from "app/articles/components/ArticleForm"
// import { CreateArticle } from "app/articles/validations"

console.log(123)

const NewArticlePage: BlitzPage = () => {
  const router = useRouter()
  // const [createArticleMutation] = useMutation(createArticle)

  return (
    <>
      <div>
        <h1>Create New Article</h1>
        123123
        {/* <ArticleForm
          schema={CreateArticle}
          onSubmit={async (values) => {
            try {
              const article = await createArticleMutation(values)
              router.push(Routes.ShowArticlePage({ articleId: article.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        /> */}
        <p>{/* <Link href={Routes.ArticlesPage()}>Articles</Link> */}</p>
      </div>
    </>
  )
}

// NewArticlePage.authenticate = true
// NewArticlePage.getLayout = (page) => <Layout title={"Create New Article"}>{page}</Layout>

export default NewArticlePage
