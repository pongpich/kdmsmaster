import "./Usermaster.css";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import NavBarb from "./NavBar/NavBarb";
import Header from "./Header";
import person123 from "../assets/img/person123.svg";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import pro77 from "../assets/img/pro77.svg";
import delet3 from "../assets/img/delet3.svg";
import edi12 from "../assets/img/edi12.svg";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import Prg from "../assets/img/prg.svg";
import kdms_internet_protocol_DBService_JSON_path from "../paths/api-path";

function Usermaster() {
  const [List, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Listdata();
  }, []);

  const Listdata = async () => {
    const request_usermaster_Listdata = {
      params: {
        dbServiceName: "MSUserMasterList",
        Type: "",
      },
    };

    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_Listdata
      )
      .then(async (response) => {
        setList(response.data.result);
        console.log(response.data.result, "Listdata");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className=" h-screen flex">
      <div className="">
        <NavBarb />
      </div>
      <div className="w-full">
        <Header />
        <div className="px-5 py-5 " style={{ alignItems: "center" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            <Card sx={{ display: "flex" }}>
              <CardActionArea>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <div
                    className="mx-5 cursor-default text-xl font-medium"
                    style={{ alignSelf: "center" }}
                  >
                    <img src={person123} alt="" className="" width="50" />
                  </div>
                  <div
                    className="mx-5 cursor-default text-xl font-medium"
                    style={{ alignItems: "center" }}
                  >
                    <p className="doctoridfonteng">Doctor ID</p>
                    <p className="doctoridfontthai">บัญชีแพทย์</p>
                  </div>
                </Stack>
              </CardActionArea>
              <CardMedia className="addicon1">
              <img
              src={Prg}
              alt=""
              className=""
              width="100 "
              onClick={() => {
                setShowModal(true)
              }}
               />
            </CardMedia>
            </Card>
          </Stack>
        </div>

        <div className="">
          <div>
            <div className="mx-10 my-2" style={{ width: "95%" }}>
              <div className="card-header  border rounded-xl pt-5 cardborder ">
                <div className="px-2 grid grid-cols-12">
                  <div className="col-span-2">
                    <div className=" text-back text-xl ">แผนการรักษา</div>
                  </div>
                  <div className="col-span-3 ">
                    <select className="w-5/6 bg-gray-200">
                      <option>
                        Doctor Master Diagnose and treat medical conditions
                      </option>
                      <option>2</option>
                    </select>
                  </div>
                  <div className="col-span-3 pb-1 flex justify-end -mt-4">
                    <div className=" pl-5 pt-5 absolute w-15">
                      <BsSearch />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full  border-b  outline-0	 px-2 pt-5"
                    ></input>
                  </div>
                  <div className="grid grid-cols-3 col-span-4 text-back ml-16">
                    <div className="space-x-2">
                      <input type="checkbox" name="box" id="boxnew" />
                      <label>All</label>
                    </div>
                    <div className="space-x-2">
                      <input type="checkbox" name="box" id="boxnew" />
                      <label>Doctor</label>
                    </div>
                    <div className="space-x-2">
                      <input type="checkbox" name="box" id="boxnew" />
                      <label>Extern</label>
                    </div>
                  </div>
                </div>
                <div className="px-2 grid grid-cols-12">
                  <div className="col-span-2 ml-24">
                    <input type="checkbox" name="" />
                  </div>

                  <div className="col-span-3 flex space-x-24 text-back text-xs">
                    <div>Type</div>
                    <div>ID</div>
                    <div>Name</div>
                  </div>

                  <div className="col-span-3 text-back text-left text-xs">
                    <div className="text">Description</div>
                  </div>
                  <div className="col-span-3 text-back text-center text-xs">
                    <div className="ml-20">Action</div>
                  </div>
                </div>
                <div className=" border-b-2 border-slate-200  mx-2 "></div>

                <div className=" bg-white hp-80 px-1 text-xs font-normal text-neutral-700 overflow-scroll">
                  <div>
                    <div>
                      {List.map((i, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 py-1 hover:bg-slate-100 cursor-default"
                        >
                          <div className=" col-span-2 text-center mr-20 text-sm">
                            <div></div>
                          </div>
                          <div className="col-span-3 flex space-x-20 text-sm">
                            <div>{i.UidGrp}</div>
                            <div>{i.UidCod}</div>
                            <div>
                              {i.UidLocNam} {i.UidLocMid} {i.UidLocFam}
                            </div>
                          </div>

                          <div className="col-span-3 text-back text-left text-sm">
                            <div className="">{i.DtrDepCod}</div>
                          </div>
                          <div className="w-7 h-6 cursor-pointer">
                            <img src={pro77} />
                          </div>
                          <div className="w-6 h-6 cursor-pointer">
                            <img src={delet3} />
                          </div>
                          <div className="w-6 h-6 cursor-pointer">
                            <img
                              src={edi12}
                              alt=""
                              className=""
                              width="100 "
                              onClick={() => {}}
                            />
                          </div>
                          <div className=" col-span-1 text-neutral-700">
                            <div className="justify-self-end"></div>
                          </div>
                        </div>
                      ))}
                      <div className="border-b px-10"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white w-full flex justify-between py-2 border-t rounded-b-xl text-neutral-700 ">
                  <div className="mx-5 cursor-default text-xl font-medium"></div>
                </div>
              </div>
            </div>
          </div>


          </div>

      </div>
    </div>
  );
}

export default Usermaster;
