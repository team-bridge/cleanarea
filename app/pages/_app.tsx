import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"

import React from "react"

import "app/core/styles/index.css"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const getLayout = Component.getLayout || ((page) => page)
  const onReset = useQueryErrorResetBoundary()

  const objects = { ...Component, ...pageProps }
  const keys = Object.keys(objects)

  if (router.pathname.indexOf("/admin") !== -1) {
    return <></> // admin page
  } else {
    return (
      <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={onReset.reset}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    )
  }
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return <ErrorComponent statusCode={error.statusCode} title="권한이 없습니다." />
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
