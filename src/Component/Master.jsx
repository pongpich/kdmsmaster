import React, { useEffect, useState } from "react";
import PotocalBox from "./PotocalBox";
import Header from "./Header";
import ExercisetBox from "./ExercisetBox";
import { BiMenu, BiHomeAlt } from "react-icons/bi";
import "./style.css";
import AssesmentsBox from "./AssesmentsBox";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../paths/api-path";
import delay from "delay";

function Master() {
  const [potocal, setPotocal] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [Assassment, setAssassment] = useState([]);

  // useEffect(async () => {
  //  await GetData();
  // }, []);

  // const GetData = async() => {
  //   const request_Exercise = {
  //     params: {
  //       dbServiceName: "MSExcerciseHeaderList",
  //     },
  //   };
  //   const request_Assassment = {
  //     params: {
  //       dbServiceName: "MSAssassmentHeaderList",
  //     },
  //   };
  //   const request_protocol = {
  //     params: {
  //       dbServiceName: "MSProtocolHeaderList",
  //     },
  //   };

  //   const response_Exercise = axios.get(
  //     `${kdms_internet_protocol_DBService_JSON_path}`,
  //     request_Exercise
  //   );
  //   const response_Assassment = axios.get(
  //     `${kdms_internet_protocol_DBService_JSON_path}`,
  //     request_Assassment
  //   );
  //   const response_Potocal = axios.get(
  //     `${kdms_internet_protocol_DBService_JSON_path}`,
  //     request_protocol
  //   );

  //   await axios
  //     .all([response_Exercise, response_Assassment, response_Potocal])
  //     .then(
  //       axios.spread((...allData) => {
  //         const DataExc = allData[0].data?.result;
  //         const DataAsm = allData[1].data?.result;
  //         const DataPtc = allData[2].data?.result;

  //         delay(2000);

  //         setExercise(DataExc);
  //         setAssassment(DataAsm);
  //         setPotocal(DataPtc);
  //         console.log(DataExc, "Exc");
  //         console.log(DataAsm, "Asm");
  //         console.log(DataPtc, "Ptc");
  //       })
  //     );
  // }

  return (
    <div className=" h-screen flex">
      <div className=" w-12 h-screen md:h-auto  md:overflow-y-scroll bg-blue-200 grid-cols-2 ">
        <div className="col-span-2">
          <div>
            <BiMenu style={{ height: "1.2rem" }} />
          </div>
          <div>
            <BiHomeAlt />
          </div>
        </div>
      </div>
      <div className="w-full">
        <Header />
        <div className="px-5 py-5 grid grid-cols-3 md:grid-cols-1 xl:grid-cols-3 md:ml-20 xl:ml-0">
          {/* <div>
            <PotocalBox data={potocal} />
          </div>
          <div>
            <ExercisetBox data={exercise} />
          </div>
          <div>
            <AssesmentsBox data={Assassment} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Master;
