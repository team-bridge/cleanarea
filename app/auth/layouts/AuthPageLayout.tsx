import React, { ReactNode } from "react"
import Box from "@mui/material/Box"
import { Image, Link, Routes } from "blitz"
import logo from "public/logo.png"
import bgPattern from "public/bg-pattern.png"

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
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `repeat top url(${bgPattern.src})`,
          backgroundSize: "18%",
          zIndex: -1,
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mt: 4,
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Link href={Routes.Home()}>
            <a>
              <Box
                sx={{
                  width: 280,
                  padding: 4,
                }}
                style={{
                  backdropFilter: "blur(2px)",
                }}
              >
                <Image src={logo} alt="청정구역" />
              </Box>
            </a>
          </Link>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}

export default AuthPageLayout
