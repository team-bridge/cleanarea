import React, { useState } from "react"
import { ReactNode } from "react"
import { Layout, Menu } from "antd"
import { Head, Link } from "blitz"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons"

import { Content, Footer, Header } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
require("app/core/styles/antd.less")

const AdminPageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
      <Head>
        <title>청정구역 어드민</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/svg-with-js.min.css"
        />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>청정구역 어드민</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default AdminPageLayout
