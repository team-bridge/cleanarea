import { ReactNode } from "react"
import Box from "@mui/material/Box"
import { blue } from "@mui/material/colors"
import { Image } from "blitz"
import logo from "public/logo.png"

type AuthPageLayoutProps = {
  children: ReactNode
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mt: 2,
            width: 250,
          }}
        >
          <Image src={logo} alt="blitzjs" />
        </Box>
        {children}
      </Box>
    </Box>
  )
}

export default AuthPageLayout
