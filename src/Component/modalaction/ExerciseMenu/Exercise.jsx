import React, { useEffect, useState } from "react";
import Xicon from "../../../assets/img/xmark.square.fill.svg";
import { AiOutlinePlus } from "react-icons/ai";
import listIcon from "../../../assets/img/Excercise/list.bullet.rectangle.fill.svg";
import displayIcon from "../../../assets/img/Excercise/displaygreen.svg";
import viweIcon from "../../../assets/img/Excercise/eye.slash.svg";
import EditIcon from "../../../assets/img/Excercise/square.and.pencil.svg";
import trashIcon from "../../../assets/img/Excercise/trash.svg";
import photo from "../../../assets/img/photo.svg";
import camera from "../../../assets/img/camera.svg";
import gb from "../../../assets/img/gb.svg";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import Addbody from "./Addbody";
import { FiMoreVertical } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";

import AddMotion from "./AddMotion";
import Swal from "sweetalert2";
import delay from "delay";
import { BiRefresh } from "react-icons/bi";
import EditBody from "./EditBody";
import DelBody from "./Delete";

function Exercise(e) {
  const [showModal, setShowModal] = useState(false);
  const [UpdateEx, setUpdateEx] = useState(false);
  const [Motion, setMotion] = useState([]);
  const [MotionList, setMotionList] = useState([]);
  const [BodyList, setBodyList] = useState([]);
  const [Detail, setDetail] = useState([]);
  // ------------------------------------------------
  const [upDetail, setupDetail] = useState("");
  const [pdycod, setPdycod] = useState("");
  const [bdycod, setBdycod] = useState("");
  const [MotCod, setMotCod] = useState("");
  // const [Ptecod, setPtecod] = useState();
  const [Namtha, setNamtha] = useState("");
  const [Nameng, setNameng] = useState("");
  const [Namurl, setNamurl] = useState("");
  const [respon, setrespon] = useState("");
  const [responAdd, setResponAdd] = useState("");
  const [responEdit, setResponEdit] = useState("");
  const utf8 = require("utf8");

  useEffect(() => {
    console.log(bdycod);
    GetMotion();
  }, [bdycod]);

  useEffect(() => {
    console.log(MotCod);
    fatchDataDetail();
  }, [MotCod]);

  useEffect(() => {
    console.log(responAdd);
    fatchDataDetail();
    setNamtha("")
    setNameng("")
    setNamurl("")
  }, [responAdd]);

  useEffect(() => {
    console.log(responEdit);
    fatchDataDetail();
  }, [responEdit]);

  useEffect(() => {
    console.log(upDetail);
    setData();
  }, [upDetail]);

  useEffect(async () => {
    const request_Body = {
      params: {
        dbServiceName: "MSExcerciseBodyList",
      },
    };
    await delay(1000);
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Body
    );
    setBodyList(data.result);
  }, []);

  const GetMotion = async () => {
    const request_Motion = {
      params: {
        dbServiceName: "MSExcerciseMotionList",
      },
    };
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Motion
    );
    setMotion(data.result);
    fatchDataDetail();

    // console.log(Motion, "Motcod");
    // console.log(Motion, "Motcod");
  };
  const fatchDataDetail = async () => {
    const req_detail = {
      params: {
        dbServiceName: "MSExcerciseDetailList",
        bdytyp: bdycod,
        mottyp: MotCod,
      },
    };

    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      req_detail
    );
    setDetail(data.result);

    console.log(MotCod, "Motioncod");
    // console.log(Detail, "detail");
  };

  const AddExercise = async () => {
    
    const req_insdata = {
      params: {
        dbServiceName: "MSSaveExcerciseMaster",
        bdycod: bdycod,
        motcod: MotCod,
        ptecod: "",
        namtha: utf8.encode(Namtha),
        nameng: Nameng,
        namurl: Namurl,
        typcod: "I",
        uidcod: "BRBADMIN",
      },
    };
    if (
      bdycod !== "" &&
      MotCod !== "" &&
      Namtha !== "" &&
      Nameng !== "" &&
      Namurl !== ""
    ) {

      axios
      .get(`${kdms_internet_protocol_DBService_JSON_path}`, req_insdata)
      .then(async (response) => {
        try {
          let response_data = await response.data;
          setResponAdd(response_data.result[0].result);
          setUpdateEx(false);
          
        } catch (error) {
          console.log(error);
        }
      })
      Swal.fire({
        icon: "success",
        text: "สำเร็จ",
      });
      setTimeout(() => {
        Swal.close();
        
      }, 3000);
    } else {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      setTimeout(() => {
        Swal.close();
        setResponAdd("");
      }, 4000);
    }
  };

  const UpDateExercise = async () => {
    const req_insdata = {
      params: {
        dbServiceName: "MSSaveExcerciseMaster",
        bdycod: bdycod,
        motcod: MotCod,
        ptecod: pdycod,
        namtha: utf8.encode(Namtha),
        nameng: Nameng,
        namurl: Namurl,
        typcod: "U",
        uidcod: "BRBADMIN",
      },
    };
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      req_insdata
    );
    await delay(1000);
    setrespon(data.result);
    setResponEdit(data.result[0].result);

    console.log(data.result[0].result === "update success", "repon");
    console.log(data.result[0].result, "repon");
    if (data.result[0].result === "update success") {
      Swal.fire({
        icon: "success",
        text: "สำเร็จ",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);
    } else {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      setTimeout(() => {
        Swal.close();
      }, 4000);
    }
    console.log(upDetail.PteCod);
  };
  const DeleteExercise = async () => {
    const req_insdata = {
      params: {
        dbServiceName: "MSSaveExcerciseMaster",
        bdycod: bdycod,
        motcod: MotCod,
        ptecod: pdycod,
        namtha: utf8.encode(Namtha),
        nameng: Nameng,
        namurl: Namurl,
        typcod: "D",
        uidcod: "BRBADMIN",
      },
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(bdycod, Namtha, Nameng, req_insdata, "IF");
        if (bdycod !== "" && Namtha !== "" && Nameng !== "") {
          console.log(bdycod, Namtha, Nameng, "IN IF");
          const { data } = axios.get(
            `${kdms_internet_protocol_DBService_JSON_path}`,
            req_insdata
          );
          delay(1000);
          setrespon(data.result);
          setResponEdit(data.result[0].result);

          console.log(upDetail.PteCod);

          Swal.fire({
            icon: "success",
            text: "สำเร็จ",
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }

        console.log("delete");
      }
    });
  };

  const setData = () => {
    setNamtha(upDetail.PteExcNam);
    setNameng(upDetail.PteExcEng);
    setNamurl(upDetail.PteExcUrl);
    setPdycod(upDetail.PteCod);

    console.log(Namtha, Nameng, "setData");
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const Refresh = async () => {
    const request_Body = {
      params: {
        dbServiceName: "MSExcerciseBodyList",
      },
    };
    await delay(1000);
    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Body
    );
    setBodyList(data.result);
  };


  const DeleMotion = async () => {
    // const req_insdata = {
    //   params: {
    //     dbServiceName: "MSSaveExcerciseMotionMaster",
    //     motcod: MotCod,
    //     namtha: "",
    //     nameng: "",
    //     typcod: "D",
    //     uidcod: "BRBADMIN",
    //   },
    // };
    // console.log(req_insdata, "req_insdata");
    // if ( MotCod !== "") {
    //   try {
    //     await axios.get(
    //       `${kdms_internet_protocol_DBService_JSON_path}`,
    //       req_insdata
    //     );
    //     Swal.fire({
    //       icon: "success",
    //       text: "สำเร็จ",
    //     });
    //     GetMotion();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     text: "กรุณากรอกข้อมูลให้ครบ",
    //   });
    //   setTimeout(() => {
    //     Swal.close();
    //   }, 3000);
    // }
  };
  const items = () => {
    return (
      <div>
        <div>
          <div>
            <div className=" justify-center items-center flex    overflow-hidden cursor-default fixed inset-0 z-20 shadow-lg focus:outline-none backdrop-blur">
              <div className="flex justify-center w-9/12 h-5/6  text-base ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white focus:outline-none">
                  <div className="px-2 py-2 green">
                    <div className=" flex justify-between leading-relaxed space-x-15 green text-2xl font-semibold">
                      Exercise
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
                    <p className=" text-white text-lg">กายบริหาร</p>
                  </div>
                  <div className="w-full  ">
                    <div className="grid grid-cols-9 py-2">
                      <div className=" col-span-2 border-r space-y-2 text-center center ">
                        <div className=" text-blue-700 flex px-2 cursor-pointer">
                          <AiOutlinePlus className="mt-1" />
                          <Addbody />
                        </div>
                        <div>
                          <img src={listIcon} alt="" className="h-9" />
                          <div className=" mt-2"> กลุ่มกายบริหาร</div>
                        </div>
                        <div
                          className=" cursor-pointer"
                          onClick={() => Refresh()}
                        >
                          <BiRefresh />
                        </div>

                        {/* option */}
                        {BodyList?.length > 0 ? (
                          <div className=" h-96 overflow-y-auto overflow-x-hidden">
                            {BodyList?.map((i, key) => (
                              <div
                                key={key}
                                className={`   hover:bg-green-50 text-xs ${
                                  bdycod === i.BdyCod ? "bg-green-100" : ""
                                }`}
                                onClick={() => {
                                  setBdycod(i.BdyCod);
                                  // fatchDataDetail();
                                }}
                              >
                                <div className="grid grid-cols-9 text-left space-x-2 mx-4  py-2 border-y">
                                  <div className=" col-span-2">
                                    <img src={displayIcon} alt="" />
                                  </div>
                                  <div className="col-span-6">
                                    <div>{i.HpmEng}</div>
                                    {/* ภาษาไทย */}
                                    {/* <div>{i.HpmNam}</div> */}
                                  </div>
                                  <div className=" col-span-1 text-neutral-700">
                                    <div className="justify-self-end">
                                      <Menu as="div" className=" relative">
                                        <div>
                                          <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                                            <span className="sr-only">
                                              Open user menu
                                            </span>
                                            <FiMoreVertical size={22} />
                                          </Menu.Button>
                                        </div>

                                        <Transition
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <Menu.Items className="origin-top-right cursor-pointer  absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <Menu.Item>
                                              <EditBody data={BodyList[key]} />
                                            </Menu.Item>
                                            <Menu.Item>
                                              {({ active }) => (
                                                <DelBody data={BodyList[key]} />
                                              )}
                                            </Menu.Item>
                                          </Menu.Items>
                                        </Transition>
                                      </Menu>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-span-7 px-2 ml-3">
                        {Motion?.length > 0 ? (
                          <div className=" text-xs space-x-2 flex flex-wrap ">
                            {Motion?.map((i, key) => (
                              <>
                                <div
                                  key={key}
                                  className="group inline-block relative"
                                >
                                  <div
                                    className={`hover:text-blue-700 cursor-pointer ${
                                      MotCod === i.MotCod ? "text-blue-700" : ""
                                    }`}
                                    onClick={() => {
                                      setMotCod(i.MotCod);
                                      DeleMotion();
                                    }}
                                  >
                                    {i.HpmEng} |
                                  </div>
                                  <ul class="absolute hidden z-10 text-gray-700 pt-1 group-hover:block  transition duration-150 ease-in-out">
                                    <li class="">
                                      <a
                                        class="rounded-t bg-gray-200 hover:bg-neutral-100-400 py-2 px-4 block whitespace-no-wrap"
                                        href="#"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li class="">
                                      <a
                                        class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                        href="#"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            ))}
                            <AddMotion data={MotCod} />
                          </div>
                        ) : (
                          <div>เลือกกลุ่มกายบริหาร</div>
                        )}

                        <div className=" h-72 border-b overflow-y-auto  text-xs ">
                          {Detail?.length > 0 ? (
                            <div>
                              {Detail.map((i, key) => (
                                <div
                                  key={key}
                                  className="grid grid-cols-8 pt-2 "
                                >
                                  <div className="col-span-1  h-full w-full justify-self-center place-self-center">
                                    <iframe
                                      width={120}
                                      height={80}
                                      src={
                                        `https://www.youtube.com/embed/` +
                                        i.PteExcUrl
                                      }
                                      // src={` https://www.youtube.com/embed/` + item.excerciseUrl}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                  <div className=" col-span-7  grid grid-cols-10 gap-1 text-right  border-b border-gray-400">
                                    <div className="col-span-1 font-semibold ">
                                      Title TH :
                                    </div>
                                    <div className="col-span-6 text-left pl-1 ">
                                      {i.PteExcNam}
                                    </div>
                                    <div className="col-span-1 flex place-self-start cursor-pointer ">
                                      <img
                                        src={viweIcon}
                                        alt=""
                                        width="15"
                                        className="mr-1"
                                      />
                                      public
                                    </div>
                                    <div
                                      onClick={() => {
                                        setUpdateEx(true);
                                        setupDetail(Detail[key]);
                                      }}
                                      className="col-span-1 flex place-self-start cursor-pointer"
                                    >
                                      <img
                                        src={EditIcon}
                                        width="15"
                                        className="mr-1"
                                      />
                                      edit
                                    </div>
                                    <div
                                      onClick={() => {
                                        setupDetail(Detail[key]);
                                        DeleteExercise();
                                      }}
                                      className="col-span-1 flex place-self-start cursor-pointer"
                                    >
                                      <img
                                        src={trashIcon}
                                        width="15"
                                        className="mr-1"
                                      />
                                      delete
                                    </div>
                                    {/* en */}
                                    <div className="col-span-1 font-semibold ">
                                      EN :
                                    </div>
                                    <div className="col-span-9 text-left pl-1">
                                      {i.PteExcEng}
                                    </div>
                                    <div className="col-span-1 font-semibold">
                                      URL :
                                    </div>
                                    <div className="col-span-9 text-left pl-1 underline text-blue-700">
                                      {i.PteExcUrl ? (
                                        <p>
                                          https://www.youtube.com/watch?v=
                                          {i.PteExcUrl}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="justify-self-center h-full mt-10 center-kit text-lg">
                              No Data
                            </div>
                          )}
                        </div>

                        {!UpdateEx ? (
                          <div className="grid grid-cols-12 ">
                            <div className="col-span-8 mt-5">
                              <div className="font-semibold text-xs grid grid-cols-4 mx-10 space-y-2">
                                <div className=" col-span-1 text-right">
                                  Title TH :
                                </div>
                                <div className="col-span-3 ml-3">
                                  <input
                                    type="text"
                                    className=" border-b outline-0 w-full"
                                    onChange={(e) => setNamtha(e.target.value)}
                                  />
                                </div>
                                <div className=" col-span-1 text-right">
                                  EN :
                                </div>
                                <div className="col-span-3 ml-3">
                                  <input
                                    type="text"
                                    className=" border-b outline-0 w-full"
                                    onChange={(e) => setNameng(e.target.value)}
                                  />
                                </div>
                                <div></div>
                                <div></div>
                                <div
                                  onClick={() => setShowModal(false)}
                                  className="py-1 mx-5 cursor-pointer  border mr-1 rounded-full text-center border-gray-600 text-gray-500"
                                >
                                  Cancel
                                </div>
                                <div
                                  onClick={() => {
                                    // save /////
                                    AddExercise();
                              
                                  }}
                                  className="py-1 mx-5 cursor-pointer  rounded-full text-center bg-green-700 text-white"
                                >
                                  Save
                                </div>
                              </div>
                            </div>{" "}
                            <div className="col-span-4 text-left pl-1 text-xs mx-1">
                              <div className="border border-gray-200 py-2 w-full center-kit">
                                <div className="h-full">
                                  <img src={photo} alt="" width={100} />
                                  <div className="flex space-x-2 pt-2 place-content-center">
                                    <img
                                      src={camera}
                                      alt=""
                                      className=""
                                      width="17"
                                    />
                                    <div
                                      className=" underline text-blue-700 cursor-pointer"
                                      style={{ fontSize: "10px" }}
                                    >
                                      UPLOAD VIDEO COVER
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="pt-2 flex ">
                                <p className="">VIDEO URL :</p>
                                <input
                                  required
                                  className="border-b w-9/12 outline-0 pl-2 text-blue-700 cursor-pointer placeholder:text-center "
                                  placeholder="Youtube URL "
                                  onChange={(e) => setNamurl(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-12">
                              <div className="col-span-8 mt-5">
                                <div className="font-semibold text-xs grid grid-cols-4 mx-10 space-y-2">
                                  <div className=" col-span-1 text-right">
                                    Update Title TH :
                                  </div>
                                  <div className="col-span-3 ml-3">
                                    <input
                                      type="text"
                                      className=" border-b outline-0 w-full"
                                      value={Namtha}
                                      onChange={(e) =>
                                        setNamtha(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className=" col-span-1 text-right">
                                    EN :
                                  </div>
                                  <div className="col-span-3 ml-3">
                                    <input
                                      type="text"
                                      className=" border-b outline-0 w-full"
                                      value={Nameng}
                                      onChange={(e) =>
                                        setNameng(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div></div>
                                  <div></div>
                                  <div
                                    onClick={() => setUpdateEx(false)}
                                    className="py-1 mx-5 cursor-pointer  border mr-1 rounded-full text-center border-gray-600 text-gray-500"
                                  >
                                    Cancel
                                  </div>
                                  <div
                                    onClick={() => {
                                      setUpdateEx(false);
                                      UpDateExercise();
                                    }}
                                    className="py-1 mx-5 cursor-pointer  rounded-full text-center bg-green-700 text-white"
                                  >
                                    Update
                                  </div>
                                </div>
                              </div>{" "}
                              <div className="col-span-4 text-left pl-1 text-xs mx-1">
                                <div className="border border-gray-200 py-2 w-full center-kit">
                                  <div className="h-full">
                                    <img src={photo} alt="" width={100} />
                                    <div className="flex space-x-2 pt-2 place-content-center">
                                      <img
                                        src={camera}
                                        alt=""
                                        className=""
                                        width="17"
                                      />
                                      <div
                                        className=" underline text-blue-700 cursor-pointer"
                                        style={{ fontSize: "10px" }}
                                      >
                                        UPLOAD VIDEO COVER
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="pt-2 flex ">
                                  <p className="">VIDEO URL :</p>
                                  <input
                                    required
                                    className="border-b w-9/12 outline-0 pl-2 text-blue-700 cursor-pointer placeholder:text-center "
                                    placeholder="Youtube URL "
                                    value={Namurl}
                                    onChange={(e) => setNamurl(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
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
          className=" px-4 py-2 text-sm text-neutral-700 flex flex-row  hover:bg-neutral-100"
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
        <button
          className="add h-8 mx-5 rounded-2xl font-bold py-1 cursor-pointer w-24 border  text-center bg-green-500 text-white"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add
        </button>
        {showModal ? <div>{items()}</div> : null}
      </div>
    );
  }
}

export default Exercise;
