import React, { useContext, useEffect, useState } from "react";

import {
  MedicineBoxOutlined,
  InfoCircleOutlined,
  LockOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Modal,
  Progress,
  Row,
  Col,
  Form,
  Input,
  Button,
} from "antd";
import { AppContext } from "../../context/AppContext";
import date from "date-and-time";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function PetItem(props) {
  const { feed, unLock, exp, receiveExperience } = useContext(AppContext);
  const { data, id } = props;
  const [visible, setVisible] = useState(false);

  const [countDown, setCountDown] = useState(0);

  const [modalUp, setModalUp] = useState(false);

  let formRef = React.createRef();

  useEffect(() => {
    if (data.isLock) return;
    console.log(data);

    let timer = setInterval(() => {
      const now = new Date().getTime();

      if (data.lastMeal + data.endurance > now) {
        setCountDown(data.lastMeal + data.endurance - now);
      } else {
        setCountDown(0);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  function pad(num) {
    return ("0" + num).slice(-2);
  }
  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${pad(hours)}:${pad(minutes)}`;
    // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
  }

  async function onFinish(e) {
    if (e.exp) {
      await receiveExperience(id, e.exp);
      setModalUp(false);
    }
  }

  function onFill() {
    formRef.current.setFieldsValue({
      exp: exp,
    });
  }

  function onFeed() {
    if (!data.isLock) {
      feed(id);
    }
  }

  function onLevelUp() {
    if (!data.isLock) {
      setModalUp(true);
    }
  }

  return (
    <div className="pet-item">
      <Card
        style={{ width: 300 }}
        cover={
          <div className="thumb py-4">
            <img
              alt="example"
              src={data.avatar}
              style={{ height: 200, width: "auto" }}
            />
            {data.isLock ? (
              <div className="lock">
                <LockOutlined onClick={() => unLock(id)} />
              </div>
            ) : (
              ""
            )}
          </div>
        }
        actions={[
          <MedicineBoxOutlined key="feed" onClick={onFeed} />,
          <UpCircleOutlined key="up" onClick={onLevelUp} />,
          <InfoCircleOutlined key="info" onClick={() => setVisible(true)} />,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={data.icon} />}
          title={data.name}
          description={`Level ${data.level}`}
        />

        <div className="timeout mt-3 d-flex justify-content-center">
          <Progress
            type="circle"
            percent={Math.round((countDown / data.endurance) * 100)}
            status="exception"
            format={(percent) => hhmmss(Math.round(countDown / 1000))}
            width={90}
            strokeWidth={8}
          />
        </div>
      </Card>
      <Modal
        title={data.name}
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
                status="success"
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
            <Col span={10}>
              <div>{date.format(new Date(data.defend), "HH:mm:ss")}s</div>
            </Col>
          </Row>

          <Row>
            <Col span={5}>Last meal:</Col>
            <Col span={10}>
              <div>
                {date.format(new Date(data.lastMeal), "dd/MM/YYYY HH:mm:ss")}s
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

      <Modal
        title="Level Up"
        visible={modalUp}
        onOk={() => setModalUp(false)}
        onCancel={() => setModalUp(false)}
        footer={[
          <Button key="ok" onClick={() => setModalUp(false)}>
            OK
          </Button>,
        ]}
      >
        <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
          <p>Max exp: {exp}</p>
          <Form.Item name="exp" label="Exp" rules={[{ required: true }]}>
            <Input type="number" min={0} max={exp} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="link" htmlType="button" onClick={onFill}>
              Max exp
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PetItem;
