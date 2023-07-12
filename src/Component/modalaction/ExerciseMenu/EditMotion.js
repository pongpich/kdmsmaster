import React, { useState } from "react";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import Swal from "sweetalert2";
import delay from "delay";

function Addbody() {
  const [modalMot, setModalMot] = useState();
  const [Namtha, setNamtha] = useState("");
  const [Nameng, setNameng] = useState("");
  const [motcod, setMotcod] = useState("");
  // const [motion, setMotion] = useState([""]);
  const utf8 = require("utf8");

  const SaveMotion = async () => {
    const req_insdata = {
      params: {
        dbServiceName: "MSSaveExcerciseMotionMaster",
        motcod: motcod,
        namtha: utf8.encode(Namtha),
        nameng: Nameng,
        typcod: "I",
        uidcod: "BRBADMIN",
      },
    };
    console.log(req_insdata, "req_insdata");
    if (Namtha !== "" && Nameng !== "" && motcod !== "") {
      try {
        await axios.get(
          `${kdms_internet_protocol_DBService_JSON_path}`,
          req_insdata
        );
        Swal.fire({
          icon: "success",
          text: "สำเร็จ",
        });
        setModalMot(false);
        ClearData();
        GetMotion();
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      setTimeout(() => {
        Swal.close();
      }, 3000);
    }
  };
  const DeleMotion = async () => {
    const req_insdata = {
      params: {
        dbServiceName: "MSSaveExcerciseMotionMaster",
        motcod: motcod,
        namtha: utf8.encode(Namtha),
        nameng: Nameng,
        typcod: "D",
        uidcod: "BRBADMIN",
      },
    };
    console.log(req_insdata, "req_insdata");
    if (Namtha !== "" && Nameng !== "" && motcod !== "") {
      try {
        await axios.get(
          `${kdms_internet_protocol_DBService_JSON_path}`,
          req_insdata
        );
        Swal.fire({
          icon: "success",
          text: "สำเร็จ",
        });
        setModalMot(false);
        ClearData();
        GetMotion();
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      setTimeout(() => {
        Swal.close();
      }, 3000);
    }
  };
  // console.log( motion.Nametha, "else");

  const GetMotion = async () => {
    const request_Motion = {
      params: {
        dbServiceName: "MSExcerciseMotionList",
      },
    };
    await delay(1000);
    await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Motion
    );
  };
  const ClearData = () => {
    setMotcod("");
    setNamtha("");
    setNameng("");
  };

  return (
    <>
      <div
        onClick={() => {
          setModalMot(true);
        }}
      >
        <u className=" text-blue-700">edit</u>
      </div>

      {modalMot ? (
        <div>
          <div className=" justify-center items-center flex overflow-x-hidden text-neutral-500 overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
            <div className="flex justify-center m-5  text-base w-2/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4 py-5 focus:outline-none overflow-y-auto">
                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-50 text-neutral-600">
                  Exercise Group
                </div>
                <div className="h-40">
                  <div className="grid grid-cols-4 mx-5 pt-5 text-right">
                    <div>Motion code :</div>
                    <div className="col-span-3">
                      <input
                        required
                        value={motcod}
                        className=" w-11/12 outline-none  border-b-2 required:border-red-700 valid:border-black "
                        onChange={(e) => setMotcod(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 mx-5 pt-5 text-right">
                    <div>EN :</div>
                    <div className="col-span-3">
                      <input
                        required
                        value={Nameng}
                        className=" w-11/12 outline-none border-b-2 required:border-red-700 valid:border-black "
                        onChange={(e) => setNameng(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 mx-5 pt-5 text-right">
                    <div>TH :</div>
                    <div className="col-span-3">
                      <input
                        required
                        value={Namtha}
                        className=" w-11/12 outline-none  border-b-2 required:border-red-700 valid:border-black "
                        onChange={(e) => setNamtha(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex space-x-9 justify-center font-medium text-sm mt-5">
                  <div
                    onClick={() => setModalMot(false)}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => {
                      ClearData();
                    }}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center border-green-700 text-green-700"
                  >
                    Clear
                  </div>
                  <div
                    onClick={() => {
                      // save /////
                      SaveMotion();
                    }}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-green-700 text-white"
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Addbody;
