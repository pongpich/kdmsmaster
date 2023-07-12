import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {  RecoilRoot } from "recoil";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter basename={"/master"}>
    <RecoilRoot>
    <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);
