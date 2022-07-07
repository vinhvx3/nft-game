import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import HomeScreen from "./screens/HomeScreen";

import { IconContext } from "react-icons";
import { Layout } from "antd";
import Header from "./components/layouts/Header";
import MissionScreen from "./screens/MissionScreen";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ size: "2em", color: "white" }}>
        <AppProvider>
          <Layout className="layout">
            <Header />
            <Layout.Content className="site-layout">
              <div className="site-layout-content">
                <Switch>
                  <Route path="/mission" component={MissionScreen} />
                  <Route path="/" component={HomeScreen} />
                </Switch>
              </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: "center" }}>
              NFT Game ©2022 Created by VXV team
            </Layout.Footer>
          </Layout>
        </AppProvider>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
