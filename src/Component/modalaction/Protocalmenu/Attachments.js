import React, { useEffect, useState } from "react";
import iconPost from "../../../assets/img/align.horizontal.right.fill.svg";
import Paperclip from '../../../assets/img/paperclip.svg'
import xmark from '../../../assets/img/xmark.svg'


function Attachments() {
    const [modal, setModal] = useState();
    const [modal2, setModal2] = useState();
    const [modal3, setModal3] = useState();

    const [isCollapsed, setIsCollapsed] = useState();

    const [images, setImages] = useState([]);
    const [imaURLs, setimaURLs] = useState([]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(images => newImageUrls.push(URL.createObjectURL(images)))
        setimaURLs(newImageUrls)
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }


    return (
        <div>
            <div className="grid grid-cols-12 ">
                <div className="col-span-1">
                    <img src={Paperclip} alt="" width="24" className="ml-1" />
                </div>
                <div className="col-span-11 font-medium">

                    <div className="text-md font-semibold">
                        Attachments
                    </div>

                    <div className=" text-neutral-500  font-semibold flex ">
                        <div
                            onClick={() => setModal(true)}
                            className=" rounded cursor-pointer w-44 h-20 bg-gray-200"
                        >
                            <img src={Paperclip} alt="" className="ml-20 absolute mt-7" width="15" />
                        </div>
                        {/*   <div className="ml-6 mt-4">

                            <div className="flex">
                                <p className="text-xs"></p>
                                <p className="text-gray-500 text-xs underline cursor-pointer">
                                    &nbsp;
                                </p>
                                <p className="text-xs"> &nbsp;</p>
                                <div className="text-gray-500 text-xs underline cursor-pointer">
                                    &nbsp;
                                </div>
                                <p className="text-xs"> &nbsp;</p>
                                <div className="text-gray-500 text-xs underline cursor-pointer">
                                    &nbsp;
                                </div>
                            </div>
                   </div> */}
                    </div>

                </div>
                <br />
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-1 ">
                    <div></div>
                </div>
                <div
                    className={`col-span-11 font-medium collapse-content ${!isCollapsed ? "expanded duration-500" : "collapsed duration-500"
                        }`}
                    aria-expanded={isCollapsed}
                >
                    <div className="text-md flex items-center font-semibold">
                    </div>

                    <div className=" col-span-8 space-x-3 items-start text-base">
                        <p>
                        </p>
                    </div>

                    <div className=" text-neutral-500  font-semibold flex">
                        <div
                            onClick={() => setModal(true)}
                            className=" rounded cursor-pointer w-44 h-20 bg-gray-200"
                        >
                            <img src={Paperclip} alt="" className="ml-20 absolute mt-7" width="15" />
                        </div>
                        {/*   <div className="ml-6 mt-4">

                            <div className="flex">
                                <p className="text-xs"></p>
                                <p className="text-gray-500 text-xs underline cursor-pointer">
                                    &nbsp;
                                </p>
                                <p className="text-xs"> &nbsp;</p>
                                <div className="text-gray-500 text-xs underline cursor-pointer">
                                    &nbsp;
                                </div>
                                <p className="text-xs"> &nbsp;</p>
                                <div className="text-gray-500 text-xs underline cursor-pointer">
                                    &nbsp;
                                </div>
                            </div>
                    </div> */}
                    </div>
                    <br />
                </div>
            </div>

            <div className="grid grid-cols-12">
                <div className="col-span-1 ">
                    <div></div>
                </div>
                <div
                    className={`col-span-11 font-medium collapse-content ${!isCollapsed ? "expanded duration-500" : "collapsed duration-500"
                        }`}
                    aria-expanded={isCollapsed}
                >
                    <div className="text-md flex items-center font-semibold">
                    </div>

                    <div className=" col-span-8 space-x-3 items-start text-base">
                        <p>
                        </p>
                    </div>
                    <div className=" text-neutral-500  font-semibold flex">
                        <div
                            onClick={() => setModal(true)}
                            className=" rounded cursor-pointer w-44 h-7 bg-gray-200"
                        >
                            <p className="ml-8 absolute mt-2 text-xs text-gray-600" width="15">Add an Attchment</p>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

            {modal ? (
                <div>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                        <div className="flex justify-center m-5  text-base w-2/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img src={Paperclip} alt="" width="24" className="mr-2" />
                                    Attachments

                                </div>
                                <div className="grid grid-cols-5 bg-neutral-100 pl-5">
                                    <div className="px-5 py-5 space-y-3 col-span-5">
                                        <div className=" flex ">
                                            Image : <p className=" underline ml-10" >BROW IMAGES</p> <img src={xmark} className="mt-1 ml-3" style={{ height: '0.9rem' }} />
                                        </div>
                                        <div className=" flex ">
                                            URL &nbsp;&nbsp;&nbsp;:  <input type="text" className=" w-10/12 border-b outline-0 bg-neutral-100 "></input>
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
            {modal2 ? (
                <div>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                        <div className="flex justify-center m-5  text-base w-2/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img src={iconPost} alt="" width="24" className="mr-2" />
                                    Attachments
                                </div>

                                <div className="grid grid-cols-5 bg-neutral-100 pl-5">
                                    <div className="px-5 py-5 space-y-3 col-span-5">
                                        <div className=" flex ">
                                            Image : <p className=" underline ml-10" >BROW IMAGES</p> <img src={xmark} className="mt-1 ml-3" style={{ height: '0.9rem' }} />
                                        </div>
                                        <div className=" flex ">
                                            URL &nbsp;&nbsp;&nbsp;:  <input type="text" className=" w-10/12 border-b outline-0 bg-neutral-100 "></input>
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
                </div>
            ) : null}
            {modal3 ? (
                <div>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100  shadow-lg focus:outline-none backdrop-brightness-50 ">
                        <div className="flex justify-center m-5  text-base w-2/6">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white mb-4  focus:outline-none overflow-y-auto">
                                <div className=" flex text-center justify-center  font-semibold border-b py-3 bg-neutral-100">
                                    <img src={iconPost} alt="" width="24" className="mr-2" />
                                    Attachments

                                </div>
                                <div className="grid grid-cols-5 bg-neutral-100 pl-5">
                                    <div className="px-5 py-5 space-y-3 col-span-5">
                                        <div className=" flex ">
                                            Image : <p className=" underline ml-10" >BROW IMAGES</p> <img src={xmark} className="mt-1 ml-3" style={{ height: '0.9rem' }} />
                                        </div>
                                        <div className=" flex ">
                                            URL &nbsp;&nbsp;&nbsp;:  <input type="text" className=" w-10/12 border-b outline-0 bg-neutral-100 "></input>
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
                                        onClick={() => setModal3(false)}
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
    );
}

export default Attachments