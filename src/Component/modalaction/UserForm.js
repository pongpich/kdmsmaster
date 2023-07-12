import "./UserForm.css";
import React, { useEffect, useState } from "react";
import Xicon from "../../assets/img/xmark.square.fill.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Prg from "../../assets/img/prg.svg";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Group33 from "../../assets/img/Group33.svg";
import kdms_internet_protocol_DBService_JSON_path from "../../paths/api-path";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import edi12 from "../../assets/img/edi12.svg";
import MenuItem from "@mui/material/MenuItem";

function UserForm(e) {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [hidden, setHidden] = useState();

  const [dataA, setDataA] = useState();
  const [dataG, setDataG] = useState([]);
  const [Dep, setDep] = useState([]);
  const [Title, setTitle] = useState([]);
  const utf8 = require("utf8");

  const [UidGrp, setUidGrp] = useState("");
  const [UidDepCode, setUidDepCode] = useState("");
  const [UidTit, setUidTit] = useState("");
  const [Uidcod, setUidcod] = useState("");
  const [UidLocNam, setUidLocNam] = useState("");
  const [UidLocMid, setUidLocMid] = useState("");
  const [UidLocFam, setUidLocFam] = useState("");
  const [UidEngNam, setUidEngNam] = useState("");
  const [UidEngMid, setUidEngMid] = useState("");
  const [UidEngFam, setUidEngFam] = useState("");
  const [UidEmpNum, setUidEmpNum] = useState("");
  const [UidPas, setUidPas] = useState("");
  const [DtrTit, setDtrTit] = useState("");
  const [DtrDepCod, setDtrDepCod] = useState("");
  const [UidExpDte, setUidExpDte] = useState("");
  const [DtrLicNum, setDtrLicNum] = useState("");
  const [user, setUser] = useState(localStorage.getItem("userCode"));
  const [state, setState] = React.useState({
    gilad: true,
    antoine: false,
  });

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  useEffect(() => {
    Getdata();
    getGroup();
    getDepartment();
    getTitle();
    console.log("Edit", e.result);
  }, []);

  useEffect(() => {
    if (e.data === "E") {
      setShowModal2(true);
    }
    console.log("E", e.data);
  }, [showModal2]);

  useEffect(() => {
    console.log(UidGrp);
    console.log(UidDepCode);
    console.log(UidTit);
  }, [UidGrp, UidDepCode, UidTit]);

  const Getdata = async () => {
    const request_usermaster_doctor = {
      params: {
        dbServiceName: "MSUserMasterList",
        Type: "D",
      },
    };

    const { data } = await axios.get(
      `${kdms_internet_protocol_DBService_JSON_path}`,
      request_usermaster_doctor
    );
    setDataA(data.result);
    console.log(data.result, "D");
  };

  //Group หมอ พยาบาล ผู้ใช้งานชั่วคราว ผู้ใช้งาน
  const getGroup = async () => {
    const request_usermaster_Group = {
      params: {
        dbServiceName: "MSUserGroupList",
      },
    };

    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_Group
      )
      .then(async (response) => {
        setDataG(response.data.result);
        console.log(response.data.result, "Group");

      })
      .catch((error) => console.error(error));
  };

  const getDepartment = async () => {
    const request_usermaster_Department = {
      params: {
        dbServiceName: "MSDepartmentList",
      },
    };

    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_Department
      )
      .then(async (response) => {
        setDep(response.data.result);
        console.log(response.data.result, "Department");
      })
      .catch((error) => console.error(error));
  };

  const getTitle = async () => {
    const request_usermaster_setTitle = {
      params: {
        dbServiceName: "MSTitleName",
        keyword: "",
      },
    };

    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_setTitle
      )
      .then(async (response) => {
        setTitle(response.data.result);
        console.log(response.data.result, "setTitle");
      })
      .catch((error) => console.error(error));
  };

  const SeveUsermaster = async () => {
    setDtrTit(UidTit);

    const request_usermaster_save = {
      params: {
        dbServiceName: "MSSaveUserMaster",
        uidcod: Uidcod,
        UidTit: utf8.encode(UidTit), //คำนำหน้า ไทย
        UidLocNam: utf8.encode(UidLocNam), //ชื่อ ไทย
        UidLocMid: utf8.encode(UidLocMid), //ชื่อกลาง ไทย
        UidLocFam: utf8.encode(UidLocFam), //นามสกุล ไทย
        UidEngNam: UidEngNam,
        UidEngMid: UidEngMid,
        UidEngFam: UidEngFam,
        UidEmpNum: UidEmpNum,
        UidPas: UidPas,
        UidDepCod: UidDepCode,
        UidGrp: UidGrp,
        UidExpDte: "20220730",
        DtrTit: DtrTit,
        DtrLicNum: DtrLicNum,
        typcod: "I",
        uidlogin: user,
      },
    };
    console.log();

    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_save
      )
      .then(async (response) => {
        const responseData = response.data.result;
        console.log(response.data.result);
      })
      .catch((error) => console.error(error));
  };

  const itemsdoctor = () => {
    return (
      <div>
        {e.data === "I" ? (
          <div
            onClick={() => {
              setHidden("hidden");
            }}
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20  shadow-lg focus:outline-none backdrop-blur "
          >
            <div className="flex justify-center m-5 h-5/6 w-3/4 text-base cursor-default">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  mb-4  focus:outline-none overflow-y-auto"
                style={{ backgroundColor: "#F2F5E7" }}
              >
                <div className="py-3 yellowbg">
                  <div className=" flex justify-between leading-relaxed space-x-15 text-2xl formbox1">
                    Create New Doctor ID
                    <div
                      onClick={() => {
                        setShowModal2(false);
                      }}
                    >
                      <img src={Xicon} alt="" className="h-10 cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="yellowbg pt-5 px-5 space-y-6 formbox2 h-full ">
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    style={{ justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        backgroundColor: "#F2F5E7",
                      }}
                    >
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div className="grid grid-cols-12">
                          <div className="lg:col-span-4 col-span-12 lg:ml-20">
                            <center>
                              <img
                                src={Group33}
                                className="cursor-pointer mt-6"
                                style={{
                                  height: "320px",
                                  width: "300px",
                                  alignItems: "center",
                                  justifyItems: "center",
                                }}
                              />
                            </center>
                          </div>
                          <div
                            className="lg:col-span-8 col-span-12  mt-5"
                            style={{
                              alignItems: "center",
                              justifyItems: "center",
                            }}
                          >
                            <div className="flex ml-7 space-x-6 ">
                              <div className="">
                                <InputLabel className="text-left">
                                  Title
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={UidGrp}
                                  onChange={(e) => setUidGrp(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                >
                                    {dataG?.map((i) => (
                                      <MenuItem value={i.HpmCod}>
                                        {i.HpmNam}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </div>

                              <div className="">
                                <InputLabel className="text-left">
                                  Department
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={UidDepCode}
                                  onChange={(e) =>
                                    setUidDepCode(e.target.value)
                                  }
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                >
                                
                                    {Dep.map((i) => (
                                      <MenuItem value={i.DepCod}>
                                        {i.DepLocNam}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </div>
                            </div>
                            <div className="flex mx-4">

                              <div className="">
                                <Stack component="form" noValidate spacing={3}>
                                  <TextField
                                    id="date"
                                    label="calendar"
                                    type="date"
                                    value={UidExpDte}
                                    onChange={(e) =>
                                      setUidExpDte(e.target.value)
                                    }
                                    variant="standard"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Stack>
                              </div>
                            </div>
                            <div className="flex mx-5 ">
                              <TextField
                                id="standard-number"
                                label="Code"
                                value={Uidcod}
                                onChange={(e) => setUidcod(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />

                              <TextField
                                id="standard-number"
                                label="Code EMP"
                                value={UidEmpNum}
                                onChange={(e) => setUidEmpNum(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                              <TextField
                                id="standard-number"
                                value={UidPas}
                                onChange={(e) => setUidPas(e.target.value)}
                                label="PassWord"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                            </div>

                            <div className="flex mx-5">
                              <div className="">
                                <InputLabel className="text-left">
                                  คำนำหน้า
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={UidTit}
                                  onChange={(e) => setUidTit(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                >

                                    {Title?.map((i) => (
                                      <MenuItem value={i.HpmCod}>
                                        {i.HpmNam}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </div>

                              <TextField
                                id="standard-number"
                                label="ชื่อ"
                                value={UidLocNam}
                                onChange={(e) => setUidLocNam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />

                              <TextField
                                id="standard-number"
                                label="ชื่อกลาง"
                                value={UidLocMid}
                                onChange={(e) => setUidLocMid(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />

                              <TextField
                                id="standard-number"
                                label="นามสกุล"
                                value={UidLocFam}
                                onChange={(e) => setUidLocFam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                            </div>
                            <div className="flex mx-5">
                              <div className="">
                                <InputLabel className="text-left">
                                  Title
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={DtrTit}
                                  onChange={(e) => setDtrTit(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                ></Select>
                              </div>
                              <TextField
                                id="standard-number"
                                label="Name"
                                value={UidEngNam}
                                onChange={(e) => setUidEngNam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                              <TextField
                                id="standard-number"
                                label="Middle Name"
                                value={UidEngMid}
                                onChange={(e) => setUidEngMid(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                              <TextField
                                id="standard-number"
                                label="Lastname"
                                value={UidEngFam}
                                onChange={(e) => setUidEngFam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                            </div>
                          </div>
                        </div>

                        <div></div>
                        <div className="">
                          <FormControl
                            fullWidth
                            sx={{ m: 1 }}
                            variant="standard"
                          >
                            <InputLabel htmlFor="standard-adornment-amount">
                              License / ใบอนุญาต
                            </InputLabel>
                            <Input
                              value={DtrLicNum}
                              onChange={(e) => setDtrLicNum(e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </FormControl>
                          <h2 className="text-left text-gray-500 px-2 ">
                            Description
                          </h2>
                          <textarea
                            rows={3}
                            type="text"
                            className="border outline-none w-full px-2 description"
                          />
                        </div>
                      </Box>
                    </Card>
                  </Stack>

                  <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
                    <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700">
                      Clear All
                    </div>
                    <div
                      onClick={SeveUsermaster}
                      className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                    >
                      Add
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setHidden("hidden");
            }}
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20  shadow-lg focus:outline-none backdrop-blur "
          >
            <div className="flex justify-center m-5 h-5/6 w-3/4 text-base cursor-default">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  mb-4  focus:outline-none overflow-y-auto"
                style={{ backgroundColor: "#F2F5E7" }}
              >
                <div className="py-3 yellowbg">
                  <div className=" flex justify-between leading-relaxed space-x-15 text-2xl formbox1">
                    Edit Master User ID
                    <div
                      onClick={() => {
                        setShowModal2(false);
                      }}
                    >
                      <img src={Xicon} alt="" className="h-10 cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="yellowbg pt-5 px-5 space-y-6 formbox2 h-full ">
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    style={{ justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        backgroundColor: "#F2F5E7",
                      }}
                    >
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div className="grid grid-cols-12">
                          <div className="lg:col-span-4 col-span-12 lg:ml-20">
                            <center>
                              <img
                                src={Group33}
                                className="cursor-pointer mt-6"
                                style={{
                                  height: "320px",
                                  width: "300px",
                                  alignItems: "center",
                                  justifyItems: "center",
                                }}
                              />
                            </center>
                          </div>
                          <div
                            className="lg:col-span-8 col-span-12  mt-5"
                            style={{
                              alignItems: "center",
                              justifyItems: "center",
                            }}
                          >
                            <div className="flex ml-7 space-x-6 ">
                              <div className="">
                                <InputLabel className="text-left">
                                  Title
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={UidGrp}
                                  onChange={(e) => setUidGrp(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                >
                                    {dataG?.map((i) => (
                                      <MenuItem value={i.HpmCod}>
                                        {i.HpmNam}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </div>

                              <div className="">
                                <InputLabel className="text-left">
                                  Department
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={UidDepCode}
                                  onChange={(e) =>
                                    setUidDepCode(e.target.value)
                                  }
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                >
                                    {Dep.map((i) => (
                                      <MenuItem value={i.DepCod}>
                                        {i.DepLocNam}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </div>
                            </div>
                            <div className="flex mx-4">

                              <div className="">
                                <Stack component="form" noValidate spacing={3}>
                                  <TextField
                                    id="date"
                                    label="calendar"
                                    type="date"
                                    value={UidExpDte}
                                    onChange={(e) =>
                                      setUidExpDte(e.target.value)
                                    }
                                    variant="standard"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Stack>
                              </div>
                            </div>
                            <div className="flex mx-5 ">
                              <TextField
                                id="standard-number"
                                label="Code"
                                value={Uidcod}
                                onChange={(e) => setUidcod(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />

                              <TextField
                                id="standard-number"
                                label="Code EMP"
                                value={UidEmpNum}
                                onChange={(e) => setUidEmpNum(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                              <TextField
                                id="standard-number"
                                value={UidPas}
                                onChange={(e) => setUidPas(e.target.value)}
                                label="PassWord"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                            </div>

                            <div className="flex mx-5">
                              <div className="">
                                <InputLabel className="text-left">
                                  คำนำหน้า
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={UidTit}
                                  onChange={(e) => setUidTit(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                >
                                    {Title?.map((i) => (
                                      <MenuItem value={i.HpmCod}>
                                        {i.HpmNam}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </div>

                              <TextField
                                id="standard-number"
                                label="ชื่อ"
                                value={UidLocNam}
                                onChange={(e) => setUidLocNam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />

                              <TextField
                                id="standard-number"
                                label="ชื่อกลาง"
                                value={UidLocMid}
                                onChange={(e) => setUidLocMid(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />

                              <TextField
                                id="standard-number"
                                label="นามสกุล"
                                value={UidLocFam}
                                onChange={(e) => setUidLocFam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                            </div>
                            <div className="flex mx-5">
                              <div className="">
                                <InputLabel className="text-left">
                                  Title
                                </InputLabel>
                                <Select
                                  id="standard-select-currency-native"
                                  value={DtrTit}
                                  onChange={(e) => setDtrTit(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="standard"
                                ></Select>
                              </div>
                              <TextField
                                id="standard-number"
                                label="Name"
                                value={UidEngNam}
                                onChange={(e) => setUidEngNam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                              <TextField
                                id="standard-number"
                                label="Middle Name"
                                value={UidEngMid}
                                onChange={(e) => setUidEngMid(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                              <TextField
                                id="standard-number"
                                label="Lastname"
                                value={UidEngFam}
                                onChange={(e) => setUidEngFam(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                              />
                            </div>
                          </div>
                        </div>

                        <div></div>
                        <div className="">
                          <FormControl
                            fullWidth
                            sx={{ m: 1 }}
                            variant="standard"
                          >
                            <InputLabel htmlFor="standard-adornment-amount">
                              License / ใบอนุญาต
                            </InputLabel>
                            <Input
                              value={DtrLicNum}
                              onChange={(e) => setDtrLicNum(e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </FormControl>
                          <h2 className="text-left text-gray-500 px-2 ">
                            Description
                          </h2>
                          <textarea
                            rows={3}
                            type="text"
                            className="border outline-none w-full px-2 description"
                          />
                        </div>
                      </Box>
                    </Card>
                  </Stack>

                  <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
                    <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700">
                      Clear All
                    </div>
                    <div
                      onClick={SeveUsermaster}
                      className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                    >
                      Add
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (e.data === "I") {
    return (
      <div>
        <div>
          <img
            src={Prg}
            alt=""
            className=""
            width="100 "
            onClick={() => {
              setShowModal2(true);
            }}
          />
          {showModal2 ? <div>{itemsdoctor()}</div> : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <img
          src={edi12}
          alt=""
          className=""
          width="100 "
          onClick={() => {
            setShowModal2(true);
          }}
        />
        <div>{showModal2 ? <div>{itemsdoctor()}</div> : null}</div>
      </div>
    );
  }
}

export default UserForm;
