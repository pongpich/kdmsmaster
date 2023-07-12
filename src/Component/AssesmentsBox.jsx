import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import Assesment from "./modalaction/AssesmentMenu/Assesment";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../paths/api-path";
import delay from "delay";
import NavBarb from "./NavBar/NavBarb";
import Header from "./Header";

function AssesmentsBox() {
  const [dataAsm, setDataAsm] = useState("");
  const [search, setSearch] = useState("");

  useEffect(async () => {
    Getdata();
  }, []);

  console.log(dataAsm);

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
    setDataAsm(data.result);

    console.log(data);
    console.log("getdata");
  };

  const searchAssesment= (e) => {
    setSearch(e)
    const result = dataAsm.filter(itemsearch => {
      return itemsearch.HpmNam.toLowerCase().match(search.toLowerCase());
    })

    if (e.length === 0) {
      Getdata()
    } else {
      setDataAsm(result);
    }
  }

  return (
    <div className=" h-screen flex">
      <div className="">
        <NavBarb />
      </div>
      <div className="w-full">
        <Header />
        <div className="px-5 py-5 ">
          <div className="mx-5 my-5 ">
            <div
              className={` card-header border rounded-xl pt-5 cardborder yellow`}
            >
              <div className="px-2 grid grid-cols-4">
                <div>
                  <div className="font-extrabold text-xl ">Assesment</div>
                  <div className=" text-white text-sm">แบบประเมิน</div>
                </div>
                <div className="col-span-3 pb-1 flex justify-end">
                  <div className=" pl-5 pt-5 absolute w-10">
                    <BsSearch />
                  </div>
                  <input
                    type="text"
                    className={` w-full  border-b outline-0	 px-5 pt-5 yellow`}
                    value={search}
                    onChange={(e) => searchAssesment(e.target.value)}
                  />
                </div>
              </div>
              <div className=" bg-white hp-80 px-1 text-xs font-normal text-neutral-700 overflow-scroll">
                {dataAsm.length > 0 ? (
                  <div>
                    {dataAsm.map((i, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-9 py-1 hover:bg-slate-100 cursor-default">
                          <div className=" col-span-1 text-center justify-self-center">
                            <div
                              className={`w-4 h-4 rounded-full border mt-1 cicle `}
                            >
                              {/* {i.HpmSeq} */}
                            </div>
                          </div>
                          <div className=" col-span-2">{i.AssCod}</div>
                          <div className=" col-span-5">
                            <div>{i.HpmNam}</div>
                            <div>{i.HpmEng}</div>{" "}
                          </div>
                          <div className=" col-span-1 text-neutral-700">
                            <div className="justify-self-end">
                              <Menu as="div" className=" relative">
                                <div>
                                  <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                                    <span className="sr-only">
                                      Open user menu
                                    </span>
                                    <AiOutlineEllipsis size={22} />
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
                                      <Assesment data="p1" />
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          className={
                                            (active ? "bg-neutral-100" : "",
                                            " px-4 py-2 text-sm text-neutral-700 flex flex-row ")
                                          }
                                        >
                                          <span className="text-center p2-4">
                                            Delete
                                          </span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          className={
                                            (active ? "bg-neutral-100" : "",
                                            " px-4 py-2 text-sm text-neutral-700 flex flex-row ")
                                          }
                                        >
                                          <span className="text-center p2-4">
                                            On / Off
                                          </span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                        </div>
                        <div className="border-b px-10"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Loading</div>
                )}
              </div>
              <div className="bg-white w-full flex justify-between py-2 border-t rounded-b-xl text-neutral-700 ">
                <div className="mx-5 cursor-default text-xl font-medium">
                  + New Assesment
                </div>
                <div className="">
                  <div>
                    <Assesment data="p2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssesmentsBox;
