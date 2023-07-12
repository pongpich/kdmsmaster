import React, { useEffect, useState } from "react";
import doc from "../../../assets/img/doc.svg";
import xmark from "../../../assets/img/xmark.svg";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import axios from "axios";
import Swal from "sweetalert2";
import delay from "delay";

function Options() {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState();
  const [inputList, setInputList] = useState([{ AnsTH: "", AnsEn: "" }]);
  const [Ans, setAns] = useState([]);
  const [asssub, setAsssub] = useState("1");
  const [asssubval, setAsssubval] = useState("R");
  const [asscod, setAsscod] = useState("");
  const [asscodnam, setAsscodnam] = useState("");
  const [asscodeng, setAsscodeng] = useState("");
  const [asssubnam, setAsssubnam] = useState("");
  const [asssubeng, setAsssubeng] = useState("");
  const [Indata, setIndata] = useState([]);

  const utf8 = require("utf8");

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    // setAsssubnam(inputList[index].AnsTH);
    // setAsssubeng(inputList[index].AnsEn)
    // console.log(inputList[index].AnsTH, "ตอบไทย");
    setAns(inputList);
  };

  const handleRemoveClick = async (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log("remove", list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { AnsTH: "", AnsEn: "" }]);
  };

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
      // console.log(data.result[0].asscod)
      if (data.result[0].asscod !== "") {
        asscods = data.result[0].asscod;
      }
      // const asscodResult = data.result.map((number) =>
      //   setAsscod(number.asscod)
      // );
      // console.log(inputList[0].AnsTH)

      // console.log(data.result[0].asscod, "asscod");
      // console.log(asscod, "asscod");
      // console.log(asscods, "asscod");

      if (asscods != "") {
        //Answer
        for (let i = 0; i < inputList.length; i++) {
          // setAsssub(i);
          console.log(i + 1);
          // const asssubChoice = asssub;
          const asssubChoice = i + 1;
          setAsssubval("R");
          ansTH = inputList[i].AnsTH;
          ansEN = inputList[i].AnsEn;
          setAsscodnam(asscodnam);
          setAsscodeng(asscodeng);

          const responAnswer = {
            params: {
              dbServiceName: "MSSaveAssessmentMaster",
              asscod: asscods, // code ลำดับคำถาม ถ้าเป็นคำถามใหม่ ''
              asssub: asssubChoice, // code จำนวนคำตอบ
              asssubnam: utf8.encode(ansTH), //  คำตอบ ไทย
              asssubeng: ansEN, // คำตอบ อังกฤษ
              asssubval: asssubval, // code type คำตอบ T= short text,R = radio,C=check box, PS = pain score, M = multiline
              typcod: typeCod,
              uidcod: uidCod,
            },
          };

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

          setAsscod("");
          setInputList([{ AnsTH: "", AnsEn: "" }]);
          setAsscodeng("");
          setAsscodnam("");
          setAsssubeng("");
          setShowModal("");
          delay(1000);
        }
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
          className="shadow-lg h-32 hover:bg-slate-200 "
          style={{ borderRadius: "7px" }}
        >
          <img
            className="ml-5 mt-2"
            src={doc}
            alt=""
            style={{ height: "2.5rem" }}
          />
          <p className="mt-5 ml-5">Radio</p>
        </div>

        {showModal ? (
          <div>
            <div
              onClick={() => {
                setHidden("hidden");
              }}
              className=" justify-center items-center flex overflow-x-hidden cursor-default  fixed inset-0 z-100  "
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
                            value={asscodnam}
                            className=" w-10/12 border-b outline-0 pl-3"
                            onChange={(e) => {
                              setAsscodnam(e.target.value);
                            }}
                          />
                        </div>
                        <div className=" text-right text-neutral-500">EN</div>
                        <div className="col-span-7">
                          <input
                            type="text"
                            placeholder="Question"
                            className=" w-10/12 border-b outline-0 pl-3"
                            value={asscodeng}
                            onChange={(e) => {
                              setAsscodeng(e.target.value);
                            }}
                          />
                        </div>
                        {inputList.map((x, i) => {
                          return (
                            <>
                              <div className="col-span-8 grid grid-cols-8 items-center">
                                <div className="col text-right pt-1">
                                  <input
                                    id="default-radio-1"
                                    type="radio"
                                    value=""
                                    onChange={(event) => {
                                      setAsssub(i + 1);
                                    }}
                                    name="default-radio"
                                    className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300"
                                  />
                                </div>
                                <div className="col-span-5 pl-2">
                                  <input
                                    className=" outline-0 focus:border-b"
                                    name="AnsTH"
                                    placeholder="คำตอบไทย"
                                    value={x.AnsTH}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  <input
                                    className=" outline-0 focus:border-b ml-10"
                                    name="AnsEn"
                                    placeholder="Enter Answer"
                                    value={x.AnsEn}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                </div>
                                {inputList.length !== 1 && (
                                  <div
                                    onClick={() => handleRemoveClick(i)}
                                    className=" justify-self-center"
                                  >
                                    <img
                                      className="  col-span-2"
                                      src={xmark}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>

                              {inputList.length - 1 === i && (
                                <div
                                  onClick={() => {
                                    handleAddClick();
                                  }}
                                  className="col-span-8 grid grid-cols-8 items-center text-blue-700"
                                >
                                  <div className="col text-right pt-1">
                                    <input
                                      id="default-radio-1"
                                      disabled
                                      type="radio"
                                      value=""
                                      name="default-radio"
                                      className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300"
                                    />
                                  </div>
                                  <div className="col-span-5 pl-2">
                                    + เพิ่มคำตอบ
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </div>

                      <div
                        className="mt-16 mx-10 text-gray-400"
                        style={{ display: "flex" }}
                      >
                        <input
                          // onClick={() => CountToSave()}
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

                      <div className="mt-8 text-right mr-24 ">
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

export default Options;

// <input
// type="text"
// placeholder="ข้อความคำตอบสั้นๆ "
// className=" w-10/12 border-b outline-0  pt-3 ml-10 mt-9"
// ></input>
