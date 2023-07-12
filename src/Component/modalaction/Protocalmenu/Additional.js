import React, { useEffect, useState } from "react";
import Paperclip from '../../../assets/img/paperclip.svg'
import xmark from '../../../assets/img/xmark.svg'
import text from '../../../assets/img/text.svg'
import plus from '../../../assets/img/plus.svg'

function Additional() {
    const [modal, setModal] = useState();
    const [isCollapsed, setIsCollapsed] = useState();

    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                    <img src={text} alt="" width="24" className="ml-1" />
                </div>
                <div className="col-span-11 font-medium">

                    <div className="text-md font-semibold">
                        Attachments
                    </div>

                    <div className=" text-neutral-500  font-semibold flex">
                        <div
                            onClick={() => setModal(true)}
                            className=" rounded cursor-pointer w-11/12 h-20 bg-gray-200"
                        >
                            <img src={plus} alt="" className="  absolute mt-7 items-center" width="25" style={{ marginLeft: '455px' }} />
                        </div>
                    </div>

                </div>
            </div>
            {/*      <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
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
             </div> */}

            {modal ? (
                <div>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                        <div className="flex justify-center m-5  text-base w-2/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img src={Paperclip} alt="" width="24" className="mr-2" />
                                    Additional

                                </div>
                                <div className="grid grid-cols-5 bg-neutral-100 pl-5">
                                    <div className="px-5 py-5 space-y-3 col-span-5">
                                        <div className=" flex ">
                                            Image &nbsp;: <p className=" underline ml-10" >BROW IMAGES</p> <img src={xmark} className="mt-1 ml-3" style={{ height: '0.9rem' }} />
                                        </div>

                                        <div className=" flex ">
                                            Title &nbsp;&nbsp;&nbsp;:<input type="text" className=" w-10/12 border-b outline-0 bg-neutral-100 "></input>
                                        </div>
                                        <div className="">
                                            Short Description :
                                            <textarea
                                                rows={3}
                                                type="text"
                                                className="border outline-none w-full px-2"
                                            />
                                        </div>
                                    </div>
                                    {/*    <div className=" px-5 py-5 space-y-10 col-span-4">
                              
                             </div>*/}


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
                </div>
            ) : null}

        </div>
    )
}

export default Additional