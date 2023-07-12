import React, { useEffect, useState } from "react";
import Program_json from "../data/program";
import { BsSearch } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import Potocal from "./modalaction/Potocal";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../paths/api-path";
import Header from "./Header";
import NavBarb from "./NavBar/NavBarb";
import { useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";

function PotocalBox() {
  const [program, setProgram] = useState("");
  const [search, setSearch] = useState("");

  let navigate = useNavigate();

  useEffect(async () => {
    GetData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user_profile") === null) {
      navigate("/login", { replace: true });
    }
  }, []);

  const GetData = async () => {
    const request_protocol = {
      params: {
        dbServiceName: "MSProtocolHeaderList",
      },
    };

    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_protocol
    );

    console.log(data, "Protocal");

    if (data != "") {
      setProgram(data.result);
    } else {
      GetData();
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const searchProtocol = (e) => {
    setSearch(e);
    const result = program.filter((itemsearch) => {
      return itemsearch.PshNam.toLowerCase().match(search.toLowerCase());
    });

    if (e.length === 0) {
      GetData();
    } else {
      setProgram(result);
    }
  };
  return (
    <div className=" h-screen flex">
      <div className="">
        <NavBarb />
      </div>
      <div className="w-full">
        <Header />
        <div className="px-5 py-5 ">
          <div>
            <div className="mx-5 my-5 ">
              <div className="card-header  border rounded-xl pt-5 cardborder blue">
                <div className="px-2 grid grid-cols-4">
                  <div className="">
                    <div className="font-extrabold text-xl ">Protocol</div>
                    <div className=" text-white text-sm flex space-x-6">
                      <p>แผนการรักษา</p>
                      <div
                        className=" cursor-pointer shadow-lg border-white border rounded-md mb-1"
                        onClick={() => GetData()}
                      >
                        <BiRefresh size={24} />
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-span-3 pb-1 flex justify-end">
                    <div className=" pl-5 pt-5 absolute w-10">
                      <BsSearch />
                    </div>
                    <input
                      type="text"
                      className={` w-full  border-b bg-blue outline-0	 px-5 pt-5`}
                      value={search}
                      onChange={(e) => searchProtocol(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className=" bg-white hp-80 px-1 text-xs font-normal text-neutral-700 overflow-scroll">
                  {program?.length > 0 ? (
                    <div>
                      {program.map((i, index) => (
                        <div key={index}>
                          <div className="grid grid-cols-10 py-1 hover:bg-slate-100 cursor-default">
                            <div className=" col-span-1 text-center justify-self-center">
                              <div
                                className={`w-4 h-4 rounded-full border mt-1 cicle bg-blue-100 `}
                              >
                                {/* {i.PshActYon} */}
                              </div>
                            </div>
                            <div>
                              <img
                                src="http://172.16.81.21/image/icon/knee.jpg"
                                width={35}
                              />
                            </div>
                            <div className=" col-span-2 ">{i.PshCod}</div>
                            <div className=" col-span-5">
                              <div>{i.PshNam}</div>
                              <div>{i.PshNamEng}</div> {}
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
                                        <Potocal
                                          data={{
                                            data: "p1",
                                            id: program[index],
                                          }}
                                        />
                                        {/* <Potocal
                                          data={{
                                            Button: "p1",
                                            code: i.PshCod,
                                          }}
                                        /> */}
                                      </Menu.Item>

                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            className={classNames(
                                              active ? "bg-neutral-100" : "",
                                              " px-4 py-2 text-sm text-neutral-700 flex flex-row "
                                            )}
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
                                            className={classNames(
                                              active ? "bg-neutral-100" : "",
                                              " px-4 py-2 text-sm text-neutral-700 flex flex-row "
                                            )}
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
                    <div role="status" className="mt-28 text-center ">
                      <svg
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </div>

                <div className="bg-white w-full flex justify-between py-2 border-t rounded-b-xl text-neutral-700 ">
                  <div className="mx-5 cursor-default text-xl font-medium">
                    + New Protocol
                  </div>
                  <div className="">
                    <div>
                      <Potocal data="p2" />
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
}

export default PotocalBox;
