import React, { useState } from "react";
import iconPost from "../../../assets/img/align.horizontal.right.fill.svg";
import { AiOutlineDown } from "react-icons/ai";
import Bin from "../../../assets/img/trash.square.svg";
import listton from "../../../assets/img/list.bullet.rectangle.fill.svg";

function Descrip() {
    const [modal, setModal] = useState();
    const [modal2, setModal2] = useState();
    const [isCollapsed, setIsCollapsed] = useState();

    return (
        <>
          
            <div className="grid grid-cols-12">
                <div className="col-span-1 ">
                    <div>AW5</div>
                    <div className=" border-l-2 border-neutral-500  h-4/6 mx-4"></div>
                    <div className="flex">
                        <div className=" rounded-full w-3 h-3 bg-neutral-800 ml-2.5"></div>
                        <div className=" text-xs">EW-2</div>
                    </div>
                </div>
                <div
                    className={`col-span-11 font-medium collapse-content ${!isCollapsed ? "expanded duration-500" : "collapsed duration-500"
                        }`}
                    aria-expanded={isCollapsed}
                >
                    <div className="text-md flex items-center font-semibold">
                        Week 5
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

                    <div className=" col-span-8 space-x-3 items-start text-sm">
                        <p>

                            <br />
                        </p>
                    </div>
                </div>
            </div>
            {modal ? (
                <>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                        <div className="flex justify-center m-5  text-base w-4/6 lg:w-2/6 md:4/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-100 mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img src={listton} alt="" width="24" className="mr-2" />
                                    Patient’s Home Exercise Program
                                </div>
                                <div className="grid grid-cols-5 bg-neutral-100 pl-5">
                                    <div className="co-span-1 text-center py-5">
                                        <div className=" flex ">
                                            Week 1 <AiOutlineDown className="mt-1 ml-2" />
                                        </div>
                                    </div>
                                    <div className=" px-5 py-5 space-y-10 col-span-4">
                                        <input
                                            type="text"
                                            className="border outline-none w-full px-2"
                                        />
                                    </div>
                                </div>

                                <div className=" flex space-x-9 justify-center font-medium text-sm bg-neutral-100 py-3">
                                    <div
                                        onClick={() => setModal(false)}
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
                </>
            ) : null}
            {modal2 ? (
                <>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                        <div className="flex justify-center m-5  text-base w-2/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img src={iconPost} alt="" width="24" className="mr-2" />
                                    Enhanced Recovery Program
                                </div>
                                <div className="grid grid-cols-5 bg-neutral-100 pl-5">
                                    <div className="co-span-1 text-center py-5">
                                        <div className=" flex ">
                                            Week 1{" "}
                                            <AiOutlineDown className="mt-1 ml-2 cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className=" px-5 py-5 space-y-10 col-span-4">
                                        <textarea
                                            rows={5}
                                            type="text"
                                            className="border outline-none w-full px-2"
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
                </>
            ) : null}
        </>
    );
}

export default Descrip