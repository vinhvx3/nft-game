import React, { useContext, useEffect, useState } from "react";

import {
  MedicineBoxOutlined,
  InfoCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import { AppContext } from "../../context/AppContext";
import date from "date-and-time";

let timer = null;

function PetItem(props) {
  const { feed } = useContext(AppContext);
  const { data, id } = props;
  const [visible, setVisible] = useState(false);

  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    const now = new Date();

    if (now.getTime() < data.lastMeal + data.endurance) {
      timer = setTimeout(() => {
        setCountDown(
          date.format(new Date(now.getTime() - data.lastMeal), "HH:mm:ss")
        );
      }, 1 * 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [data, countDown]);

  return (
    <div className="pet-item">
      <Card
        style={{ width: 300 }}
        cover={
          <div className="thumb">
            <img
              alt="example"
              src={data.avatar}
              style={{ height: 300, width: "auto" }}
            />
            {data.isLock && (
              <div className="lock">
                <LockOutlined />
              </div>
            )}
          </div>
        }
        actions={[
          <MedicineBoxOutlined key="feed" onClick={() => feed(id)} />,
          <InfoCircleOutlined key="info" onClick={() => setVisible(true)} />,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={data.icon} />}
          title={data.name}
          description={`Level ${data.level}`}
        />
        <div className="timeout">{countDown}</div>
      </Card>
      <Modal
        title="Dragon fire"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
      >
        <p>Damage: {data.damage}</p>
        <p>Magic: {data.magic}</p>
        <p>Endurance: {data.endurance}</p>
      </Modal>
    </div>
  );
}

export default PetItem;
