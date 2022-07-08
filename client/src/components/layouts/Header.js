import React from "react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  HomeOutlined,
  CodeSandboxOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import logo from "../../static/icon/logo.png";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  const { userId, logOut } = useContext(AppContext);

  return (
    <Layout.Header>
      <Row>
        <Col span={3}>
          <div className="logo">
            <img src={logo} alt="logo" style={{ height: 40 }} />
          </div>
        </Col>

        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item
              key="home"
              icon={<HomeOutlined />}
              onClick={() => history.push("/")}
            >
              Home
            </Menu.Item>
            <Menu.Item
              key="missions"
              icon={<CodeSandboxOutlined />}
              onClick={() => history.push("/mission")}
            >
              Missions
            </Menu.Item>
            <Menu.Item
              key="document"
              icon={<FileTextOutlined />}
              onClick={() => history.push("/document")}
            >
              Document
            </Menu.Item>
          </Menu>
        </Col>

        <Col span={3}>
          {userId && (
            <Button
              size="large"
              shape="round"
              type="primary"
              ghost
              onClick={logOut}
            >
              Logout
            </Button>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default Header;
