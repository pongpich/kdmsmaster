import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import Exercise from "./modalaction/ExerciseMenu/Exercise";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../paths/api-path";
import delay from "delay";
import Swal from "sweetalert2";
import { BiHomeAlt, BiMenu } from "react-icons/bi";
import Header from "./Header";
import NavBarb from "./NavBar/NavBarb";

function ExercisetBox() {
  const [dataExc, setDataExc] = useState("");
  const [delData, setDelData] = useState("");
  const [respon, setrespon] = useState("");
  const [responDel, setResponDel] = useState("");
  const [ptecod, setPtecod] = useState("");
  const [search, setSearch] = useState("");

  useEffect(async () => {
    GetData();
  }, []);

  const GetData = async () => {
    const request_Exercise = {
      params: {
        dbServiceName: "MSExcerciseHeaderList",
      },
    };

    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_Exercise
    );

    console.log(data, "Ex");

    if (data != "") {
      setDataExc(data.result);
    } else {
      GetData();
    }
  };


  useEffect(() => {
    GetData();
  }, [responDel]);

  const searchExrcise = (e) => {
    setSearch(e)
    const result = dataExc.filter(itemsearch => {
      return itemsearch.PteExcNam.toLowerCase().match(search.toLowerCase());
    })

    if (e.length === 0) {
      GetData()
    } else {
      setDataExc(result);
    }
  }


 

  // useEffect(() => {
  //   console.log(responDel, "whereeeeeeeeeee");
  //   console.log(responDel, "responDel");

  //   GetData();
  // }, [responDel]);

  // console.log(responDel, "whereeeeeeeeeee");

  const Loading = () => {
    setTimeout(() => {
      <div>loading ....</div>;
      delay(2000);

      // GetData();
    }, 2000);
  };

  const DelExercise = async (PteCod) => {
    const req_delete = {
      params: {
        dbServiceName: "MSSaveExcerciseMaster",
        bdycod: "",
        motcod: "",
        ptecod: PteCod,
        namtha: "",
        nameng: "",
        namurl: "",
        typcod: "D",
        uidcod: "BRBADMIN",
      },
    };
    // console.log(req_delete);

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
        axios
        .get(`${kdms_internet_protocol_DBService_JSON_path}`, req_delete)
        .then(async (response) => {
          try {
            let response_data = await response.data;
            setResponDel(response_data.result[0].result);
            if (response_data.result[0].result === "delete success") {
              Swal.fire({
                icon: "success",
                text: "สำเร็จ",
              });
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setResponDel("");
            } 
          } catch (error) {
            console.log(error);
          }
        })
      
      }
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className=" h-screen flex">
      <div className="">
        <NavBarb />
      </div>
      <div className="w-full">
        <Header />
        <div className="px-5 py-5 ">
          <div className="mx-5 my-5 md:justify-self-center">
            <div
              className={` card-header border rounded-xl pt-5 cardborder green`}
            >
              <div className="px-2 grid grid-cols-4">
                <div>
                  <div className={`font-extrabold text-xl`}>Exercise</div>
                  <div className=" text-white text-sm">กายบริหาร</div>
                </div>
                <div className="col-span-3 pb-1 flex justify-end">
                  <div className=" pl-5 pt-5 absolute w-10">
                    <BsSearch />
                  </div>
                  <input
                    type="text"
                    className={` w-full  border-b outline-0	 px-5 pt-5 green`}
                    value={search}
                    onChange={(e) => searchExrcise(e.target.value)}
                  />
                </div>
              </div>
              <div className=" bg-white hp-80 px-1 text-xs font-normal text-neutral-700 overflow-scroll">
                {dataExc?.length > 0 ? (
                  <div>
                    {dataExc.map((i, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-9 py-1 hover:bg-slate-100 cursor-default">
                          <div className=" col-span-1 text-center justify-self-center">
                            <div
                              className={`w-4 h-4 rounded-full border mt-1 cicle `}
                            >
                              {/* {i.PteActYon} */}
                            </div>
                          </div>
                          <div className=" col-span-2">{i.PteCod}</div>
                          <div className=" col-span-5">
                            <div>{i.PteExcNam}</div>
                            <div>{i.nameEng}</div>{" "}
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
                                      <Exercise
                                        data="p1"
                                        getParam={dataExc[index]}
                                      />
                                    </Menu.Item>

                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          className={classNames(
                                            active ? "bg-neutral-100" : "",
                                            " px-4 py-2 text-sm text-neutral-700 flex flex-row "
                                          )}
                                          onClick={() => {
                                            DelExercise(i.PteCod);
                                          }}
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
                          </div>{" "}
                        </div>
                        <div className="border-b px-10"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>{Loading()} loading ....</div>
                )}
              </div>
              <div className="bg-white w-full flex justify-between py-2 border-t rounded-b-xl text-neutral-700 ">
                <div className="mx-5 cursor-default text-xl font-medium">
                  + New Exercise
                </div>
                <div className="">
                  <div>
                    <Exercise data="p2" getParam="" />
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

export default ExercisetBox;
