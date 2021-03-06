import { Card, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function MissionScreen(props) {
  const history = useHistory();
  const { pets, missions, setPetsMission, exp } = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const [maxChoose, setMaxChoose] = useState(0);
  const [arrChoose, setArrChoose] = useState([]);
  const [missionIndex, setMissionIndex] = useState();

  function openModalChoose(index) {
    setArrChoose([]);
    setMissionIndex(index);
    setMaxChoose(missions[index].maxChoose);
    setVisible(true);
  }

  function choosePet(id) {
    if (arrChoose.includes(id)) {
      return;
    }

    let arr = [...arrChoose];
    if (arrChoose.length >= maxChoose) {
      arr = arr.slice(1);
    }

    arr.push(id);
    setArrChoose(arr);
  }

  function goFight() {
    if (!arrChoose.length) {
      return;
    }
    setVisible(false);
    setPetsMission(arrChoose);
    history.push("/fight/" + missionIndex);
  }

  return (
    <div id="mission-screen">
      <div
        className="poster d-flex justify-content-center align-items-center"
        style={{
          width: "100%",
          minHeight: "400px",
        }}
      >
        <div className="place-holder"></div>
        <div className="exp">Exp: {exp}</div>
        <div className="message">
          <div className="chat">
            Chọn một nhiệm vụ phù hợp để hoàn thành và nhận thưởng.
          </div>
        </div>
      </div>

      <div className="list-mission d-flex justify-content-between">
        {missions.map((item, index) => {
          return (
            <Card
              key={index}
              hoverable
              style={{ width: 240, height1: 100 }}
              cover={<img alt={item.name} src={item.poster} />}
              onClick={() => openModalChoose(index)}
            >
              <Card.Meta
                title={item.name}
                description={item.round + " round."}
              />
            </Card>
          );
        })}
      </div>

      <Modal
        title="Choose your pet"
        centered
        visible={visible}
        onOk={() => goFight()}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <div className="d-flex justify-content-around px-5">
          {pets
            .filter((i) => {
              const date = new Date();
              return (
                i.isLock === 0 && date.getTime() < i.lastMeal + i.endurance
              );
            })
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    arrChoose.includes(index)
                      ? "item-picker actived"
                      : "item-picker"
                  }
                  onClick={() => choosePet(index)}
                >
                  <img src={item.avatar} alt={item.name} />
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
}

export default MissionScreen;
