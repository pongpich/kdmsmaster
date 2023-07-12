import React, { useState } from "react";
import Overview from "../../../assets/img/text.justify.left.svg";

function Objective() {
  const [objmodal, setobjModal] = useState("");
  return (
    <>
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
          <div className=" col-span-8 space-x-3 items-start text-sm">
            <p>
     
            
              <br />
        

            </p>
          </div>
        </div>
      </div>
      {objmodal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
            <div className="flex justify-center m-5  text-base w-2/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                  <img src={Overview} alt="" width="24" className="mr-2" />
                  Objective
                </div>
                <div className=" px-5 py-5 space-y-10">
                  <textarea
                    rows={5}
                    type="text"
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

export default Objective;
