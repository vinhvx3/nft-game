import { Card, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import mission1 from "../static/image/mission-1.jpg";

const missions = [
  {
    name: "Tân thủ",
    description: "1 round",
    poster: mission1,
    maxChoose: 2,
  },
];

function MissionScreen(props) {
  const history = useHistory();
  const { pets } = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const [maxChoose, setMaxChoose] = useState(0);
  const [arrChoose, setArrChoose] = useState([]);

  function openModalChoose(index) {
    setArrChoose([]);
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
    setVisible(false);
    history.push("/fight");
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
              <Card.Meta title={item.name} description={item.description} />
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
        <div className="d-flex justify-content-between px-5">
          {pets
            .filter((i) => i.isLock === 1)
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
