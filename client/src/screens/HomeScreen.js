import { Button } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PetItem from "../components/pet/PetItem";
import { AppContext } from "../context/AppContext";

function HomeScreen(props) {
  const { login, pets, userId, exp } = useContext(AppContext);
  const history = useHistory();

  return (
    <div id="home-screen">
      <div
        className="poster d-flex justify-content-center align-items-center"
        style={{
          width: "100%",
          minHeight: "500px",
        }}
      >
        <div className="place-holder"></div>
        <div className="exp">Exp: {exp}</div>
        {userId ? (
          <Button
            size="large"
            shape="round"
            type="primary"
            danger
            ghost
            onClick={() => {
              history.push("/mission");
            }}
          >
            Let's go
          </Button>
        ) : (
          <Button
            size="large"
            shape="round"
            type="primary"
            ghost
            onClick={login}
          >
            Moralis Login
          </Button>
        )}
      </div>

      <div className="list-pet d-flex justify-content-between">
        {pets.map((item, index) => {
          return <PetItem data={item} key={index} id={index} />;
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
