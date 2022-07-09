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

  const items = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Missions",
      key: "missions",
      icon: <CodeSandboxOutlined />,
    },
    {
      label: "Document",
      key: "document",
      icon: <FileTextOutlined />,
    },
  ];

  function handleMenu(e) {
    switch (e.key) {
      case "home":
        history.push("/");
        break;

      case "missions":
        history.push("/mission");
        break;

      case "document":
        history.push("/document");
        break;

      default:
        break;
    }
  }

  return (
    <Layout.Header id="header">
      <Row>
        <Col span={3}>
          <div className="logo">
            <img src={logo} alt="logo" style={{ height: 40 }} />
          </div>
        </Col>

        <Col span={18}>
          <Menu
            onClick={handleMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={items}
          ></Menu>
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
