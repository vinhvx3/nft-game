import React, { useContext, useEffect, useState } from "react";
import "./FightScreen.scss";
import { Progress, Modal } from "antd";

import skill0 from "../static/skill/skill0.webp";
import skill1 from "../static/skill/skill1.png";
import skill2 from "../static/skill/skill2.webp";
import { AppContext } from "../context/AppContext";
import { useHistory, useParams } from "react-router-dom";
import { clear } from "@testing-library/user-event/dist/clear";

const TIME_SKILL_1 = 20;
const TIME_SKILL_2 = 40;

let timerCountDown = null;

function FightScreen(props) {
  const { id } = useParams();
  const history = useHistory();

  const { checkElement, missions, petsMission, pets, exp, setExp } =
    useContext(AppContext);
  const [bgRandom, setBgRandom] = useState(
    Math.floor((Math.random() * 10) % 3)
  );
  const [round, setRound] = useState(0);

  const [crtPet, setCrtPet] = useState({});
  const [crtBot, setCrtBot] = useState({});

  const [petSkill1, setPetSkill1] = useState(0);
  const [petSkill2, setPetSkill2] = useState(0);
  const [petAnimation, setPetAnimation] = useState("");
  const [petHurt, setPetHurt] = useState(false);

  const [botSkill1, setBotSkill1] = useState(0);
  const [botSkill2, setBotSkill2] = useState(0);
  const [botAnimation, setBotAnimation] = useState("");
  const [botHurt, setBotHurt] = useState(false);

  const [listPet, setListPet] = useState([]);
  const [listBot, setListBot] = useState([]);

  const [lockPet, setLockPet] = useState(true);
  const [lockBot, setLockBot] = useState(true);

  const [side, setSide] = useState(-1);

  const [spin, setSpin] = useState(false);
  const [visible, setVisible] = useState(false);

  const [countDown, setCountDown] = useState(0);
  const [modalOver, setModalOver] = useState(false);
  const [winner, setWinner] = useState(false);

  const [expPlus, setExpPlus] = useState(0);

  useEffect(() => {
    setListPet(
      petsMission.map((i) => {
        return { ...pets[i], blood: 100 };
      })
    );
    setListBot(missions[id].bots);
    setCrtBot(checkElement({ ...missions[id].bots[0], blood: 100 }));
    setSpin(true);
    console.log("Game start");

    setTimeout(() => {
      setSpin(false);
      setVisible(true);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (side >= 0) {
      let _count = 15;
      setCountDown(_count);

      timerCountDown = setInterval(() => {
        if (_count <= 0) {
          changeSide();
        } else {
          _count--;
          setCountDown(_count);
        }
      }, 1000);

      if (side === 1) {
        if (crtBot.blood > 0) {
          setLockPet(true);
          setLockBot(false);
          if (botSkill2 === 0) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useBotSkill2();
          } else if (botSkill1 === 0) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useBotSkill1();
          } else {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useBotSkill0();
          }
        } else {
          clearInterval(timerCountDown);

          if (round < listBot.length - 1) {
            setCrtBot(checkElement({ ...listBot[round + 1], blood: 100 }));
            setRound(round + 1);

            setTimeout(() => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useBotSkill0();
            }, 2000);
          } else {
            let _exp = listBot.reduce((total, item) => {
              return total + item.level * 25;
            }, 0);
            setExpPlus(_exp);
            setExp(exp + _exp);
            setWinner(true);
            setModalOver(true);
          }
        }
      } else {
        if (crtPet.blood > 0) {
          setLockBot(true);
          setLockPet(false);
        } else {
          clearInterval(timerCountDown);
          setSide(-1);

          let list = listPet;

          list = list.filter((item) => {
            return item.blood > 0 && item.element !== crtPet.element;
          });

          if (list.length) {
            setListPet(list);
            setVisible(true);
          } else {
            setWinner(false);
            setModalOver(true);
          }
        }
      }
    }
    return () => {
      clearInterval(timerCountDown);
    };
  }, [side]);

  function exit() {
    history.goBack();
  }

  function changeSide() {
    setSide((side + 1) % 2);
    clearInterval(timerCountDown);
  }

  function choosePet(index) {
    setCrtPet({ ...listPet[index], blood: 100 });
  }

  function goFight() {
    if (!crtPet || !crtPet.blood) return;

    setVisible(false);

    if (listPet.length === petsMission.length) {
      setPetSkill1(TIME_SKILL_1);
      setPetSkill2(TIME_SKILL_2);
      setBotSkill1(TIME_SKILL_1);
      setBotSkill2(TIME_SKILL_2);
    }

    setSide(0);
  }

  function caculateDamge(damage, from, to) {
    if (
      (from === 1 && to === 3) ||
      (from === 3 && to === 2) ||
      (from === 2 && to === 1)
    ) {
      return Math.round(1.2 * damage);
    } else {
      return damage;
    }
  }

  function attack(target, skill, damage) {
    if (target === 0) {
      let dmg = caculateDamge(
        damage + 0.5 * skill * damage,
        crtBot.element,
        crtPet.element
      );
      let _pet = crtPet;
      _pet.blood -= Math.round((dmg * 100) / (_pet.defend + 300));
      setCrtPet(_pet);
    } else {
      let dmg = caculateDamge(
        damage + 0.5 * skill * damage,
        crtPet.element,
        crtBot.element
      );
      let _bot = crtBot;
      _bot.blood -= Math.round((dmg * 100) / (_bot.defend + 300));
      setCrtBot(_bot);
    }
  }

  useEffect(() => {
    if (petSkill1 > 0) {
      setTimeout(() => {
        setPetSkill1(petSkill1 - 1);
      }, 1000);
    }
  }, [petSkill1]);

  useEffect(() => {
    if (petSkill2 > 0) {
      setTimeout(() => {
        setPetSkill2(petSkill2 - 1);
      }, 1000);
    }
  }, [petSkill2]);

  useEffect(() => {
    if (botSkill1 > 0) {
      setTimeout(() => {
        setBotSkill1(botSkill1 - 1);
      }, 1000);
    }
  }, [botSkill1]);

  useEffect(() => {
    if (botSkill2 > 0) {
      setTimeout(() => {
        setBotSkill2(botSkill2 - 1);
      }, 1000);
    }
  }, [botSkill2]);

  // Skills Pet
  function usePetSkill0() {
    if (lockPet) return;

    setLockPet(true);
    setPetAnimation("animation-left-0");
    setTimeout(() => {
      setPetAnimation("");
      setBotHurt(true);

      attack(1, 0, crtPet.damage);

      setTimeout(() => {
        setBotHurt(false);
        changeSide();
      }, 2000);
    }, 2000);
  }

  function usePetSkill1() {
    if (lockPet) return;

    setLockPet(true);
    setPetSkill1(TIME_SKILL_1);
    setPetAnimation("animation-left-1");
    setTimeout(() => {
      setPetAnimation("");
      setBotHurt(true);

      attack(1, 1, crtPet.damage);

      setTimeout(() => {
        setBotHurt(false);
        changeSide();
      }, 2000);
    }, 2000);
  }

  function usePetSkill2() {
    if (lockPet) return;

    setLockPet(true);
    setPetSkill2(TIME_SKILL_2);
    setPetAnimation("animation-left-2");
    setTimeout(() => {
      setPetAnimation("");
      setBotHurt(true);

      attack(1, 2, crtPet.damage);

      setTimeout(() => {
        setBotHurt(false);
        changeSide();
      }, 2000);
    }, 2000);
  }

  // Skills Bot

  function useBotSkill0() {
    setLockBot(true);
    setBotAnimation("animation-right-0");
    setTimeout(() => {
      setBotAnimation("");
      setPetHurt(true);

      attack(0, 0, crtBot.damage);

      setTimeout(() => {
        setPetHurt(false);
        changeSide();
      }, 2000);
    }, 2000);
  }

  function useBotSkill1() {
    setLockBot(true);
    setBotSkill1(TIME_SKILL_1);
    setBotAnimation("animation-right-1");
    setTimeout(() => {
      setBotAnimation("");
      setPetHurt(true);

      attack(0, 1, crtBot.damage);

      setTimeout(() => {
        setPetHurt(false);
        changeSide();
      }, 2000);
    }, 2000);
  }

  function useBotSkill2() {
    setLockBot(true);
    setBotSkill2(TIME_SKILL_2);
    setBotAnimation("animation-right-2");
    setTimeout(() => {
      setBotAnimation("");
      setPetHurt(true);

      attack(0, 2, crtBot.damage);

      setTimeout(() => {
        setPetHurt(false);
        changeSide();
      }, 2000);
    }, 2000);
  }

  return (
    <div id="fight-screen">
      <div className={`background bg-${bgRandom}`}>
        <div className="place-holder"></div>
      </div>
      <div className="blood-progress d-flex">
        <span className="level">Lv{crtPet.level}</span>
        <Progress
          className="pgr-left"
          percent={crtPet.blood}
          status="exception"
          showInfo={false}
          strokeWidth={30}
        />
        <div className="round">Round {round + 1}</div>

        <Progress
          className="pgr-right"
          percent={crtBot.blood}
          status="exception"
          showInfo={false}
          strokeWidth={30}
        />
        <span className="level">Lv{crtBot.level}</span>
      </div>
      <div className="skills">
        <div className="skill skill-0">
          <img src={skill0} alt="skill 0" onClick={usePetSkill0} />
        </div>
        <div className="skill skill-1">
          <img src={skill1} alt="skill 1" onClick={usePetSkill1} />
          {petSkill1 && (
            <Progress
              type="circle"
              percent={Math.round((petSkill1 / TIME_SKILL_1) * 100)}
              status="exception"
              format={(percent) =>
                `${Math.round((percent * TIME_SKILL_1) / 100)} s`
              }
              width={80}
              strokeWidth={8}
              strokeColor="red"
            />
          )}
        </div>

        <div className="skill skill-2">
          <img src={skill2} alt="skill 2" onClick={usePetSkill2} />
          {petSkill2 && (
            <Progress
              type="circle"
              percent={Math.round((petSkill2 / TIME_SKILL_2) * 100)}
              status="exception"
              format={(percent) =>
                `${Math.round((percent * TIME_SKILL_2) / 100)} s`
              }
              width={80}
              strokeWidth={8}
              strokeColor="red"
            />
          )}
        </div>
      </div>

      <div className="fighting">
        <div className={"side pet " + crtPet.class}>
          {side === 0 && <div className="timer timer-left">{countDown}</div>}
          <div className={petAnimation}>
            <div className="power-fight"></div>
            <div className="energy-ball"></div>
            {petHurt && <div className="hurt hurt-left"></div>}

            <img
              className={crtPet.reverse ? "reverse" : ""}
              src={crtPet.avatarFight}
              alt="pet"
            />
          </div>
        </div>
        <div className={"side bot " + crtBot.class}>
          {side === 1 && <div className="timer timer-right">{countDown}</div>}
          <div className={botAnimation}>
            <div className="power-fight"></div>
            <div className="energy-ball"></div>
            {botHurt && <div className="hurt hurt-right"></div>}
            <img
              className={crtBot.reverse ? "" : "reverse"}
              src={crtBot.avatarFight}
              alt="bot"
            />
          </div>
        </div>
      </div>

      {spin && (
        <div id="count-down">
          <div className="cont">
            <div className="spinner"></div>
            <span className="number"></span>
          </div>
        </div>
      )}

      <Modal
        title="Choose your pet"
        centered
        visible={visible}
        onOk={() => goFight()}
        width={1000}
      >
        <div className="d-flex justify-content-around px-5">
          {listPet.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  crtPet.element === item.element
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

      <Modal title="Game Over" visible={modalOver} onOk={exit} onCancel={exit}>
        {winner ? (
          <div className="winner text-center">
            <h2 style={{ color: "red" }}>Winner</h2>
            <h4> + {expPlus}epx</h4>
          </div>
        ) : (
          <div className="lose text-center">
            <h2>Lose!</h2>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FightScreen;
