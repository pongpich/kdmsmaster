import React, { useState } from "react";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import delay from "delay";
import Swal from "sweetalert2";

function EditBody({ data }) {
  const [modalbody, setModalbody] = useState();
  const [Namtha, setNamtha] = useState("");
  const [Nameng, setNameng] = useState("");
  const [bdycod, setBdycod] = useState("");
  const utf8 = require("utf8");

  const UpdateBody = async () => {
    const req_insdata = {
      params: {
        dbServiceName: "MSSaveExcerciseBodyMaster",
        bdycod: bdycod,
        namtha: utf8.encode(Namtha),
        nameng: Nameng,
        typcod: "U",
        uidcod: "BRBADMIN",
      },
    };
    if (bdycod !== "" && Namtha !== "" && Nameng !== "") {
      await axios.get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        req_insdata
      );
      Swal.fire({
        icon: "success",
        text: "สำเร็จ",
      });
      // console.log("true");
      setModalbody(false);
      await delay(1000);
      // GetBody();
      ClearData();
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

  const ClearData = () => {
    setBdycod("");
    setNameng("");
    setNamtha("");
  };
  const setData = () => {
    setBdycod(data.BdyCod);
    setNameng(data.HpmEng);
    setNamtha(data.HpmNam);
    console.log("setdata", bdycod);
  };

  return (
    <>
      <div
        onClick={() => {
          setModalbody(true);
          setData();
        }}
      >
        <p className="px-4 py-2 text-sm text-neutral-700 flex flex-row hover:bg-neutral-100">
          {" "}
          Edit Body
        </p>
      </div>

      {modalbody ? (
        <div>
          <div className=" justify-center items-center flex overflow-x-hidden text-neutral-500 overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
            <div className="flex justify-center m-5  text-base w-2/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4 py-5 focus:outline-none overflow-y-auto">
                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-50 text-neutral-600">
                  Exercise Group
                </div>
                <div className="h-40">
                  <div className="grid grid-cols-4 mx-5 pt-5 text-right">
                    {/* <div>Group code:</div> */}
                    {/* <div className="col-span-3">
                      <input
                        value={bdycod}
                        className=" w-11/12 outline-none  border-b-2"
                        onChange={(e) => setBdycod(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="grid grid-cols-4 mx-5 pt-5 text-right">
                    <div> EN:</div>
                    <div className="col-span-3">
                      <input
                        value={Nameng}
                        className=" w-11/12 outline-none  border-b-2"
                        onChange={(e) => setNameng(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 mx-5 pt-5 text-right">
                    <div> TH:</div>
                    <div className="col-span-3">
                      <input
                        className=" w-11/12 outline-none border-b-2"
                        value={Namtha}
                        onChange={(e) => setNamtha(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex space-x-9 justify-center font-medium text-sm mt-5">
                  <div
                    onClick={() => setModalbody(false)}
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
                  {console.log(Nameng)}
                  <div
                    onClick={() => {
                      UpdateBody();
                    }}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-green-700 text-white"
                  >
                    Update
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

export default EditBody;
