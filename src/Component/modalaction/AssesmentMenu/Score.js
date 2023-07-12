import React, { useState } from "react";
import xmark from "../../../assets/img/xmark.svg";
import mes from "../../../assets/img/mes.svg";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import axios from "axios";
import Swal from "sweetalert2";
import delay from "delay";

function Score() {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState();
  // const [inputList, setInputList] = useState([{ AnsTH: "", AnsEn: "" }]);
  const [Ans, setAns] = useState([]);
  // const [asssub, setAsssub] = useState("1");
  const [asssubval, setAsssubval] = useState("R");
  const [asscod, setAsscod] = useState("");
  const [asscodnam, setAsscodnam] = useState("");
  const [asscodeng, setAsscodeng] = useState("");
  const [asssubnam, setAsssubnam] = useState("");
  const [asssubeng, setAsssubeng] = useState("");
  const [asscodval, setasscodval] = useState("");

  const [Indata, setIndata] = useState([]);
  const utf8 = require("utf8");

  const SaveAss = async () => {
    //Question
    setAsscodnam(asscodnam);
    setAsscodeng(asscodeng);
    let asscods = "";
    let ansTH = "";
    let ansEN = "";
    const typeCod = "I";
    const uidCod = "BRBADMIN";

    if (asscodnam != "" && asscodeng != "") {
      const responQuestion = {
        params: {
          dbServiceName: "MSSaveAssessmentMasterHeader",
          asscod: "", // code ลำดับคำถาม ถ้าเป็นคำถามใหม่ ''
          asscodnam: utf8.encode(asscodnam), // คำถาม ไทย
          asscodeng: asscodeng, // คำถาม ENG
          asscodval: "",
          typcod: typeCod,
          uidcod: uidCod,
        },
      };
      const { data } = await axios.get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        responQuestion
      );
      if (data.result[0].asscod !== "") {
        asscods = data.result[0].asscod;
      }

      if (asscods != "") {
        const asssubChoice = "1";
        setAsssubval("PS");
        ansTH = asssubnam;
        ansEN = asssubeng;
        setAsscodnam(asscodnam);
        setAsscodeng(asscodeng);

        const responAnswer = {
          params: {
            dbServiceName: "MSSaveAssessmentMaster",
            asscod: asscods, // code ลำดับคำถาม ถ้าเป็นคำถามใหม่ ''
            asssub: asssubChoice, // code จำนวนคำตอบ
            asssubnam: utf8.encode(asssubnam), //  คำตอบ ไทย
            asssubeng: asssubeng, // คำตอบ อังกฤษ
            asssubval: asssubval, // code type คำตอบ T= short text,R = checkbox,C=check box, PS = pain score, M = multiline
            typcod: typeCod,
            uidcod: uidCod,
          },
        };
        delay(2000);
        await axios
          .get(`${kdms_internet_protocol_DBService_JSON_path}`, responAnswer)
          .then((response) => {
            const responseData = response.data.result;
            console.log(response.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire({
          icon: "success",
          text: "สำเร็จ",
        });
        setTimeout(() => {
          Swal.close();
        }, 4000);
        setAsscodeng("");
        setAsscodnam("");
        setAsssubeng("");
        setAsssubnam("");
        setasscodval("");
        setShowModal("");

        delay(1000);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกคำถาม",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);
    }
    console.log(asscod);
    delay(2000);
  };

  return (
    <div>
      <div>
        <div
          onClick={() => setShowModal(true)}
          className="shadow-lg  h-32 hover:bg-slate-200 "
          style={{ borderRadius: "7px" }}
        >
          <img
            className="ml-5 mt-2"
            src={mes}
            alt=""
            style={{ height: "1rem" }}
          />
          <p className="mt-7 ml-5">Score Scale</p>
        </div>

        {showModal ? (
          <div>
            <div
              onClick={() => {
                setHidden("hidden");
              }}
              className=" justify-center items-center flex overflow-x-hidden cursor-default overflow-y-auto fixed inset-0 z-100  "
            >
              <div className="flex justify-center m-5 h-5/6 w-3/4 text-base">
                <div className="border-0 rounded-lg  relative flex flex-col w-full mb-4  focus:outline-none overflow-y-auto">
                  <div className="grid grid-cols-12 ">
                    <div className=" col-span-3"></div>

                    <div className=" col-span-9 mt-14 mx-2 bg-white">
                      <div className="grid grid-cols-8 bg-white space-y-3">
                        <div className=" py-3 mx-5 text-right text-sm col-span-8">
                          Preview
                        </div>
                        <div className="text-right text-neutral-500 col-span-1">
                          TH
                        </div>
                        <div className="col-span-7">
                          <input
                            type="text"
                            placeholder="ตั้งคำถาม"
                            className=" w-10/12 border-b outline-0 pl-3"
                            onChange={(e) => setAsscodnam(e.target.value)}
                          />
                        </div>

                        <div className=" text-right text-neutral-500">EN</div>
                        <div className="col-span-7">
                          <input
                            type="text"
                            placeholder="Question"
                            onChange={(e) => setAsscodeng(e.target.value)}
                            className=" w-10/12 border-b outline-0 pl-3"
                          />
                        </div>

                        <div className="col-span-8 grid grid-cols-8 items-center mx-8 pt-5">
                          <div className="text-right pt-1">
                            <input
                              type="number"
                              min="1"
                              placeholder="1"
                              className="w-10 text-center"
                              value="1"
                            />
                          </div>
                          <div className="col-span-2 text-center">ถึง</div>
                          <div className=" justify-self-center">
                            <input
                              type="number"
                              max="100"
                              placeholder="100"
                              className="w-10 text-center"
                              onChange={(e) => {
                                setasscodval(e.target.value);
                              }}
                              value={asscodval}
                            />
                          </div>
                          <div className=" col-span-4 text-red-600 text-xs font-thin">
                            {asscodval > 100
                              ? " value must be less than or equal to 100"
                              : ""}
                          </div>
                        </div>

                        <div className="col-span-8 grid grid-cols-8 items-center mx-8 pt-5">
                          <div className="text-right pr-5 pt-1">
                            {asscodval}
                          </div>
                          <div className="col-span-2 text-center">
                            <input
                              type="text"
                              className=" w-11/12 border-b outline-0 placeholder:text-center"
                              placeholder="ป้ายกำกับ TH"
                              onChange={(e) => {
                                setAsssubnam(e.target.value);
                              }}
                              value={asssubnam}
                            />
                          </div>{" "}
                          <div className="col-span-2 text-center">
                            <input
                              type="text"
                              className=" w-11/12 border-b outline-0 placeholder:text-center"
                              placeholder="EN"
                              onChange={(e) => {
                                setAsssubeng(e.target.value);
                              }}
                              value={asssubeng}
                            />
                          </div>
                          <div className=" justify-self-center">
                            {/* <img src={xmark} alt="" /> */}
                          </div>
                        </div>
                      </div>

                      <div
                        className="mt-16 mx-10 text-gray-400"
                        style={{ display: "flex" }}
                      >
                        <input
                          style={{ height: "25px", width: "25px" }}
                          type="checkbox"
                          className=""
                        />
                        <label className="mt-1 ">&nbsp;Enable</label>

                        <input
                          style={{ height: "25px", width: "25px" }}
                          type="checkbox"
                          className="ml-6"
                        />
                        <label className="mt-1">&nbsp;Disable</label>
                      </div>

                      <div className="mt-8 text-right mr-24 py-5">
                        <button
                          onClick={() => setShowModal(false)}
                          className="border rounded-full px-6  py-1 border-gray-400 text-gray-500 font-semibold mr-10 hover:bg-slate-200 "
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            SaveAss();
                          }}
                          className="border rounded-full px-9 h-9  py-1 bg-yellow-500 text-yellow-100 font-semibold hover:bg-yellow-400"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Score;
