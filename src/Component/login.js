import './login.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import login from '../img/login.png'
import tray from '../img/tray.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import kdms_internet_protocol_DBService_JSON_path from '../paths/api-path';
import Swal from 'sweetalert2';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    useEffect(async () => {
        if (localStorage.getItem("user_profile").length > 0) {
            navigate("/protocol", { replace: true });
        }
    }, []);

    const logins = async () => {
        const params_login = {
            params: {
                dbServiceName: "SOLogin",
                user: username, //user
                pass: password, //pass
            },
        };

        if (username === "" || username === null) {
            Swal.fire({
                icon: "error",
                text: "กรุณากรอกข้อมูลให้ครบ",
            });
            setTimeout(() => {
                Swal.close();
            }, 3000);
        } else if (password === "" || password === null) {
            Swal.fire({
                icon: "error",
                text: "กรุณากรอกข้อมูลให้ครบ",
            });
            setTimeout(() => {
                Swal.close();
            }, 3000);
        } else {
            axios
                .get(`${kdms_internet_protocol_DBService_JSON_path}`, params_login)
                .then(async (response) => {
                    try {
                        let response_data = await response.data;
                        let json_encode = JSON.stringify(response_data);
                        console.log("Result", response_data.result[0].iResult);

                        if (response_data.result[0].iResult === "1") {
                            localStorage.setItem("user_profile", json_encode);
                            localStorage.setItem("redirect_page", "/protocol");
                            localStorage.setItem(
                                "user_iResult",
                                response_data.result[0].iResult
                            );
                            localStorage.setItem("userCode", response_data.result[0].UidCod);
                            Swal.fire({
                                icon: "success",
                                text: "สำเร็จ",
                            });
                            setTimeout(() => {
                                Swal.close();
                                navigate("/protocol", { replace: true });
                            }, 2000);
                        } else {
                            localStorage.setItem(
                                "user_iResult",
                                response_data.result[0].iResult
                            );
                            localStorage.setItem("redirect_page", "/login");
                            localStorage.setItem("user_profile", "");
                            Swal.fire({
                                icon: "error",
                                text: "รหัสผ่านไม่ถูกต้อง",
                            });
                            setTimeout(() => {
                                Swal.close();
                            }, 3000);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    const handlesubmit =(e) =>{
      if (e.keyCode === 13) {
        document.getElementById('Login').click();
      }
    }
    return (
        //art-board
        <div className="grid grid-cols-12 w-screen overflow-hidden">
        
            <div className=" lg:col-span-5 md:col-span-12 center-kit">
                <img className="" src={tray} style={{ height: '100%', width: '70%' }} />
            </div>

            <div className="lg:mt-64 space-y-4  mt-400 lg:col-span-7 md:col-span-12 mx-32">
                    <label className="text-5xl text-blue-400 "> kdms Master Setting</label>
                    <br /><br />
                    <label className="text-4xl text-gray-400"> User Accounts & Data Managing </label>
                    <br />
                    <br />
                <div className="flex text-xl text-gray-500">
                    <input
                        id="User"
                        type="text"
                        className="outline-none "
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handlesubmit}
                        required
                    ></input>
                    <img className="" src={login} style={{ height: '3.5rem' }} />
                    <input
                        id="Password"
                        type="Password"
                        className="outline-none"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handlesubmit}
                        required
                    ></input>

                </div>
                <hr className="border-gray-200 w-11/12"></hr>
                <br />
                <div className='text-right mr-14 text-2xl '>
                    <button
                        id="Login"
                        type="button"
                        className=" cursor-pointer w-44 h-16 border  rounded-full bg-blue-300 text-white hover:bg-blue-500"
                        onClick={() => logins()}
                    >
                        Login
                    </button>
                </div>
                <div>
                    <Modal
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                color="red"
                            >
                                Warning Info
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                color="red"
                            >
                                Incorrect User Name or Password.
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Login