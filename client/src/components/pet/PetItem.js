import React from "react";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";

import fireAvatar from "../../static/avatar/Charizard-Mega.png";
import fireIcon from "../../static/icon/fire.png";
import { useState } from "react";

function PetItem(props) {
  const { data } = props;
  const [visible, setVisible] = useState(false);
  return (
    <div className="pet-item">
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={fireAvatar} />}
        actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" onClick={() => setVisible(true)} />]}
      >
        <Card.Meta avatar={<Avatar src={fireIcon} />} title="Dragon fire" description="This is the description" />
      </Card>
      <Modal title="Dragon fire" centered visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} width={1000}>
        <p>Damage: {data.damage}</p>
        <p>Magic: {data.magic}</p>
        <p>Endurance: {data.endurance}</p>
      </Modal>
    </div>
  );
}

export default PetItem;
