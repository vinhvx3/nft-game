import React from "react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Header(props) {
  const { userId, logOut } = useContext(AppContext);

  return (
    <Layout.Header>
      <Row>
        <Col span={3}>
          <div className="logo" />
        </Col>

        <Col span={18}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={new Array(4).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Col>

        <Col span={3}>{userId && <Button onClick={logOut}>Logout</Button>}</Col>
      </Row>
    </Layout.Header>
  );
}

export default Header;
