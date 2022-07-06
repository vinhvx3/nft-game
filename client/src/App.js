import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import HomeScreen from "./screens/HomeScreen";

import { IconContext } from "react-icons";
import { Breadcrumb, Layout, Menu } from "antd";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ size: "2em", color: "white" }}>
        <AppProvider>
          <Layout className="layout">
            <Layout.Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={new Array(4).fill(null).map((_, index) => {
                  const key = index + 1;
                  return {
                    key,
                    label: `nav ${key}`,
                  };
                })}
              />
            </Layout.Header>
            <Layout.Content className="site-layout" style={{ marginTop: 64 }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">
                <Switch>
                  <Route path="/" component={HomeScreen} />
                </Switch>
              </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Layout.Footer>
          </Layout>
        </AppProvider>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
