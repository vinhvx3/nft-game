import React, { useContext, useEffect, useState } from "react";

import {
  MedicineBoxOutlined,
  InfoCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal, Progress, Row, Col } from "antd";
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
        width={600}
      >
        <div className="px-5">
          <h5>Level {data.level}</h5>
          <Row>
            <Col span={5}>Experience:</Col>
            <Col span={15}>
              <Progress
                percent={data.experience / 5}
                size="small"
                showInfo={false}
                width={100}
              />
            </Col>
            <Col span={4}>
              <div className="text-center">{data.experience}</div>
            </Col>
          </Row>

          <Row>
            <Col span={5}>Damage:</Col>
            <Col span={15}>
              <Progress
                percent={data.damage / 5}
                size="small"
                status="exception"
                showInfo={false}
                width={100}
              />
            </Col>
            <Col span={4}>
              <div className="text-center">{data.damage}</div>
            </Col>
          </Row>

          <Row>
            <Col span={5}>Defend:</Col>
            <Col span={15}>
              <Progress
                percent={data.defend / 5}
                size="small"
                status="active"
                showInfo={false}
                width={100}
              />
            </Col>
            <Col span={4}>
              <div className="text-center">{data.defend}</div>
            </Col>
          </Row>

          <Row>
            <Col span={5}>Endurance:</Col>
            <Col span={4}>
              <div className="text-center">
                {date.format(new Date(data.defend), "HH:mm:ss")}s
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default PetItem;
