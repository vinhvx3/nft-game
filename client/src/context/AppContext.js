import React, { useEffect, useState } from "react";
import Moralis from "moralis/dist/moralis.min.js";
import Web3 from "web3/dist/web3.min.js";

import Abi from "../abi/Token.json";

export const AppContext = React.createContext();

const serverUrl = "https://trhllvlqhayr.usemoralis.com:2053/server";
const appId = "bRh7rk7zdJN0buRIJcecSExEjeL3J3o3FHQz3BRG";
const CONTRACT_ADDRESS = "0x4C75E622E609cD72F8e857c79d2D1D0FE75B1C7c";

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
        let contract = new web3Js.eth.Contract(abi, CONTRACT_ADDRESS);

        const ethAddress = window.ethereum.selectedAddress;

        let arr = await contract.methods.getAllTokensForUser(ethAddress).call({ from: ethAddress });
        console.log(arr);
        // arr.forEach(item => {

        // });
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
  }

  function getAbi() {
    return Abi.abi;
  }

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        login,
        logOut,
        pets,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
