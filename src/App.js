import "./App.css";
import React from "react";
import Master from "./Component/Master";
import Notfound from "./Component/notfound/404Notfound";
import { Routes, Route, Navigate } from "react-router-dom";
import PotocalBox from "./Component/PotocalBox";
import ExercisetBox from "./Component/ExercisetBox";
import AssesmentsBox from "./Component/AssesmentsBox";
import Login from "./Component/login";
import Usermaster from "./Component/Usermaster";
import UserMaster from "./Component/modalaction/UserMaster/UserMaster";


import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/protocol" element={<PotocalBox />} />
        <Route path="/exerciset" element={<ExercisetBox />} />
        <Route path="/assesments" element={<AssesmentsBox />} />
        <Route path="/usermaster" element={<UserMaster />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/master" element={<Master />} />
      </Routes>
    </div>
  );
};

export default App;
// render(<App />, document.getElementById("root"));
