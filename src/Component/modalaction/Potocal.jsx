import React, { useEffect, useState } from "react";
import Xicon from "../../assets/img/xmark.square.fill.svg";
import Num123 from "../../assets/img/123.rectangle.svg";
import Filemenu from "../../assets/img/filemenu.and.selection.svg";
import Overview from "./Protocalmenu/Overview";
import Post from "./Protocalmenu/Post";
import Enhanced from "./Protocalmenu/Enhanced";
import Active from "./Protocalmenu/Active";
import HomeExercise from "./Protocalmenu/HomeExercise";
import Kdmspatient from "./Protocalmenu/Kdmspatient";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../paths/api-path";
import Protocalcard from "../../assets/img/rectangle.topthird.inset.filled.svg";
import THicon from "../../assets/img/TH.svg";
import Enicon from "../../assets/img/EN.svg";
import OverviewIcon from "../../assets/img/text.justify.left.svg";
import Overviewicon from "../../assets/img/text.justify.left.svg";
import { PTVSetstate } from "../../paths/state";
import { useRecoilState, useRecoilValue } from "recoil";
import { PTCCodstate } from "../../paths/ptcCod";
import { PTVstate } from "../../paths/ptvbox";
import { SGTstate } from "../../paths/sgtbox";
import { MEDstate } from "../../paths/medbox";
import { PTTstate } from "../../paths/pttbox";
import delay from "delay";
import Med from "./Protocalmenu/Med";
import Swal from "sweetalert2";

function Potocal(e) {
  const [toggle, setToggle] = useState(true);
  const toggleClass =
    " transform translate-x-5 bg-blue text-blue-700 duration-500";
  // const [hidden, setHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState();
  const [newcode, setNewcode] = useState(false);
  const [ptlcod, setPtlcod] = useState("");
  const [ptltyp, setPtltyp] = useState("");
  const [ptlprd, setPtlprd] = useState("");
  const [prdtyp, setPrdtyp] = useState("W");
  const [namtha, setNamtha] = useState("");
  const [nameng, setNameng] = useState("");
  const [ovveng, setOvveng] = useState("");
  const [ovvtha, setOvvtha] = useState("");
  const [dsctha, setDsctha] = useState("");
  const [dscrng, setDscrng] = useState("");
  const [iconpth, setIconpth] = useState("");
  // const [BodyList, setBodyList] = useState([]);
  const [idBody, setIdBody] = useState({ HpmEng: "", Hpmnam: "" });
  const [modal, setModal] = useState(false);
  const [objmodal, setobjModal] = useState("");
  const utf8 = require("utf8");
  const [ptcCod, setptcCod] = useRecoilState(PTCCodstate);
  const [PTT] = useRecoilState(PTTstate);
  // const [PTV] = useRecoilState(PTVstate);
  const [SGT] = useRecoilState(SGTstate);
  const [MED] = useRecoilState(MEDstate);
  const [listedit, setlistedit] = useState([]);
  const [Check, setCheck] = useState("");
  const [Click, setClick] = useState("0");
  const [program, setProgram] = useState("");

  const [dataEdit, setDataEdit] = useState([]);
  // const [testData, setTestData] = useState([])

  useEffect(() => {
    GetData();
  }, []);

  const SaveHeader = async () => {
    const params_Body = {
      params: {
        dbServiceName: "MSSaveProtocolHeader",
        ptlcod: ptlcod, //code,
        ptltyp: "", //body , //type <-- ที่เอาจากของต้า
        ptlprd: ptlprd,
        prdtyp: prdtyp, //type  Exp. W : weeks, D : Days
        namtha: utf8.encode(namtha),
        nameng: nameng, //eng,
        ovvtha: utf8.encode(ovvtha), // th,
        ovveng: ovveng, // eng,
        dsctha: utf8.encode(dsctha), // th,
        dsceng: dscrng, // eng,
        iconpth: iconpth, // path,
        typcod: "I", // of instruction <-- I : insert , U : update, D : delete
        uidcod: "BrbAdmin", // user
      },
    };
    await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      params_Body
    );

    setptcCod({ ptlcod: ptlcod });
  };
  const GetData = async () => {
    const request_protocol = {
      params: {
        dbServiceName: "MSProtocolHeaderList",
      },
    };

    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_protocol
    );

    console.log(data, "Protocal");

    if (data != "") {
      setProgram(data.result);
    } else {
      GetData();
    }
  };
  // useEffect(async () => {
  //   const request_Body = {
  //     params: {
  //       dbServiceName: "MSExcerciseBodyList",
  //     },
  //   };
  //   await delay(1000);
  //   const { data } = await axios.get(
  //     `${kdms_internet_protocol_DBService_JSON_path}`,
  //     request_Body
  //   );
  //   setBodyList(data.result);
  // }, []);

  useEffect(() => {
    EditDetail();
  }, [dataEdit]);

  // const handleChange = (e) => {
  //   console.log(e);
  //   const filteredArray = BodyList.filter((data, index) => {
  //     return data.BdyCod === e;
  //   });
  //   console.log(filteredArray);
  //   filteredArray.map((data) => {
  //     setIdBody({ HpmEng: data.HpmEng, Hpmnam: data.HpmNam });
  //   });

  //   setNameng(idBody.HpmEng);
  //   setNamtha(idBody.Hpmnam);
  // };
  // const SET = [];

  // // console.log(useRecoilValue(PTVSetstate));
  // for (let i = 0; i < PTV.length; i++) {
  //   const SetPTV = PTV[i];
  //   SET.push(SetPTV);
  // console.log(PTV, "SetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTVSetPTV");
  // }
  const Savedetail = async () => {
    if (Click === "1") {
      Swal.fire({
        icon: "success",
        text: "สำเร็จ",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);

      setShowModal(false);
      setClick("");
    } else {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูล",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);
    }
  };

  const EditDetail = async () => {
    const params_Body = {
      params: {
        dbServiceName: "MSProtocolMasterDetail",
        ptlcod: dataEdit.PshCod, //code,
      },
    };

    try {
      const { data } = await axios.get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        params_Body
      );
      // let responseData = response.data.result;
      // console.log(response.data.result, "responseData");
      console.log(data, "liseedit");
      setlistedit(data.result);
      // setImgFile(data?.data)
    } catch (error) {
      console.log(error);
    }
    console.log(listedit, "liseedit");

    // console.log(responseData, "data.result");
    // if (data.result !== "") {
    // setlistedit(data.result);
    // }
    console.log("......................");
    console.log(listedit);
    console.log("......................");
  };

  let SGTResultdata = [];
  let PTVResultdata = [];
  let MEDResultdata = [];
  let PTTResultdata = [];
  let ASSResultdata = [];
  let EXCResultdata = [];

  // if (listedit) {
  //   const SGTResult = listedit.filter((data) => {
  //     return data.TypTopic === "SGT                 ";
  //   });
  //   SGTResultdata.push(SGTResult);
  //   console.log(SGTResult, "someResult"); // true

  //   const PTVResult = listedit.filter((data) => {
  //     return data.TypTopic === "PTV                 ";
  //   });
  //   PTVResultdata.push(PTVResult);

  //   console.log(PTVResult, "PTVResult"); // true

  //   const MEDResult = listedit.filter((data) => {
  //     return data.TypTopic === "MED                 ";
  //   });
  //   MEDResultdata.push(MEDResult);

  //   console.log(MEDResult, "MEDResult"); // true

  //   const PTTResult = listedit.filter((data) => {
  //     return data.TypTopic === "PTT                 ";
  //   });
  //   PTTResultdata.push(PTTResult);
  //   console.log(PTTResult, "PTTResult"); // true

  //   const ASSResult = listedit.filter((data) => {
  //     return data.TypTopic === "ASSMENT             ";
  //   });
  //   console.log(ASSResult, "ASSResult"); // true

  //   const EXCResult = listedit.filter((data) => {
  //     return data.TypTopic === "EXT1             ";
  //   });
  //   console.log(EXCResult, "EXCResult"); // true
  // }
  const [Checkptl, setCheckptl] = useState("");

  const CheckPtl = (e) => {
    const CheckPtlcod = program.some((data) => {
      return data.PshCod.trim() === e;
    });

    if (CheckPtlcod === true) {
      // setPtlcod(e);
      setCheckptl(CheckPtlcod);
      console.log(CheckPtlcod, "true"); // true
      setPtlcod(e);
    } else {
      setCheckptl(CheckPtlcod);
      setPtlcod(e);
    }
    console.log(Checkptl, "CheckPtlcod"); // true
  };

  const items = () => {
    return (
      <div>
        <div>
          <div>
            <div
              onClick={() => {
                setHidden("hidden");
              }}
              className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20  shadow-lg focus:outline-none backdrop-blur "
            >
              <div className="flex justify-center m-5 h-5/6 w-3/4 text-base cursor-default">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                  <div className="px-2 py-3 bg-blue">
                    <div className=" flex justify-between leading-relaxed space-x-15 blue-dark text-2xl font-semibold">
                      Protocol Master
                      <div
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        <img
                          src={Xicon}
                          alt=""
                          className="h-10 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className=" text-white text-lg">แผนการรักษา</p>
                  </div>
                  <div className="bg-white pt-5 px-5 space-y-6">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1">
                        <img src={Num123} width="28" />
                      </div>
                      <div className="col-span-11 font-medium">
                        <div className="grid grid-cols-11">
                          <div className="text-md font-semibold flex space-x-2">
                            {" "}
                            <p>Code</p> <p className="text-red-600">*</p>{" "}
                          </div>
                          <div className=" col-span-8">
                            <input
                              type="text"
                              className={`w-28 border-b focus:right-0 focus:outline-none  text-center ${
                                Checkptl === true
                                  ? "border-red-600"
                                  : "border-black"
                              }`}
                              placeholder="input code"
                              // value={(e) => e.target.value}
                              onChange={(e) => CheckPtl(e.target.value)}
                            />
                            {Checkptl === true ? (
                              <p className="text-red-600 text-sm">
                                ข้อมูลซ้ำ กรุณากรอกข้อมูลใหม่
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <div className="flex col-span-8 space-x-3 items-start">
                            <input type="checkbox" className="mt-2" />
                            <p>Pre-Surgery</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-1">
                        <img src={Filemenu} width="28" />
                      </div>
                      <div className="col-span-11 font-medium">
                        <div className="grid grid-cols-11">
                          <div className="text-md font-semibold col-span-2">
                            <select
                              name="week"
                              id="week"
                              value={prdtyp}
                              onChange={(e) => setPrdtyp(e.target.value)}
                              className="w-28  bg-neutral-100 border cursor-pointer"
                            >
                              <option value="D">Days</option>
                              <option value="W">Weeks</option>
                              <option value="M">Month</option>
                            </select>
                          </div>
                          <div className="flex col-span-8 space-x-3 items-start">
                            <input
                              required
                              value={ptlprd}
                              onChange={(e) => setPtlprd(e.target.value)}
                              type="number"
                              className="w-10 border-b  outline-0 text-center required:border-red-600 valid:border-black"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12">
                      <div className="col-span-1">
                        <img src={Protocalcard} alt="" width="28" />
                      </div>
                      <div className="col-span-11 font-medium">
                        <div className="grid grid-cols-11">
                          <div className="text-md font-semibold col-span-1 flex space-x-2">
                            <p>Protocol</p> <p className="text-red-600"> *</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 ml-1">
                        <img src={THicon} width="18" alt="" />
                      </div>
                      <div className="col-span-11 font-medium">
                        <div className="grid grid-cols-11">
                          <div className="col-span-10 ">
                            <input
                              required
                              onChange={(e) => setNamtha(e.target.value)}
                              value={namtha}
                              className=" w-1/3 outline-0 border-b  required:border-red-600 valid:border-black"
                            />
                          </div>
                          <div className=" col-span-1">
                            <div
                              className=" w-16 h-9 flex items-center bg-slate-200 rounded-full p-1 cursor-pointer"
                              onClick={() => {
                                setToggle(!toggle);
                              }}
                            >
                              <div
                                className={
                                  " w-10 h-9 rounded-full  text-center pt-1 text-base  shadow-md transform duration-300 ease-in-out" +
                                  (!toggle ? "text-slate-400" : toggleClass)
                                }
                              >
                                {toggle ? "On" : "Off"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 ml-1">
                        <img src={Enicon} width="18" alt="" />
                      </div>

                      <div className="col-span-11 font-medium">
                        <div className="grid grid-cols-11">
                          <div className="col-span-10 text-neutral-500">
                            <input
                              required
                              onChange={(e) => setNameng(e.target.value)}
                              value={nameng}
                              className=" w-1/3 outline-0 border-b required:border-red-600 valid:border-black"
                            />
                            {/* {idBody.HpmEng} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-12">
                      <div className="col-span-1 ml-1">Body Path </div>

                      <div className="col-span-11 font-medium">
                        <select
                          name="body"
                          id="body"
                          // value={idBody.HpmEng}
                          onChange={(e) => setPtltyp(e.target.value)}
                          className="  bg-neutral-100 bordercursor-pointer"
                        >
                          {BodyList?.map((e, key) => (
                            <>
                              <option
                                key={key}
                                className=" overflow-scroll "
                                value={e.BdyCod}
                              >
                                {e.HpmEng}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div> */}
                    {/* <Protocaledit /> */}
                    <div>
                      <div className="grid grid-cols-12 ">
                        <div className="col-span-1">
                          <img src={Overviewicon} width="24" />
                        </div>
                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="text-md font-semibold flex space-x-2">
                              <p>Overview</p> <p className=" text-red-600">*</p>
                              <span
                                onClick={() => setModal(true)}
                                className="ml-3 px-1 rounded text-xs bg-neutral-200 cursor-pointer"
                              >
                                edit
                              </span>
                            </div>
                          </div>
                          <div className=" col-span-8 items-start text-sm py-3">
                            <p>{ovvtha}</p>
                            <p>{ovveng}</p>
                          </div>
                        </div>
                      </div>
                      {modal ? (
                        <div>
                          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                            <div className="flex justify-center m-5  text-base w-2/6">
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                  <img
                                    src={Overviewicon}
                                    alt=""
                                    width="24"
                                    className="mr-2"
                                  />
                                  Overview
                                </div>
                                <div className=" px-5 py-5 space-y-8">
                                  <textarea
                                    required
                                    value={ovvtha}
                                    onChange={(e) => setOvvtha(e.target.value)}
                                    placeholder="TH"
                                    rows={5}
                                    type="text"
                                    className="border outline-none w-full px-2 required:border-red-600 valid:border-black"
                                  />
                                  <textarea
                                    value={ovveng}
                                    onChange={(e) => setOvveng(e.target.value)}
                                    placeholder="EN"
                                    rows={5}
                                    type="text"
                                    className="border outline-none w-full px-2"
                                  />
                                  <div className=" flex space-x-9 justify-center font-medium text-sm">
                                    <div
                                      onClick={() => {
                                        setModal(false);
                                        setOvvtha("");
                                        setOvveng("");
                                      }}
                                      className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                                    >
                                      Cancel
                                    </div>
                                    <div
                                      onClick={() => {
                                        setOvvtha("");
                                        setOvveng("");
                                      }}
                                      className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                                    >
                                      Clear
                                    </div>
                                    <div
                                      onClick={() => setModal(false)}
                                      className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                                    >
                                      Add
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-12 ">
                      <div className="col-span-1">
                        <img src={Overview} alt="" width="28" />
                      </div>
                      <div className="col-span-11 font-medium">
                        <div className="grid grid-cols-11">
                          <div className="text-md font-semibold flex space-x-2">
                            <p>Objective</p> <p className=" text-red-600">*</p>
                            <span
                              onClick={() => setobjModal(true)}
                              className="ml-3 px-1 rounded text-xs bg-neutral-200 cursor-pointer"
                            >
                              edit
                            </span>
                          </div>
                        </div>
                        <div className=" col-span-8 items-start text-sm py-3">
                          <p>{dsctha}</p>
                          <p>{dscrng}</p>
                        </div>
                      </div>
                    </div>
                    {objmodal ? (
                      <>
                        <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                          <div className="flex justify-center m-5  text-base w-2/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                              <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                <img
                                  src={OverviewIcon}
                                  value={dscrng}
                                  alt=""
                                  width="24"
                                  className="mr-2"
                                />
                                Objective
                              </div>
                              <div className=" px-5 py-5 space-y-10">
                                <textarea
                                  onChange={(e) => setDsctha(e.target.value)}
                                  value={dsctha}
                                  rows={5}
                                  type="text"
                                  placeholder="TH"
                                  className="border outline-none w-full px-2"
                                />
                                <textarea
                                  onChange={(e) => setDscrng(e.target.value)}
                                  value={dscrng}
                                  rows={5}
                                  type="text"
                                  placeholder="EN"
                                  className="border outline-none w-full px-2"
                                />
                                <div className=" flex space-x-9 justify-center font-medium text-sm">
                                  <div
                                    onClick={() => {
                                      setobjModal(false);
                                      setDscrng("");
                                      setDsctha("");
                                    }}
                                    className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                                  >
                                    Cancel
                                  </div>
                                  <div
                                    onClick={() => {
                                      setDscrng("");
                                      setDsctha("");
                                    }}
                                    className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                                  >
                                    Clear
                                  </div>
                                  <div
                                    onClick={() => {
                                      SaveHeader();
                                      setobjModal(false);
                                      setClick("1");
                                    }}
                                    className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                                  >
                                    Add
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {Click === "1" ? (
                      <>
                        <Post />
                        <hr />
                        <Enhanced />
                        <hr />

                        <Active />
                        <hr />

                        <Med />
                        <hr />

                        <HomeExercise />
                        <hr />

                        <Kdmspatient />
                      </>
                    ) : (
                      <div></div>
                    )}
                    <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
                      <div
                        onClick={() => setShowModal(false)}
                        className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                      >
                        Cancel
                      </div>
                      {/* <div
                        onClick={() => EditDetail()}
                        className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                      >
                        Clear
                      </div> */}
                      <div
                        onClick={() => Savedetail()}
                        className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                      >
                        Add
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const itemsEdit = () => {
    return (
      <div>
        <div>
          <div>
            <div
              onClick={() => {
                setHidden("hidden");
              }}
              className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20  shadow-lg focus:outline-none backdrop-blur "
            >
              <div className="flex justify-center m-5 h-5/6 w-3/4 text-base cursor-default">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                  <div className="px-2 py-3 bg-blue">
                    <div className=" flex justify-between leading-relaxed space-x-15 blue-dark text-2xl font-semibold">
                      Protocol Master Edit
                      <div
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        <img
                          src={Xicon}
                          alt=""
                          className="h-10 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className=" text-white text-lg">แผนการรักษา</p>
                  </div>

                  {/* {dataEdit !== []? ( */}
                  <>
                    {/* {dataEdit.map((i, key) => ( */}
                    <div className="bg-white pt-5 px-5 space-y-6">
                      <div className="grid grid-cols-12">
                        <div className="col-span-1">
                          <img src={Num123} width="28" />
                        </div>
                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="text-md font-semibold">
                              Code
                              {/* <p
                                  className="text-xs underline text-blue-700 cursor-pointer"
                                  onClick={() => {
                                    setNewcode(true);
                                    // SaveHeader();
                                  }}
                                >
                                  New Code
                                </p> */}
                            </div>
                            <div>
                              {/* {newcode ? ( */}
                              <input
                                type="text"
                                className="w-28 border-b border-black text-center"
                                placeholder="input code"
                                value={dataEdit.PshCod}
                                onChange={(e) => {
                                  setPtlcod(e.target.value);
                                }}
                              />
                              {/* ) : (
                                  ""
                                )} */}
                            </div>
                            {/* <div className="flex col-span-8 space-x-3 items-start">
                            <input type="checkbox" className="mt-2" />
                            <p>Pre-Surgery</p>
                          </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-12">
                        <div className="col-span-1">
                          <img src={Filemenu} width="28" />
                        </div>
                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="text-md font-semibold col-span-2">
                              <select
                                name="week"
                                id="week"
                                value={prdtyp}
                                onChange={(e) => setPrdtyp(dataEdit.PshCod)}
                                className="w-28  bg-neutral-100 border cursor-pointer"
                              >
                                <option value="D">Days</option>
                                <option value="W">Weeks</option>
                                <option value="M">Month</option>
                              </select>
                            </div>
                            <div className="flex col-span-8 space-x-3 items-start">
                              <input
                                value={dataEdit.PshSetPrd}
                                onChange={(e) => setPtlprd(e.target.value)}
                                type="number"
                                className="w-10 border-b border-black outline-0 text-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-12">
                        <div className="col-span-1">
                          <img src={Protocalcard} alt="" width="28" />
                        </div>
                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="text-md font-semibold col-span-1">
                              Protocol
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 ml-1">
                          <img src={THicon} width="18" alt="" />
                        </div>
                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="col-span-10 ">
                              <input
                                onChange={(e) => setNamtha(e.target.value)}
                                value={dataEdit.PshNam}
                                className=" w-1/3 outline-0 border-b"
                              />
                            </div>
                            <div className=" col-span-1">
                              <div
                                className=" w-16 h-9 flex items-center bg-slate-200 rounded-full p-1 cursor-pointer"
                                onClick={() => {
                                  setToggle(!toggle);
                                }}
                              >
                                <div
                                  className={
                                    " w-10 h-9 rounded-full  text-center pt-1 text-base  shadow-md transform duration-300 ease-in-out" +
                                    (toggle ? "text-slate-400" : toggleClass)
                                  }
                                >
                                  {!toggle ? "On" : "Off"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 ml-1">
                          <img src={Enicon} width="18" alt="" />
                        </div>

                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="col-span-10 text-neutral-500">
                              <input
                                onChange={(e) => setNameng(e.target.value)}
                                value={dataEdit.PshNamEng}
                                className=" w-1/3 outline-0 border-b"
                              />
                              {/* {idBody.HpmEng} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="grid grid-cols-12">
                      <div className="col-span-1 ml-1">Body Path </div>

                      <div className="col-span-11 font-medium">
                        <select
                          name="body"
                          id="body"
                          // value={idBody.HpmEng}
                          onChange={(e) => setPtltyp(e.target.value)}
                          className="  bg-neutral-100 bordercursor-pointer"
                        >
                          {BodyList?.map((e, key) => (
                            <>
                              <option
                                key={key}
                                className=" overflow-scroll "
                                value={e.BdyCod}
                              >
                                {e.HpmEng}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div> */}
                      {/* <Protocaledit /> */}
                      <div>
                        <div className="grid grid-cols-12 ">
                          <div className="col-span-1">
                            <img src={Overviewicon} width="24" />
                          </div>
                          <div className="col-span-11 font-medium">
                            <div className="grid grid-cols-11">
                              <div className="text-md font-semibold">
                                Overview
                                <span
                                  onClick={() => setModal(true)}
                                  className="ml-3 px-1 rounded text-xs bg-neutral-200 cursor-pointer"
                                >
                                  edit
                                </span>
                              </div>
                            </div>
                            <div className=" col-span-8 items-start text-sm py-3">
                              <p>{dataEdit.PshOvvDsc}</p>
                              <p>{dataEdit.PshOvvEng}</p>
                            </div>
                          </div>
                        </div>
                        {modal ? (
                          <div>
                            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                              <div className="flex justify-center m-5  text-base w-2/6">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                  <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img
                                      src={Overviewicon}
                                      alt=""
                                      width="24"
                                      className="mr-2"
                                    />
                                    Overview
                                  </div>
                                  <div className=" px-5 py-5 space-y-8">
                                    <textarea
                                      value={ovvtha}
                                      onChange={(e) =>
                                        setOvvtha(e.target.value)
                                      }
                                      placeholder="TH"
                                      rows={5}
                                      type="text"
                                      className="border outline-none w-full px-2"
                                    />
                                    <textarea
                                      value={ovveng}
                                      onChange={(e) =>
                                        setOvveng(e.target.value)
                                      }
                                      placeholder="EN"
                                      rows={5}
                                      type="text"
                                      className="border outline-none w-full px-2"
                                    />
                                    <div className=" flex space-x-9 justify-center font-medium text-sm">
                                      <div
                                        onClick={() => setModal(false)}
                                        className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                                      >
                                        Cancel
                                      </div>
                                      <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700">
                                        Clear
                                      </div>
                                      <div
                                        onClick={() => setModal(false)}
                                        className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                                      >
                                        Add
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-12 ">
                        <div className="col-span-1">
                          <img src={Overview} alt="" width="28" />
                        </div>
                        <div className="col-span-11 font-medium">
                          <div className="grid grid-cols-11">
                            <div className="text-md font-semibold">
                              Objective
                              <span
                                onClick={() => setobjModal(true)}
                                className="ml-3 px-1 rounded text-xs bg-neutral-200 cursor-pointer"
                              >
                                edit
                              </span>
                            </div>
                          </div>
                          <div className=" col-span-8 items-start text-sm py-3">
                            <p>{dataEdit.PshObjDsc}</p>
                            <p>{dataEdit.PshObjEng}</p>
                          </div>
                        </div>
                      </div>
                      {objmodal ? (
                        <>
                          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                            <div className="flex justify-center m-5  text-base w-2/6">
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                  <img
                                    src={OverviewIcon}
                                    value={dscrng}
                                    alt=""
                                    width="24"
                                    className="mr-2"
                                  />
                                  Objective
                                </div>
                                <div className=" px-5 py-5 space-y-10">
                                  <textarea
                                    onChange={(e) => setDsctha(e.target.value)}
                                    value={dsctha}
                                    rows={5}
                                    type="text"
                                    placeholder="TH"
                                    className="border outline-none w-full px-2"
                                  />
                                  <textarea
                                    onChange={(e) => setDscrng(e.target.value)}
                                    value={dscrng}
                                    rows={5}
                                    type="text"
                                    placeholder="EN"
                                    className="border outline-none w-full px-2"
                                  />
                                  <div className=" flex space-x-9 justify-center font-medium text-sm">
                                    <div
                                      onClick={() => setobjModal(false)}
                                      className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                                    >
                                      Cancel
                                    </div>
                                    <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700">
                                      Clear
                                    </div>
                                    <div
                                      onClick={() => {
                                        SaveHeader();
                                        setobjModal(false);
                                        setClick("1");
                                      }}
                                      className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                                    >
                                      Add
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                      {/* {Click === "1" ? ( */}
                      <>
                        <Post data={listedit} test="test" />
                        <hr />
                        <Enhanced data={PTTResultdata} />
                        <hr />
                        <Active data={SGTResultdata} />
                        <hr />
                        <Med data={MEDResultdata} />
                        <hr />
                        <HomeExercise />
                        <hr />
                        <Kdmspatient />
                      </>
                      {/*   ) : (
                      <div></div>>
                    )}  */}
                      <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
                        <div
                          onClick={() => setShowModal(false)}
                          className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                        >
                          Cancel
                        </div>
                        <div
                          onClick={() => EditDetail()}
                          className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                        >
                          Clear
                        </div>
                        <div
                          onClick={() => Savedetail()}
                          className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                        >
                          Add
                        </div>
                      </div>
                      <br />
                    </div>
                    {/* ))}{" "} */}
                  </>
                  {/* ) : ( */}
                  {/* ""
                  )} */}
                  {console.log(dataEdit)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (e.data.data === "p1") {
    const setP1 = () => {
      setDataEdit(e.data.id);
      setShowModal(true);
    };
    return (
      <div>
        <div>
          <a
            onClick={() => {
              setP1();
            }}
            className={` px-4 py-2 text-sm text-neutral-700 flex flex-row  hover:bg-neutral-100 
    `}
          >
            <span className="text-center p2-4">View / Edit</span>
          </a>
          {showModal ? <div>{itemsEdit()}</div> : null}
        </div>
      </div>
    );
  }

  if (e.data === "p2") {
    return (
      <div>
        <div>
          <button
            className="add h-8 mx-5 rounded-2xl font-bold py-1 cursor-pointer w-24 border  text-center bg-blue-500 text-white"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
          {showModal ? <div>{items()}</div> : null}
        </div>
      </div>
    );
  }
}

export default Potocal;
