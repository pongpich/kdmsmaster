import Icon from "../assets/img/tray.and.arrow.down.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Header() {
  let navigate = useNavigate();

  function handleLogOut() {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("user_profile", '');
        localStorage.clear();
        navigate("/login", { replace: true });
        Swal.fire({
          icon: "success",
          text: "สำเร็จ",
        });
        Swal.fire("Logout!", "You have successfully logged out.", "success"
        );
      }
      setTimeout(() => {
        Swal.clear();
      }, 3000);
      console.log("logout");
    });
  }

  return (
    <div>
      <div className=" text-center bg-header px-5 py-5 font-bold shadow-lg text-neutral-700">
        <div className=" flex justify-center space-x-4 items-center">
          <img src={Icon} alt="" className="w-8" />
          <h2>Master Setting</h2>
        </div>

        <div onClick={() => handleLogOut()} className="items-center flex cursor-pointer w-24 border-0 hover:bg-slate-200  rounded-full text-center text-neutral-700 -mt-6"
          style={{float:"right"}}
        >
          <LogoutOutlinedIcon style={{ height: '1.5rem' }} /> Logout
        </div>
      </div>
    </div>
  );
}

export default Header;