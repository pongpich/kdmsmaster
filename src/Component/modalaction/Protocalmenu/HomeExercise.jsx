import React, { useEffect, useState } from "react";
import Bin from "../../../assets/img/trash.square.svg";
import { PTCCodstate } from "../../../paths/ptcCod";
import { useRecoilState } from "recoil";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import axios from "axios";
import DD from "../../../assets/img/DD.svg";
import Swal from "sweetalert2";

function HomeExercise() {
  const [modal, setModal] = useState();
  const [hidden, sethidden] = useState("hidden");
  const [modal2, setModal2] = useState();
  const [isCollapsed, setIsCollapsed] = useState();
  const [count, setCount] = useState("1");
  const [PTC] = useRecoilState(PTCCodstate);
  const [dataex, setdataex] = useState("");
  const [railCards, setRailCards] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    getlistEx();
  }, []);

  const SavePost = async () => {
    // const HandleClack = () => {
    let newArray = dataex.filter((dataex) =>
      railCards.some((railCards) => railCards.value === dataex.PteCod)
    );

    let NewResult = [];
    NewResult.push(newArray);
    setResult(newArray);
    console.log(
      result,
      "NewResultNewResultNewResultNewResultNewResultNewResultNewResultNewResultNewResultNewResult"
    );

    for (let i = 0; i < newArray.length; i++) {
      const element = newArray[i];
      console.log(element, "element", i);

      const reques = {
        params: {
          dbServiceName: "MSSaveProtocolDetailMaster",
          ptlcod: PTC.ptlcod, //code
          settyp: element.Ptset.trim(), //of data <-- PTT,PTV,SGT,ASSMENT,MED มีอะไรบ้างส่งไปตามนั้น
          setprd: "1", //week
          setseq: "", //row of record, //PTT record ที่ ?
          dtlcod: element.PteCod.trim(), // code ของ แต่ละหัวข้อ
          typcod: "I", // of instruction <-- I : insert , U : update, D : delete
          uidcod: "BrbAdmin", //input user
        },
      };

      const { data } = await axios.get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        reques
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
    }

    console.log(newArray, "newArraynewArraynewArray");
    setModal2(false);
  };

  const getlistEx = async () => {
    const request_Exercise = {
      params: {
        dbServiceName: "MSExcerciseHeaderList",
      },
    };

    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Exercise
    );

    if (data != "") {
      setdataex(data.result);
    } else {
      getlistEx();
    }

    console.log(data.result);
  };

  const handleRailCardCLick = () => {
    let id = Math.floor(Math.random() * 1000000);
    setRailCards([
      ...railCards,
      {
        value: "",
        fieldName: `railcard-${railCards.length + 1}`,
        Code: "",
        count: 1,
        id,
      },
    ]);
  };

  const handleSelectRailcard = (event) => {
    const index = event.target.getAttribute("data-index");
    let value = event.target.value;

    if (value === "Select Rail Card") {
      value = "";
    }
    const updatedRailCards =
      railCards &&
      railCards.map((i) => {
        if (i.id === +index) {
          i.value = value;
        }
        return i;
      });
    setRailCards(updatedRailCards);
    console.log(updatedRailCards, "172");
  };

  const handleRemoveRailcard = (id) => {
    const updatedRailCards = railCards && railCards.filter((r) => r.id !== id);
    setRailCards(updatedRailCards);
  };

  // console.log("xx", railCards);

  const Clear = () => {
    setRailCards([]);

    console.log("cl");
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-1 ">
          <img src={DD} alt="" width="24" className="ml-1" />
        </div>
        <div className="col-span-11 font-medium">
          <div className="text-md font-semibold">
            Patient's Home Exercise Program
            <span
              onClick={() => setModal(true)}
              className="mx-3 px-3 bg-neutral-200 rounded cursor-pointer"
            >
              +
            </span>
            <span className="text-xs text-neutral-500"> Add week</span>
          </div>
          <div className="text-xs text-neutral-500  font-semibold ">
            EW(1-7){" "}
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
          <div>EW1</div>
          <div className=" border-l-2 border-neutral-500  h-4/6 mx-4"></div>
          <div className="flex">
            <div className=" rounded-full w-3 h-3 bg-neutral-800 ml-2.5"></div>
            <div className=" text-xs">Ew-2</div>
          </div>
        </div>
        <div
          className={`col-span-11 font-medium collapse-content ${
            !isCollapsed ? "expanded duration-500" : "collapsed duration-500"
          }`}
          aria-expanded={isCollapsed}
        >
          <div className="text-md flex items-center font-semibold">
            Week {count}
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

          <div className=" col-span-8 items-start text-sm">
            {result &&
              result.map((i, key) => (
                <div className=" flex space-x-2" key={key}>
                  <div>
                    {i.PteCod} {i.PteExcNam}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {modal2 ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
            <div className="flex justify-center m-5  text-base w-3/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                  <img src={DD} alt="" width="24" className="ml-1" />
                  Patient's Home Exercise Program
                </div>

                <div className=" bg-neutral-100 h-80 ">
                  <div className=" text-center py-5 mx-5 ">
                    <div className="py-2">เลือกท่าออกกำลังกาย</div>
                    <div className="passanger-dropdown-item--left w-100">
                      <button
                        type="button"
                        className="btn custom-link mb-2"
                        onClick={handleRailCardCLick}
                      >
                        Add Exercise
                      </button>
                      {railCards &&
                        railCards.map(
                          ({ value, fieldName, count, id }, index) => (
                            <div
                              key={id}
                              className="passanger-dropdown-item--content p-0"
                            >
                              <select
                                defaultValue={value}
                                name={fieldName}
                                className="form-control passanger-dropdown-item--select w-70 mr-1"
                                data-index={id}
                                onChange={handleSelectRailcard}
                              >
                                {dataex.map((i) => (
                                  <>
                                    <option
                                      key={i.PteCod}
                                      defaultValue={i.PteCod}
                                      value={i.PteCod}
                                    >
                                      {i.PteExcNam}
                                    </option>
                                  </>
                                ))}
                              </select>

                              <button
                                type="button"
                                className="btn passanger-dropdown-item--btn"
                                onClick={() => handleRemoveRailcard(id)}
                              >
                                x
                              </button>
                            </div>
                          )
                        )}
                      <br />
                    </div>
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
                    onClick={() => Clear()}
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

export default HomeExercise;
