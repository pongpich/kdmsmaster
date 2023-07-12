import React, { useState } from "react";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import Swal from "sweetalert2";

function DelBody({ data }) {
  //   const [modalbody, setModalbody] = useState();
  const [Namtha, setNamtha] = useState(data.HpmNam);
  const [Nameng, setNameng] = useState(data.HpmEng);
  const [bdycod, setBdycod] = useState(data.BdyCod);
  const utf8 = require("utf8");

  //   console.log(data.HpmEng,Nameng,"data 14");
  const setData = () => {
    setBdycod(data.BdyCod);
    setNameng(data.HpmEng);
    setNamtha(data.HpmNam);
    console.log("setdata", data.BdyCod);

    DeleteBody();
  };
  console.log(bdycod, Namtha, Nameng, "setdata");

  const req_insdata = {
    params: {
      dbServiceName: "MSSaveExcerciseBodyMaster",
      bdycod: bdycod,
      namtha: Namtha,
      nameng: Nameng,
      typcod: "D",
      uidcod: "BRBADMIN",
    },
  };
  console.log(bdycod, "เจอป้ะ");

  const DeleteBody = async () => {
    console.log(bdycod, "ไม่เจอสินะ");

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
          axios.get(
            `${kdms_internet_protocol_DBService_JSON_path}`,
            req_insdata
          );
          Swal.fire({
            icon: "success",
            text: "สำเร็จ",
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }

        console.log("delete");
      }

      console.log("swal");
    });
  };

  const ClearData = () => {
    setBdycod("");
    setNameng("");
    setNamtha("");
  };

  return (
    <>
      <div
        onClick={() => {
          setData();
        }}
      >
        <p className="px-4 py-2 text-sm text-neutral-700 flex flex-row hover:bg-neutral-100">
          {" "}
          Delete
        </p>
      </div>
    </>
  );
}

export default DelBody;
