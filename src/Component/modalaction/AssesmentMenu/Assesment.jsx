import React, { useState, useEffect } from "react";
import Xicon from "../../../assets/img/xmark.square.fill.svg";
// import { Link } from "react-router-dom";
import Shortans from "./Shortans";
import Description from "./Description";
import Options from "./Options";
import Multiple from "./Multiple";
import Score from "./Score";
import Twobar from "./Twobar";
import Bicon from "../../../assets/img/checklist.svg";
import ABicon from "../../../assets/img/square.svg";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import { FiCrop } from "react-icons/fi";
import delay from "delay";

function Assesment(e) {
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState();
  const [Assm, setAssm] = useState("");
  const [Arrdata, setArrdata] = useState([]);
  const [showModelDetail, setShowModelDetail] = useState(true);

  useEffect(() => {
    Getdata();
  }, []);
  // useEffect(() => {
  //   first;

  //   return () => {
  //     second;
  //   };
  // }, [Arrdata]);

  const Getdata = async () => {
    const request_Assassment = {
      params: {
        dbServiceName: "MSAssassmentHeaderList",
      },
    };
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Assassment
    );
    await delay(1000);
    setAssm(data.result);
  };

  const Loading = () => {
    setTimeout(() => {
      <div>loading ....</div>;
      console.log("time");
    }, 1000);
    Getdata();
  };

  const items = () => {
    return (
      <div>
        <div>
          <div
            onClick={() => {
              setHidden(true);
            }}
            className="justify-center flex overflow-x-hidden cursor-default  overflow-y-hidden fixed inset-0 z-100 shadow-lg focus:outline-none backdrop-blur  font-bold"
          >
            <div className="flex justify-center m-5 h-5/6 w-3/4">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                <div className="px-2 py-3 yellow">
                  <div className=" flex justify-between leading-relaxed space-x-15 yellow text-2xl font-semibold">
                    Assesment Master
                    <div>
                      <img
                        src={Xicon}
                        alt=""
                        className="h-10 cursor-pointer"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      />
                    </div>
                  </div>
                  <p className=" text-white text-lg">แบบประเมิน</p>
                </div>
                {/*  <div className="w-full h-full container mx-auto flex place-content-center items-center -mt-3 col-span-2">
                </div>*/}
                <div className="grid grid-cols-12 h-full">
                  <div className=" col-span-3 h-5/6 overflow-y-auto">
                    <div className=" col-span-3 borde">
                      <div
                        className="border-b-2 border-indigo-50 py-5 flex c"
                        onClick={() => setArrdata([])}
                      >
                        <img
                          src={Bicon}
                          alt=""
                          style={{ height: "1.5rem", marginLeft: "25px" }}
                        />
                        <p>Assesment Libraries</p>
                        <div
                          onClick={() => {
                            setShowModelDetail(true);
                            setArrdata([]);
                          }}
                          className="yellow text-right ml-5 text-sm px-1 rounded-lg items-center py-1"
                        >
                          Add
                        </div>
                      </div>
                      {Assm?.length > 0 ? (
                        <div className="">
                          {Assm?.map((i, key) => (
                            <div className="hover:bg-yellow-50">
                              <div
                                key={key}
                                className="grid grid-cols-5 border-b-2 border-indigo-50 py-2 mx-3 "
                              >
                                <div className=" col-span-4 text-sm">
                                  <div>{i.HpmEng}</div>
                                  <div>{i.HpmNam}</div>
                                </div>
                                <div className="items-center justify-self-center">
                                  <img
                                    src={ABicon}
                                    width={15}
                                    onClick={() => {
                                      setArrdata(Assm[key]);
                                      setShowModelDetail(false);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          {console.log(Arrdata.types)}
                          {console.log(Arrdata)}
                        </div>
                      ) : (
                        <div>{Loading()}</div>
                      )}
                    </div>
                  </div>
                  <div className=" col-span-8">
                    {showModelDetail === true ? (
                      <div className="text-yellow-300 py-3 ml-4">
                        กรุณาเลือกรูปแบบคำตอบ
                      </div>
                    ) : (
                      <div className="text-yellow-300 py-3 ml-4">
                        กรุณากดรูปแบบคำตอบ
                      </div>
                    )}
                    {showModelDetail === true ? (
                      <div className="grid grid-cols-3 gap-5">
                        <div className="ml-3 ">
                          <Shortans data={Arrdata} />
                        </div>
                        <div>
                          <Description data={Arrdata}/>
                        </div>
                        <div>
                          <Multiple data={Arrdata}/>
                        </div>
                        <div className="ml-3">
                          <Options data={Arrdata}/>
                        </div>
                        <div className="">
                          <Score data={Arrdata}/>
                        </div>
                      </div>
                    ) : (
                      <>
                        {Arrdata.types ? (
                          <div className="grid grid-cols-3 gap-5">
                            {Arrdata.types === "T" ? (
                              <div className="ml-3 ">
                                <Shortans data={Arrdata} />
                              </div>
                            ) : Arrdata.types === "M" ? (
                              <div>
                                <Description data={Arrdata}/>
                              </div>
                            ) : Arrdata.types === "C" ? (
                              <div>
                                <Multiple data={Arrdata}/>
                              </div>
                            ) : Arrdata.types === "R" ? (
                              <div className=" w-52 h-32 ml-4 ">
                                <Options data={Arrdata}/>
                              </div>
                            ) : Arrdata.types === "PS" ? (
                              <div className=" w-52 h-32 ml-4 ">
                                <Score data={Arrdata}/>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-5">
                            <div className="ml-3 ">
                              <Shortans data={Arrdata} />
                            </div>
                            <div>
                              <Description />
                            </div>
                            <div>
                              <Multiple />
                            </div>
                            <div className="ml-3">
                              <Options />
                            </div>
                            <div className="">
                              <Score />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/*  <div className="flex">
                    <div className="">
                    <Multiple />
                    </div>
                    <div className="">
                    <Score />
                    </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (e.data === "p1") {
    return (
      <div>
        <a
          onClick={() => setShowModal(true)}
          className={` px-4 py-2 text-sm  flex flex-row  hover:bg-neutral-100
         `}
        >
          <span className="text-center p2-4">View / Edit</span>
        </a>

        {showModal ? <div>{items()}</div> : null}
      </div>
    );
  }

  if (e.data === "p2") {
    return (
      <div>
        <div>
          <button
            className="add h-8 mx-5 rounded-2xl font-bold py-1 cursor-pointer w-24 border  text-center bg-yellow-500 text-white"
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

export default Assesment;
