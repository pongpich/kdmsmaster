import "./UserMaster.css";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import NavBarb from "../../NavBar/NavBarb"
import Header from "../../Header"
import person123 from "../../../assets/img/person123.svg";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import edi12 from "../../../assets/img/edi12.svg";
import axios from "axios";
import kdms_internet_protocol_DBService_JSON_path from "../../../paths/api-path";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Xicon from "../../../assets/img/xmark.square.fill.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Group33 from "../../../assets/img/Group33.svg";
import DataTable from 'react-data-table-component';
import Prg1 from '../../../assets/img/Prg1.svg'
import Autocomplete from '@mui/material/Autocomplete';
import Addb from '../../../assets/img/Addb.svg'
import Swal from "sweetalert2";


function UserMaster() {
  const [List, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [hidden, setHidden] = useState();
  const [detail, setDetail] = useState([]);
  const user_description = "diagnose and treat medical conditions";

  const [Account, setAccount] = useState("");
  const [Loading, setLoading] = useState(true); //Loading...

  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
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
  const [UidExpDte, setUidExpDte] = useState("");
  const [DtrTiName, setDtrTiName] = useState("");

  const [DtrLicNum, setDtrLicNum] = useState("");
  const [responseEdit, setResponseEdit] = useState("");
  const [responseAdd, setResponseAdd] = useState("");
  // const [searchDep, setSearchDep] = useState("");
  const [user, setUser] = useState(localStorage.getItem("userCode"));
  const [state, setState] = React.useState({
    gilad: true,
    antoine: false,
  });

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const Clear = () => {
    setUidcod('');
    setUidTit('');
    setUidLocNam('');
    setUidLocMid('');
    setUidLocFam('');
    setUidEngNam('');
    setUidEngMid('');
    setUidEngFam('');
    setUidEmpNum('');
    setUidPas('');
    setUidDepCode('');
    setUidGrp('');
    setUidExpDte('');
    setDtrTiName('');
  }

  useEffect(() => {
    console.log(Account);
    Listdata();
  }, [Account]);

  useEffect(() => {
    Listdata();
  }, []);

  const searchData = (e) => {
    setSearch(e)
    const result = filteredList.filter(itemsearch => {
      return itemsearch.UidLocNam.toLowerCase().match(search.toLowerCase());
    })

    if (e.length === 0) {
      handleChange()
    } else {
      setFilteredList(result);
    }
  }

  useEffect(() => {
    console.log(UidGrp);
    console.log(UidDepCode);
    console.log(UidTit);
    setDtrTit(UidTit)

  }, [UidGrp, UidDepCode, UidTit]);

  const Listdata = async () => {
    if (Account === 'D') {
      setAccount('D');
    }
    if (Account === 'N') {
      setAccount('N');

    }
    if (Account === 'U') {
      setAccount('U');
    }

    const request_usermaster_Listdata = {
      params: {
        dbServiceName: "MSUserMasterList",
        Type: Account,
      },

    };
    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_Listdata
      )
      .then(async (response) => {
        setFilteredList(response.data.result);
        setList(response.data.result)
        console.log(response.data.result, "Listdata1");
      })
      .catch((error) => console.error(error));

  };

  const EditUserMaster = async () => {
    var name = ""
    if (UidLocNam != undefined) {
      name = utf8.encode(UidLocNam)
    }
    var middlename = ""
    if (UidLocMid != undefined) {
      middlename = utf8.encode(UidLocMid)
    }

    var lasntname = ""
    if (UidLocFam != undefined) {
      lasntname = utf8.encode(UidLocFam)
    }

    //--------------------- Name Eg
    var lasntnameEn = "";
    if (UidEngNam != undefined) {
      lasntnameEn = utf8.encode(UidEngNam)
    }
    var lasntnammid = "";
    if (UidEngNam != undefined) {
      lasntnammid = utf8.encode(UidEngMid)
    }

    var lasntnamfam = "";
    if (UidEngNam != undefined) {
      lasntnamfam = utf8.encode(UidEngFam)
    }

    var license = "";
    if (DtrLicNum != undefined) {
      license = utf8.encode(DtrLicNum)
    }

    var date = "";
    var month = "";
    var day = "";
    var result = ""
    if (UidExpDte != undefined) {
      date = UidExpDte.substring(0, 4)
      month = UidExpDte.substring(5, 7)
      day = UidExpDte.substring(8)
      result = date + month + day
    } else {

    }

    if (UidExpDte === "") {
      result = "99991231"
      // alert(result);
    }
    console.log(result, 'dateEdit')

    // middle name
    const request_usermaster_edit = {
      params: {
        dbServiceName: "MSSaveUserMaster",
        uidcod: Uidcod,
        UidTit: UidTit, //คำนำหน้า ไทย
        UidLocNam: name, //ชื่อ ไทย
        UidLocMid: middlename, //ชื่อกลาง ไทย
        UidLocFam: lasntname, //นามสกุล ไทย
        UidEngNam: lasntnameEn,
        UidEngMid: lasntnammid,
        UidEngFam: lasntnamfam,
        UidEmpNum: UidEmpNum,
        UidPas: UidPas,
        UidDepCod: UidDepCode,
        UidGrp: UidGrp,
        UidExpDte: result,
        DtrTit: DtrTit,
        DtrLicNum: license,
        typcod: "U",
        uidlogin: user,
      },
    };

    await axios
      .get(
        `${kdms_internet_protocol_DBService_JSON_path}`,
        request_usermaster_edit
      )
      .then(async (response) => {
        let response_data = await response.data;
        setResponseEdit(response_data.result);
        console.log(response.data.result);
   
    Swal.fire({
      icon: "success",
      text: "สำเร็จ",
    });
    setTimeout(() => {
      Swal.close();
    }, 2000)
   })
  .catch((error) => console.error(error));
  }
  const SeveUsermaster = async () => {
    var name = ""
    if (UidLocNam != undefined) {
      name = utf8.encode(UidLocNam)
    }
    var middlename = ""
    if (UidLocMid != undefined) {
      middlename = utf8.encode(UidLocMid)
    }

    var lasntname = ""
    if (UidLocFam != undefined) {
      lasntname = utf8.encode(UidLocFam)
    }

    var lasntnameEn = "";
    if (UidEngMid != undefined) {
      lasntnameEn = utf8.encode(UidEngMid)
    }

    var license = "";
    if (DtrLicNum != undefined) {
      license = utf8.encode(DtrLicNum)
    }

    var date = "";
    var month = "";
    var day = "";
    var result = ""
    if (UidExpDte != undefined) {
      date = UidExpDte.substring(0, 4)
      month = UidExpDte.substring(5, 7)
      day = UidExpDte.substring(8)
      result = date + month + day
    } else {
      result = "99991231"
    }

    const request_usermaster_save = {
      params: {
        dbServiceName: "MSSaveUserMaster",
        uidcod: Uidcod,
        UidTit: UidTit, //คำนำหน้า ไทย
        UidLocNam: name, //ชื่อ ไทย
        UidLocMid: middlename, //ชื่อกลาง ไทย
        UidLocFam: lasntname, //นามสกุล ไทย
        UidEngNam: UidEngNam,
        UidEngMid: lasntnameEn,
        UidEngFam: UidEngFam,
        UidEmpNum: UidEmpNum,
        UidPas: UidPas,
        UidDepCod: UidDepCode,
        UidGrp: UidGrp,
        UidExpDte: result,
        DtrTit: DtrTit,//ไม่เก็บ
        DtrLicNum: license,
        typcod: "I",
        uidlogin: user,
      },
    };
    if (Uidcod === "" || UidTit === undefined || UidTit === "" || name === "" || lasntname === "" || UidEngNam === "" || UidEngFam === "" || UidPas === ""
      || UidDepCode === undefined || UidGrp === undefined || result === "99991231" || result === "" || result === undefined) {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      setTimeout(() => {
        Swal.close();
      }, 2000);
    } else {
      // console.log();

      await axios
        .get(
          `${kdms_internet_protocol_DBService_JSON_path}`,
          request_usermaster_save
        )
        .then(async (response) => {
          let response_data = await response.data;
          setResponseAdd(response_data.result);
          console.log(response.data.result);
        
      Swal.fire({
        icon: "success",
        text: "สำเร็จ",
      });
      setTimeout(() => {
        Swal.close();
      }, 2000)
    })
    .catch((error) => console.error(error));
    }
  };

  //ID หมอ แพทย์ พยาบาล ผู้ใช้
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
      .catch((error) => {

        console.error(error);
      })
  };
  //Department
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
      .catch((error) => {

        console.error(error)
      })
  };



  //คำนำหน้า
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
        setLoading(false)
        console.log(response.data.result, "setTitle");
      })
      .catch((error) => {

        console.error(error)
      })
  };


  useEffect(() => {
    setTimeout(() => {
      getGroup();
    }, 500);

    setTimeout(() => {
      getDepartment();
    }, 800);

    setTimeout(() => {
      getTitle();

    }, 1000);


  }, [filteredList])


  useEffect(() => {
    setUidcod(detail.UidCod)
    setUidTit(detail.UidTit)
    setUidLocNam(detail.UidLocNam)
    setUidLocMid(detail.UidLocMid)
    setUidLocFam(detail.UidLocFam)
    setUidEngNam(detail.UidEngNam)
    setUidEngMid(detail.UidEngMid)
    setUidEngFam(detail.UidEngFam)
    setUidEmpNum(detail.UidEmpNum)
    setUidPas(detail.UidPas)
    setUidDepCode(detail.UidDepCod)
    setUidGrp(detail.UidGrp)
    // setUidExpDte(detail.UidExpDte)
    setDtrTit(detail.DtrTit)
    setDtrLicNum(detail.DtrLicNum)
    console.log(detail)
  }, [detail])

  useEffect(() => {
    Listdata()
  }, [responseAdd])

  useEffect(() => {
    Listdata()
  }, [responseEdit])

  const customStyles = {
    headCells: {
      style: {
        paddingLeft: '46px',
      },
    },
  };

  const columns = [
    {
      name: 'Image',
      center: true,
      selector: row => user_description,
      cell: (row) => (
        <div className="w-6 h-6 cursor-pointer">
          <img
            src={Prg1}
            alt=""
            width="100 "
          />
        </div>
      ),
    },
    {
      name: 'Type',
      selector: row => row.UidGrp === "U" ? "User" : "D" ? "Doctor" : "N" ? "Nurse" : null,
      width: '150px',
    },
    {
      name: 'ID',
      selector: row => row.UidCod,
      width: '150px'

    },
    {
      name: 'Name',
      selector: row => row.UidLocNam + " " + row.UidLocFam,
      width: '300px'
    },
    {
      name: 'Description',
      selector: row => user_description,
    },
    {
      name: 'Expiration Date',
      selector: row => row.UidExpDte = row.UidExpDte.replace(/(\d{4})(\d{2})(\d{2})/g, '$3/$2/$1'),
      width: '150px',
      conditionalCellStyles: [
        {
          when: row => row.UidExpDte > Date(),
          style: {
            color: 'red',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ],
    },
    {
      name: 'Action',
      selector: row => user_description,
      sortable: false,
      selector: "null",
      center: true,
      cell: (row) => [
        <div className="w-6 h-6 cursor-pointer">
          <img
            src={edi12}
            alt=""
            className=""
            style={{ paddingRight: "5px", textAlign: "center" }}
            width="100 "
            onClick={() => {
              setShowModal2(true)
              setDetail(row)
            }}
          />
        </div>
      ]

    },
  ]


  const onTagsChange = (event, values) => {
    Title.filter(name => name.HpmNam.includes(values)).map(filteredName => (
      setUidTit(filteredName.HpmCod),
      setDtrTit(filteredName.HpmCod),
      setDtrTiName(filteredName.HpmEng)
    ))
  }



  const handleChange = () => {
    var selected = document.getElementById('Department');
    var option = selected.options[selected.selectedIndex].value;
    const data = option
    console.log(data)
    const result = [];


    if (List.length > result.length) {
      List.filter(name => name.UidDepCod === data).map(filtered => (
        result.push(filtered)
      ))
      setFilteredList(result);
    }

    if (data === "All") {
      setFilteredList(List);
    }
  }

  const AddMasterUser = () => {
    if (showModal) {
      return (
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
                  Creating New ID
                  <div
                    onClick={() => {
                      setShowModal(false);
                      Clear();
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
                      autoComplete="off">

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
                                ID*
                              </InputLabel>
                              {dataG ? (<>
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
                              </>) : getGroup()}

                            </div>
                            <div className="">
                              <InputLabel className="text-left">
                                Department*
                              </InputLabel>
                              {Dep ? (<>
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
                                  {Dep?.map((i) => (
                                    <MenuItem value={i.DepCod}>
                                      {i.DepLocNam}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </>) : null}
                            </div>
                          </div>
                          <div className="flex mx-4">

                            <div className="">
                              <Stack component="form" noValidate spacing={3}>
                                <TextField
                                  id="date"
                                  label="expiration date*"
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
                              label="Code*"
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
                              label="Password*"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                            />
                          </div>

                          <div className="flex mx-5">
                            <div className="">
                              <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={Title.map((option) => option.HpmNam)}
                                onChange={onTagsChange}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="คำนำหน้า"
                                    InputProps={{
                                      ...params.InputProps,
                                      type: 'search',
                                    }}
                                  />
                                )}
                              />
                            </div>

                            <TextField
                              id="standard-number"
                              label="ชื่อ*"
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
                              label="นามสกุล*"
                              value={UidLocFam}
                              onChange={(e) => setUidLocFam(e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                            />
                          </div>


                          <div className="flex mx-5">
                            <TextField
                              disabled
                              id="standard-number"
                              label="Title*"
                              value={DtrTiName}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                            />
                            {/*
                              value={DtrTit}
                              onChange={(e) => setDtrTit(e.target.value)} */  }

                            <TextField
                              id="standard-number"
                              label="Name*"
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
                              label="Lastname*"
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
                        {/*  <h2 className="text-left text-gray-500 px-2 ">
                          Descriptions
                        </h2>
                        <textarea
                          rows={3}
                          type="text"
                          className="border outline-none w-full px-2 description"
                          /> */}
                      </div>
                    </Box>
                  </Card>
                </Stack>

                <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
                  <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                    onClick={() => {
                      Clear();
                    }}
                  >
                    Clear All
                  </div>
                  <div
                    onClick={() => {
                      SeveUsermaster();

                      // setShowModal(false)

                    }}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                  >
                    Add
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div >
      )
    }
  }

  const EditMasterUser = () => {
    if (showModal2) {
      return (
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
                  Updating ID User
                  <div
                    onClick={() => {
                      setShowModal2(false);
                      Clear();
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
                              <InputLabel className="text-left"
                                sx={{ fontSize: '11px' }}
                              >
                                ID
                              </InputLabel>
                              {dataG ? (<>
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
                              </>) : null}

                            </div>

                            <div className="">
                              <InputLabel className="text-left"
                                sx={{ fontSize: '11px' }}

                              >
                                Department
                              </InputLabel>
                              {Dep ? (<>
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
                                  {Dep?.map((i) => (
                                    <MenuItem value={i.DepCod}>
                                      {i.DepLocNam}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </>) : null}
                            </div>
                          </div>
                          <div className="flex mx-4">

                            <div className="">
                              <Stack component="form" noValidate spacing={3}>
                                <TextField
                                  id="date"
                                  label="expiration date"
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
                              disabled
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
                              label="Password"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                            />
                          </div>

                          <div className="flex mx-5">
                            <div className="">
                              <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={Title.map((option) => option.HpmNam)}
                                onChange={onTagsChange}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Search"
                                    InputProps={{
                                      ...params.InputProps,
                                      type: 'search',
                                    }}
                                  />
                                )}
                              />
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
                            <TextField
                              disabled
                              id="standard-number"
                              label="Title"
                              value={DtrTiName}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                            />
                            {/* value={DtrTit}
                              onChange={(e) => setDtrTit(e.target.value)} */}

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

                      </div>
                    </Box>
                  </Card>
                </Stack>

                <div className=" flex space-x-9 justify-center font-medium text-sm  py-3">
                  <div className="py-1 cursor-pointer w-24 border  rounded-full text-center border-indigo-700 text-indigo-700"
                    onClick={() => {
                      Clear();
                    }}
                  >
                    Clear All
                  </div>
                  <div
                    onClick={EditUserMaster}
                    className="py-1 cursor-pointer w-24 border  rounded-full text-center bg-blue-800 text-white"
                  >
                    Update
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className=" h-screen flex">
      <div className="">
        <NavBarb />
      </div>
      <div className="w-full">
        <Header />

        <div>
          <div className="px-5 py-5 grid grid-cols-4 " >
            <div className="md:col-span-2 pt-10 lg:col-span-2 lg:pt-0">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                style={{ marginLeft: '20px' }}>

                <Card sx={{ display: "flex" }}>
                  <CardActionArea>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}>

                      <div className="mx-5 cursor-default text-xl font-medium"
                        style={{ alignSelf: "center" }}>

                        <img src={person123} alt="" className="" width="50" />
                      </div>
                      <div
                        className="mx-5 cursor-default text-xl font-medium ml-2"
                      >
                        <p className="doctoridfonteng font">Creating ID User</p>
                        <p className="doctoridfontthai ">เพิ่มผู้ใช้งานใหม่</p>
                      </div>
                    </Stack>
                  </CardActionArea>
                  <CardMedia className="addicon1">
                    <img
                      src={Addb}
                      alt=""
                      className="cursor-pointer"
                      width="100 "
                      onClick={() => {
                        setShowModal(true)
                      }}
                    />
                  </CardMedia>
                </Card>
              </Stack>
            </div>

            <div className="col-span-2 text-right">
              <div className="mx-6 text-xl">บัญชีใช้งาน</div>
              <div className="mx-6 text-xs text-gray-500">กรุณาเลือกบัญชีผู้ใช้งาน</div>
              <div className="grid lg:grid-cols-4 lg:ml-50 lg:space-x-4  md:grid-cols-2 place-items-center space-y-1 md:ml-28">
                <div className=" py-2 cursor-pointer w-24  border h-8  rounded-full text-center border-gray-500 text-gray-500 text-xs hover:text-black "
                  onClick={() => setAccount("")}
                >
                  All
                </div>
                <div className="py-2 cursor-pointer w-24  border h-8  rounded-full text-center border-gray-500 text-gray-500 text-xs hover:text-black"
                  onClick={() => {
                    setAccount("D");
                  }}
                >
                  แพทย์
                </div>
                <div className="py-2 cursor-pointer w-24 border h-8  rounded-full text-center border-gray-500 text-gray-500 text-xs hover:text-black"
                  onClick={() => {
                    setAccount("N")
                  }}
                >
                  พยาบาล
                </div>
                {/*    <div className="py-2 cursor-pointer w-24 border h-8  rounded-full text-center border-gray-500 text-gray-500 text-xs hover:text-black">
                ผู้ช่วยพยาบาล
                  </div>*/}
                <div className="py-2 cursor-pointer w-24 border h-8  rounded-full text-center border-gray-500 text-gray-500 text-xs hover:text-black"
                  onClick={() => {
                    setAccount("U")
                  }}
                >
                  ผู้ใช้งาน
                </div>
                {/*    <div className="py-2 cursor-pointer w-24 border h-8  rounded-full text-center border-gray-500 text-gray-500 text-xs hover:text-black">
                ผู้ใช้งานชั่วคราว
                </div>*/}
              </div>
            </div>
          </div>

          <div className="mx-10 my-2" style={{ width: "95%" }}>
            <div className="card-header  border rounded-xl pt-5 cardborder ">
              <div className="px-2 grid grid-cols-12">
                <div className="col-span-5 grid grid-cols-5 text-back text-center ">
                  <div>
                    <h1 className="text-xl text-center">แผนก</h1>
                  </div>
                  <div className="col-span-4  ">
                    <select className="w-11/12 bg-gray-50" id="Department" onChange={handleChange}>
                      {Dep?.map((i) => (
                        <option value={i.DepCod}>
                          {i.DepLocNam}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="col-span-3 grid grid-cols-3 text-back text-center ">
                  {/*<div>
                      <h1 className="text-xl">บัญชี</h1>
                    </div>
                    <div className="col-span-2 ">
                      <select className="w-6/6 bg-gray-50" >
                        <option >physical medicine and </option>

                      </select>
                        </div> */}
                </div>

                <div className="col-span-3 pb-1 flex justify-end -mt-4">
                  <div className=" pl-5 pt-5 absolute w-15">
                    <BsSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full  border-b  outline-0	 px-2 pt-5"
                    value={search}
                    onChange={(e) => searchData(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className=" border-b-2 border-slate-200 mx-2"></div>
              {!Loading ? (
                <DataTable
                  columns={columns}
                  data={filteredList}
                  pagination
                  // customStyles={customStyles}
                  fixedHeader
                  fixedHeaderScrollHeight="430px"
                />
              ) : <div className="ml-3 text-xs">Loading...</div>}
              <div className="bg-white w-full flex justify-between py-2 border-t rounded-b-xl text-neutral-700 ">
                <div className="mx-5 cursor-default text-xl font-medium"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{showModal ? <div>{AddMasterUser()}</div> : null}</div>
      <div>{showModal2 ? <div>{EditMasterUser()}</div> : null}</div>
    </div>
  );
}

export default UserMaster
