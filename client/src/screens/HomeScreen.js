import { Button } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./HomeScreen.scss";

function HomeScreen(props) {
  const { login, logOut } = useContext(AppContext);
  return (
    <div id="home-screen">
      <div
        className="login-area d-flex justify-content-center align-items-center"
        style={{ width: "100%", minHeight: "300px", background: "#222" }}
      >
        <Button onClick={login}>Moralis Login</Button>
        <Button onClick={logOut}>Moralis Logout</Button>
      </div>
    </div>
  );
}

export default HomeScreen;
