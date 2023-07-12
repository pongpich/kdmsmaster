import React, { useState, useEffect } from "react";
import message from "../../../assets/img/message.svg";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import axios from "axios";
import Swal from "sweetalert2";
import delay from "delay";

function Shortans(props) {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState();
  const [asssub, setAsssub] = useState("1");
  const [asscodnam, setAsscodnam] = useState("");
  const [asscodeng, setAsscodeng] = useState("");
  const [asssubnam, setAsssubnam] = useState("");
  const [asssubeng, setAsssubeng] = useState("");
  const [asscod, setAsscod] = useState("");
  const [asscodval, setasscodval] = useState("");
  const [asssubval, setAsssubval] = useState("T");
  const [Data, setData] = useState([]);
  const [assDetail, setAssDetail] = useState([]);

  const utf8 = require("utf8");
  const objectArray = Object.values(props.data);
  console.log("Test", objectArray);

  useEffect(() => {
    if (Object.keys(props.data).length === 0) {
      setData([]);
    } else {
      setAsscodnam(objectArray[0]);
      setAsscodeng(objectArray[11]);
      setAsscod(objectArray[4]);
      getData();
    }
  }, []);

  const getData = async () => {
    const params_detail = {
      params: {
        dbServiceName: "MSAssassmentDetailList",
        AssCod: asscod,
      },
    };
    console.log(params_detail,"asscod ");

    axios
      .get(`${kdms_internet_protocol_DBService_JSON_path}`, params_detail)
      .then(async (response) => {
        try {
          let response_data = await response.data;
          console.log(response_data.result,"dataaaaaaaaaaaaaa");
          setAssDetail(response_data.result);

          setAsssubnam(assDetail.HmdDtlNam);
          setAsssubeng(assDetail.HmdDtlEng)
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (Object.keys(props.data).length === 0) {
      setData([]);
    } else {
      setAsscodnam(objectArray[0]);
      setAsscodeng(objectArray[11]);
      setData([]);
    }
  }, []);

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
        setAsssubval("T");
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

  const ClearData = () => {
    setTimeout(() => {
      setAsscodnam("");
      setAsscodeng("");
      setAsssubnam("");
      setAsssubeng("");
    }, 500);
  };

  // const items = () => {

  return (
    <div>
      {objectArray.length === 0 ? (
        <div>
          <div
            onClick={() => setShowModal(true)}
            className="shadow-lg h-32 hover:bg-slate-200 "
            style={{ borderRadius: "7px" }}
          >
            <img
              className="ml-5 mt-2"
              src={message}
              alt=""
              style={{ height: "2.5rem" }}
            />
            <div>
              {/* {e.data} */}
              <p className="mt-5 ml-5">Short Answer</p>
            </div>
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
                        <div className="grid grid-cols-8 bg-white space-y-5">
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
                              value={asscodnam}
                              onChange={(e) => setAsscodnam(e.target.value)}
                            />
                          </div>
                          <div className=" text-right text-neutral-500">EN</div>
                          <div className="col-span-7">
                            <input
                              type="text"
                              placeholder="Question"
                              className=" w-10/12 border-b outline-0 pl-3"
                              value={asscodeng}
                              onChange={(e) => setAsscodeng(e.target.value)}
                            />
                          </div>

                          <div className=""></div>
                          <div className="col-span-7 ">
                            <input
                              type="text"
                              placeholder="ข้อความคำตอบสั้นๆ"
                              className=" w-10/12 border-b outline-0 pl-3 text-xs"
                              value={asssubnam}
                              onChange={(e) => setAsssubnam(e.target.value)}
                            />
                          </div>
                          <div className=""></div>
                          <div className="col-span-7 ">
                            <input
                              type="text"
                              placeholder="Short Answer"
                              className=" w-10/12 border-b outline-0 pl-3 text-xs"
                              value={asssubeng}
                              onChange={(e) => setAsssubeng(e.target.value)}
                            />
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
      ) : (
        <>
          <div
            onClick={() => setShowModal(true)}
            className="shadow-lg h-32 hover:bg-slate-200 "
            style={{ borderRadius: "7px" }}
          >
            <img
              className="ml-5 mt-2"
              src={message}
              alt=""
              style={{ height: "2.5rem" }}
            />
            <div>
              {/* {e.data} */}
              <p className="mt-5 ml-5">Short Answer</p>
            </div>
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
                        <div className="grid grid-cols-8 bg-white space-y-5">
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
                              value={asscodnam}
                              onChange={(e) => setAsscodnam(e.target.value)}
                            />
                          </div>
                          <div className=" text-right text-neutral-500">EN</div>
                          <div className="col-span-7">
                            <input
                              type="text"
                              placeholder="Question"
                              className=" w-10/12 border-b outline-0 pl-3"
                              value={asscodeng}
                              onChange={(e) => setAsscodeng(e.target.value)}
                            />
                          </div>

                          <div className=""></div>
                          <div className="col-span-7 ">
                            <input
                              type="text"
                              placeholder="ข้อความคำตอบสั้นๆ"
                              className=" w-10/12 border-b outline-0 pl-3 text-xs"
                              value={asssubnam}
                              onChange={(e) => setAsssubnam(e.target.value)}
                            />
                          </div>
                          <div className=""></div>
                          <div className="col-span-7 ">
                            <input
                              type="text"
                              placeholder="Short Answer"
                              className=" w-10/12 border-b outline-0 pl-3 text-xs"
                              value={asssubeng}
                              onChange={(e) => setAsssubeng(e.target.value)}
                            />
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

                        <div className="mt-8 text-right mr-24 ">
                          <button
                            onClick={() => {
                              setShowModal(false);
                            }}
                            className="border rounded-full px-6  py-1 border-gray-400 text-gray-500 font-semibold mr-10 hover:bg-slate-200 "
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {}}
                            className="border rounded-full px-9 h-9  py-1 bg-yellow-500 text-yellow-100 font-semibold hover:bg-yellow-400"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Shortans;
