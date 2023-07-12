import React, { useState } from "react";
import text from "../../../assets/img/text.svg";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import axios from "axios";
import Swal from "sweetalert2";
import delay from "delay";

function Description() {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState();
  const [asscod, setAsscod] = useState("");
  const [asssub, setAsssub] = useState("1");
  const [asscodval, setasscodval] = useState("M");
  const [asscodnam, setAsscodnam] = useState("");
  const [asscodeng, setAsscodeng] = useState("");
  const [asssubnam, setAsssubnam] = useState("");
  const [asssubeng, setAsssubeng] = useState("");
  const utf8 = require("utf8");
  const [asssubval, setAsssubval] = useState("R");


  // const SaveAss = async () => {
  //   const respon = {
  //     params: {
  //       dbServiceName: "MSSaveAssessmentMaster",
  //       asscod: "", // code ลำดับคำถาม ถ้าเป็นคำถามใหม่ ''
  //       asssub: asssub, // code จำนวนคำตอบ
  //       asscodval: asscodval, // code type คำตอบ T= short text,R = radio,C=check box, PS = pain score, M = multiline
  //       asscodnam: utf8.encode(asscodnam), // คำถาม/คำตอบ ไทย
  //       asscodeng: asscodeng, // คำถาม/คำตอบ ENG
  //       asssubnam: utf8.encode(asssubnam), // dis คำตอบ
  //       asssubeng: asssubeng, // dis คำตอบ
  //       typcod: "I",
  //       uidcod: "BRBADMIN",
  //     },
  //   };

  //   if (
  //     asscodeng !== "" &&
  //     asscodnam !== "" &&
  //     asssubnam !== "" &&
  //     asssubeng !== ""
  //   ) {
  //     const { data } = await axios.get(
  //       `${kdms_internet_protocol_DBService_JSON_path}`,
  //       respon
  //     );

  //     delay(1000);
  //     // console.log(data);
  //     // console.log(data.Error.length === 1);
  //     // console.log("เซฟฮับ");
  //     Swal.fire({
  //       icon: "success",
  //       text: "สำเร็จ",
  //     });
  //     ClearData();
  //     setTimeout(() => {
  //       Swal.close();
  //     }, 4000);
  //     setShowModal(false);
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       text: "กรุณากรอกข้อมูลให้ครบ",
  //     });
  //     setTimeout(() => {
  //       Swal.close();
  //     }, 4000);
  //   }
  // };



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
        setAsssubval("M");
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
            src={text}
            alt=""
            style={{ height: "1.7rem" }}
          />
          <p className="mt-8 ml-5">Text Box</p>
        </div>

        {showModal ? (
          <div>
            <div
              onClick={() => {
                setHidden("hidden");
              }}
              className=" justify-center duration-1500 items-center flex overflow-x-hidden cursor-default overflow-y-auto fixed inset-0 z-100  "
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
                          <textarea
                            rows={5}
                            type="text"
                            placeholder="คำตอบ"
                            className=" w-10/12 border outline-0 pl-3 text-xs"
                            value={asssubnam}
                            onChange={(e) => setAsssubnam(e.target.value)}
                          />
                        </div>
                        <div className=""></div>
                        <div className="col-span-7 ">
                          <textarea
                            rows={5}
                            type="text"
                            placeholder="Answer"
                            className=" w-10/12 border outline-0 pl-3 text-xs"
                            value={asssubeng}
                            onChange={(e) => setAsssubeng(e.target.value)}
                          />
                        </div>
                      </div>
                      <div
                        className="mt-5 mx-10 text-gray-400"
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
    </div>
  );
}

export default Description;
