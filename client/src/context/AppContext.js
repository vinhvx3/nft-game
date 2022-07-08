import React, { useEffect, useState } from "react";
import Moralis from "moralis/dist/moralis.min.js";
import Web3 from "web3/dist/web3.min.js";

import Abi from "../abi/Token.json";

import fireAvatar from "../static/image/Charizard.png";
import fireAvatarFight from "../static/image/Charizard-fighting.png";
import fireIcon from "../static/icon/fire.png";
import waterAvatar from "../static/image/Squirtle.png";
import waterAvatarFight from "../static/image/Squirtle-fighting.png";
import waterIcon from "../static/icon/water.png";
import electricAvatar from "../static/image/Pikachu.png";
import electricAvatarFight from "../static/image/Pikachu-fighting.png";
import electricIcon from "../static/icon/electric.png";
import mission1 from "../static/image/mission-1.jpg";
import mission2 from "../static/image/mission-2.jpg";
import mission3 from "../static/image/mission-3.png";

export const AppContext = React.createContext();

const serverUrl = "https://trhllvlqhayr.usemoralis.com:2053/server";
const appId = "bRh7rk7zdJN0buRIJcecSExEjeL3J3o3FHQz3BRG";
const CONTRACT_ADDRESS = "0x99AF237f62aa50Ae33660822Cc578B94D4a8c9cF";

const missions = [
  {
    name: "Tân thủ",
    round: 1,
    poster: mission1,
    maxChoose: 1,
    bots: [
      {
        element: 2,
        level: 1,
        damage: 100,
        defend: 100,
      },
    ],
  },
  {
    name: "Trung cấp",
    round: 2,
    poster: mission2,
    maxChoose: 2,
    bots: [
      {
        element: 1,
        level: 2,
        damage: 100 + 20,
        defend: 100 + 10,
      },
      {
        element: 3,
        level: 3,
        damage: 100 + 2 * 20,
        defend: 100 + 2 * 10,
      },
    ],
  },
  {
    name: "Thông thạo",
    round: 3,
    poster: mission3,
    maxChoose: 3,
    bots: [
      {
        element: 2,
        level: 3,
        damage: 100 + 2 * 20,
        defend: 100 + 2 * 10,
      },
      {
        element: 3,
        level: 4,
        damage: 100 + 3 * 20,
        defend: 100 + 3 * 10,
      },
      {
        element: 1,
        level: 5,
        damage: 100 + 4 * 20,
        defend: 100 + 4 * 10,
      },
    ],
  },
];

export function AppProvider(props) {
  const [userId, setUserId] = useState(localStorage.getItem("x-user-id"));

  const [pets, setPets] = useState([]);
  const [petsMission, setPetsMission] = useState([]);

  useEffect(() => {
    Moralis.start({ serverUrl, appId });
  }, []);

  useEffect(() => {
    if (userId) {
      (async () => {
        // let petId = 0;

        await Moralis.enableWeb3();
        const web3Js = new Web3(Moralis.provider);

        let abi = getAbi();
        const contract = new web3Js.eth.Contract(abi, CONTRACT_ADDRESS);
        const ethAddress = window.ethereum.selectedAddress;

        let arr = await contract.methods
          .getAllTokens()
          .call({ from: ethAddress });

        arr = arr.map((item) => {
          return checkElement(item);
        });

        setPets(arr);
      })();
    }
  }, [userId]);

  async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.Web3.authenticate();
    }
    console.log("logged in user:", user);

    setUserId(user.id);
    localStorage.setItem("x-user-id", user.id);
  }

  async function logOut() {
    await Moralis.User.logOut();
    setUserId("");
    localStorage.setItem("x-user-id", "");
    console.log("logged out");
    setPets([]);
  }

  function getAbi() {
    return Abi.abi;
  }

  async function feed(id) {
    const web3Js = new Web3(Moralis.provider);
    let abi = getAbi();
    const contract = new web3Js.eth.Contract(abi, CONTRACT_ADDRESS);
    const ethAddress = window.ethereum.selectedAddress;
    contract.methods
      .feed(id)
      .send({ from: ethAddress })
      .on("receipt", () => {
        console.log("Feed ---");
      });

    // await contract.methods.feed(id).call({ from: ethAddress });

    // let pet = await contract.methods
    //   .getTokenDetails(id)
    //   .call({ from: ethAddress });
    // console.log(pet);
    // let arr = [...pets];
    // arr[id] = pet;
    // setPets(arr);
  }

  function checkElement(item) {
    let result = {
      damage: Number(item.damage),
      defend: Number(item.defend),
      element: Number(item.element),
      endurance: Number(item.endurance),
      experience: Number(item.experience),
      isLock: Number(item.isLock),
      lastMeal: Number(item.lastMeal),
      level: Number(item.level),
      blood: Number(item.blood),
    };
    switch (result.element) {
      case 1:
        result = {
          ...result,
          name: "Fire Dragon",
          avatar: fireAvatar,
          icon: fireIcon,
          avatarFight: fireAvatarFight,
          reverse: true,
          class: "red",
        };
        break;

      case 2:
        result = {
          ...result,
          name: "Water Turtle",
          avatar: waterAvatar,
          icon: waterIcon,
          avatarFight: waterAvatarFight,
          reverse: false,
          class: "blue",
        };
        break;

      case 3:
        result = {
          ...result,
          name: "Electric Mouse",
          avatar: electricAvatar,
          icon: electricIcon,
          avatarFight: electricAvatarFight,
          reverse: true,
          class: "yellow",
        };
        break;

      default:
        break;
    }

    return result;
  }

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        login,
        logOut,
        pets,
        feed,
        checkElement,
        missions,
        petsMission,
        setPetsMission,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
