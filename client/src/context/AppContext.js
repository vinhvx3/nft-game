import React, { useEffect, useState } from "react";
import Moralis from "moralis/dist/moralis.min.js";
import Web3 from "web3/dist/web3.min.js";

import Abi from "../abi/Token.json";

import fireAvatar from "../static/image/Charizard.png";
import fireIcon from "../static/icon/fire.png";
import waterAvatar from "../static/image/Squirtle.png";
import waterIcon from "../static/icon/water.png";
import electricAvatar from "../static/image/Pikachu.png";
import electricIcon from "../static/icon/electric.png";

export const AppContext = React.createContext();

const serverUrl = "https://trhllvlqhayr.usemoralis.com:2053/server";
const appId = "bRh7rk7zdJN0buRIJcecSExEjeL3J3o3FHQz3BRG";
const CONTRACT_ADDRESS = "0xFF8BFFAea928F76ED87A71c7e59964f900a38aB1";

export function AppProvider(props) {
  const [userId, setUserId] = useState(localStorage.getItem("x-user-id"));

  const [pets, setPets] = useState([]);

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
    // contract.methods
    //   .feed(id)
    //   .send({ from: ethAddress })
    //   .on("receipt", () => {
    //     console.log("Feed ---");
    //   });

    await contract.methods.feed(id).call({ from: ethAddress });

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
    };
    switch (result.element) {
      case 1:
        result = {
          ...result,
          name: "Fire Dragon",
          avatar: fireAvatar,
          icon: fireIcon,
        };
        break;

      case 2:
        result = {
          ...result,
          name: "Water Turtle",
          avatar: waterAvatar,
          icon: waterIcon,
        };
        break;

      case 3:
        result = {
          ...result,
          name: "Electric Mouse",
          avatar: electricAvatar,
          icon: electricIcon,
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
