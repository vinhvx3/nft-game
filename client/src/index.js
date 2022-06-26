import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(<App />);

reportWebVitals();
