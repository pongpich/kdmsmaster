import React, { useEffect, useState } from "react";
import Bin from "../../../assets/img/trash.square.svg";
import Medicon from "../../../assets/img/pill.png";

import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import { useRecoilState } from "recoil";
import { MEDstate } from "../../../paths/medbox";
import { PTCCodstate } from "../../../paths/ptcCod";
import Swal from "sweetalert2";

function Med(e) {
  const [isCollapsed, setIsCollapsed] = useState();
  const [modal, setModal] = useState();
  const [modal2, setModal2] = useState();
  const [tmlcod, setTmlcod] = useState("");
  const [tmltyp, setTmltyp] = useState("MED");
  const [namtha, setNamtha] = useState("");
  const [nameng, setNameng] = useState("");
  const [dsctha, setDsctha] = useState("");
  const [dsceng, setDsceng] = useState("");
  const [namurl, setNamurl] = useState("");
  const [SGTlist, setSGTlist] = useState("");
  const [MEDlist, setMEDlist] = useState("");
  const [Arrlist, setArrlist] = useState([]);
  const [typcod, setTypcod] = useState("I");
  const [MED, setMED] = useRecoilState(MEDstate);
  const [count, setCount] = useState("1");
  const [PTC] = useRecoilState(PTCCodstate);
  const [Medresult, setMedresult] = useState(e.data);

  const utf8 = require("utf8");

  // console.log(Medresult, "MEDResultMEDResultMEDResult");

  // if (e.data !== []) {
    // setMedresult();
  // }

  useEffect(async () => {
    const request_MED = {
      params: {
        dbServiceName: "MSMEDMasterList",
      },
    };
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_MED
    );
    setMEDlist(data.result);
  }, []);

  useEffect(() => {
    console.log("name", namtha);
  }, [namtha]);
  // let setcod = tmlcod ;

  // console.log("SavePostSavePostSavePostSavePost ", tmlcod);

  const SavePost = async () => {
    console.log(tmlcod, "tmlcodtmlcodtmlcod");

    const params_Body = {
      params: {
        dbServiceName: "MSSaveTreatmentlinkMaster",
        tmlcod: tmlcod.trim(), //order code
        tmltyp: tmltyp.trim(), //type of order : PTV: post operative , PTT: enchanced recovery, SGT: ตำแนะนำการเคลื่อนไหว
        namtha: namtha.trim(), //ชื่อ ไทย
        nameng: nameng.trim(), //ชื่อ eng
        dsctha: dsctha.trim(), //รายละเอียดไทย
        dsceng: dsceng.trim(), //รายละเอียด eng
        namurl: namurl.trim(), //ลิ้ง (ถ้ามี)
        typcod: typcod.trim(), // of instruction <-- I : insert , U : update, D : delete
        uidcod: "BrbAdmin", // user
      },
    };
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      params_Body
    );
    let respon = data.result[0].result;
    if (respon === "insert success" || respon === "update success") {
      Swal.fire({
        icon: "success",
        text: "สำเร็จ",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);
      setModal2(false);
    } else {
      Swal.fire({
        icon: "error",
        text: "Error",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);
    }
    SaveDetail();

    // console.log(PTC.ptlcod,"PTC.ptlcod");

    setMED([{ SetTyp: tmltyp.trim(), SetPrd: count, DtlCod: tmlcod.trim() }]);
    // SaveDetail();
  };

  const SetDataArr = useEffect(() => {
    setTmlcod(Arrlist.TmlCod);
    setNamtha(Arrlist.TmlTlt);
    setNameng(Arrlist.TmlTltEng);
    setDsctha(Arrlist.TmlDsc);
    setDsceng(Arrlist.TmlDscEng);

    if (Arrlist.TmlCod !== undefined && tmlcod !== undefined) {
      if (tmlcod.trim() == Arrlist.TmlCod.trim()) {
        setTypcod("U");

        console.log(tmlcod == Arrlist.TmlCod);
        console.log(typcod);
      }
    } else {
      setTmlcod("");
      setNamtha("");
      setNameng("");
      setDsctha("");
      setDsceng("");
    }
    
  }, [
    Arrlist.TmlCod,
    Arrlist.TmlDsc,
    Arrlist.TmlDscEng,
    Arrlist.TmlTlt,
    Arrlist.TmlTltEng,
  ]);

  const SaveDetail = async () => {
    const reques = {
      params: {
        dbServiceName: "MSSaveProtocolDetailMaster",
        ptlcod: PTC.ptlcod, //code
        settyp: tmltyp, //of data <-- PTT,PTV,SGT,ASSMENT,MED มีอะไรบ้างส่งไปตามนั้น
        setprd: count, //week
        setseq: "", //row of record, //PTT record ที่ ?
        dtlcod: tmlcod.trim(), // code ของ แต่ละหัวข้อ
        typcod: "I", // of instruction <-- I : insert , U : update, D : delete
        uidcod: "BrbAdmin", //input user
      },
    };
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      reques
    );
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <img src={Medicon} alt="" width="28" className="ml-1" />
        </div>
        <div className="col-span-11 font-medium">
          <div className="text-md font-semibold">
            Medicine
            <span
              onClick={() => setModal(true)}
              className="mx-3 px-3 bg-neutral-200 rounded cursor-pointer"
            >
              +
            </span>
            <span className="text-xs text-neutral-500"> Add week</span>
          </div>
          <div className="text-xs text-neutral-500  font-semibold ">
            AW(1-2){" "}
            <span
              className=" text-blue-800 underline cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              Hide All
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-1 ">
          <div>AW1</div>
          <div className=" border-l-2 border-neutral-500  h-4/6 mx-4"></div>
          <div className="flex">
            <div className=" rounded-full w-3 h-3 bg-neutral-800 ml-2.5"></div>
            <div className=" text-xs">Aw-2</div>
          </div>
        </div>
        <div
          className={`col-span-11 font-medium collapse-content ${
            !isCollapsed ? "expanded duration-500" : "collapsed duration-500"
          }`}
          aria-expanded={isCollapsed}
        >
          <div className="text-md flex items-center font-semibold">
            Week 1
            <span
              onClick={() => setModal2(true)}
              className="mx-3 px-1 rounded bg-neutral-200 text-xs cursor-pointer"
            >
              edit
            </span>
            <span className="">
              <img src={Bin} alt="" width={20} />
            </span>
          </div>
          {/* {Medresult !== [] &&
            Medresult[0].map((i, x) => (
              <div className=" col-span-8 items-start text-sm my-2">
                <div className=" ">Code : {i.DetailCode}</div>
                <div className=" ">
                  Title : {i.Name} / {i.nameng}
                </div>
                <div className="">Description TH : {i.DetailName}</div>
                <div className=" ">Description EN : {i.DetailNameEng}</div>
                <hr/>
              </div>
            ))} */}
        </div>
      </div>

      {modal2 ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
            <div className="flex justify-center m-5  text-base w-3/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                  <img src={Medicon} alt="" width="24" className="mr-2" />
                  Medicine
                </div>
                <div className="grid grid-cols-6 gap-2  bg-neutral-100 ">
                  <div className="col-span-2 text-center py-5">
                    <div className="h-80 overflow-y-auto">
                      {MEDlist.map((i, key) => (
                        <div
                          key={key}
                          onClick={() => {
                            setArrlist(MEDlist[key]);
                            SetDataArr();
                          }}
                          className=" flex-row text-left hover:bg-neutral-200  cursor-pointer"
                        >
                          {/* {console.log(Arrlist)} */}
                          <div className="border-b-2 mx-3 py-1 truncate">
                            <div> {i.TmlTlt}</div>
                            <div className="font-thin truncate ">
                              {i.TmlDsc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" py-5 col-span-4 grid grid-cols-5">
                    <div className=" col-span-1">Code :</div>
                    <input
                      className="col-span-4 w-1/2 "
                      onChange={(e) => setTmlcod(e.target.value)}
                      value={tmlcod}
                    />

                    <div className="col-span-5 my-2 grid grid-cols-5">
                      <div className=" col-span-1">Title :</div>
                      <div className="col-span-2">
                        <input
                          className=" w-11/12 pl-2"
                          placeholder="TH"
                          onChange={(e) => setNamtha(e.target.value)}
                          value={namtha}
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          className="  w-11/12 pl-2"
                          placeholder="EN"
                          onChange={(e) => setNameng(e.target.value)}
                          value={nameng}
                        />
                      </div>
                    </div>

                    <textarea
                      onChange={(e) => setDsctha(e.target.value)}
                      placeholder="TH"
                      rows={5}
                      type="text"
                      className="border my-2 outline-none w-full px-2 col-span-4"
                      value={dsctha}
                    />
                    <textarea
                      onChange={(e) => setDsceng(e.target.value)}
                      placeholder="EN"
                      rows={5}
                      type="text"
                      className="border outline-none w-full px-2 col-span-4"
                      value={dsceng}
                    />
                  </div>
                </div>
                <div className=" flex space-x-9 justify-center font-medium text-sm bg-neutral-100 py-3">
                  <div
                    onClick={() => setModal2(false)}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => {
                      setArrlist(["0"]);
                      SetDataArr();
                    }}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                  >
                    Clear
                  </div>
                  <div
                    onClick={() => SavePost()}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Med;
