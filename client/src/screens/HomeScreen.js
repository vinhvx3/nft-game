import { Button } from "antd";
import React, { useContext } from "react";
import PetItem from "../components/pet/PetItem";
import { AppContext } from "../context/AppContext";
import "./HomeScreen.scss";

function HomeScreen(props) {
  const { login, pets } = useContext(AppContext);
  return (
    <div id="home-screen">
      <div className="login-area d-flex justify-content-center align-items-center" style={{ width: "100%", minHeight: "300px", background: "#222" }}>
        <Button onClick={login}>Moralis Login</Button>
      </div>

      <div className="list-pet d-flex">
        {pets.map((item, index) => {
          return <PetItem data={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
