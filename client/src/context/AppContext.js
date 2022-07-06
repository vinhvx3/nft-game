import React, { useEffect, useState } from "react";
import Moralis from "moralis/dist/moralis.min.js";

export const AppContext = React.createContext();

const serverUrl = "https://trhllvlqhayr.usemoralis.com:2053/server";
const appId = "bRh7rk7zdJN0buRIJcecSExEjeL3J3o3FHQz3BRG";

export function AppProvider(props) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("x-access-token")
  );

  useEffect(() => {
    Moralis.start({ serverUrl, appId });
  }, []);

  async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate();
    }
    console.log("logged in user:", user);
    setAccessToken(user.id);
    localStorage.setItem("x-access-token", user.id);
  }

  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        logOut,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
