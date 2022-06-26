import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Header from "./components/layouts/Header";
import HomeScreen from "./screens/HomeScreen";

import { IconContext } from "react-icons";

function App() {

  return (
    <Router>
      <IconContext.Provider value={{ size: "4em", color: "white" }}>
        <AppProvider>
          <div className="App">
            <Header />
            <div className="app-container">
              <Switch>
                <Route path="/" component={HomeScreen} />
              </Switch>
            </div>
          </div>
        </AppProvider>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
