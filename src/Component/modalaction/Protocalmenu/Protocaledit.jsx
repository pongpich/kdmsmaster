import React, { useState } from "react";
import Protocalcard from "../../../assets/img/rectangle.topthird.inset.filled.svg";
import THicon from "../../../assets/img/TH.svg";
import Enicon from "../../../assets/img/EN.svg";

function Protocaledit() {
  // const [showModal, setShowModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const toggleClass =
    " transform translate-x-5 bg-blue text-blue-700 duration-500";
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <img src={Protocalcard} alt="" width="28" />
        </div>
        <div className="col-span-11 font-medium">
          <div className="grid grid-cols-11">
            <div className="text-md font-semibold">
              Protocol
              <span
                onClick={() => setHidden(true)}
                className="ml-3 px-1 rounded text-xs bg-neutral-200 cursor-pointer"
              >
                edit
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 ml-1">
          <img src={THicon} width="18" alt=""/>
        </div>
        <div className="col-span-11 font-medium">
          <div className="grid grid-cols-11">
            <div className="col-span-10 "></div>
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

            </div>
          </div>
        </div>
      </div>
      {hidden ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
            <div className="flex justify-center m-5  text-base w-2/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                  <img src={Protocalcard} width="28" alt="" className="mr-2" />
                  Protocol Name
                </div>
                <div className=" px-5 py-5 space-y-10">
                  <div className=" flex space-x-3">
                    <div className=" font-semibold">TH : </div>
                    <input
                      type="text"
                      className="border-b outline-none w-10/12 px-2"
                    />
                  </div>
                  <div className=" flex space-x-3">
                    <div className=" font-semibold">EN : </div>
                    <input
                      type="text"
                      className="border-b outline-none w-10/12 px-2"
                    />
                  </div>
                  <div className=" flex space-x-9 justify-center font-medium text-sm">
                    <div
                      onClick={() => setHidden(false)}
                      className="py-1 cursor-pointer w-24 border  rounded-full text-center border-gray-500 text-gray-500"
                    >
                      Cancel
                    </div>
                    <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700">
                      Clear
                    </div>
                    <div className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white">
                      Add
                    </div>
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

export default Protocaledit;
