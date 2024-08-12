import { logout } from "./slices/user";
import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import Profile from "./Profile";

const DropDownMenu = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="sm:hidden border-2
     border-slate-300 p-2 rounded flex flex-col gap-1  fixed top-14 right-4 bg-white font-semibold"
    >
      <div
        onClick={() => dispatch(logout())}
        className=" flex hover:cursor-pointer hover:bg-lime-300 active:bg-lime-300 text-lg gap-1"
      >
        <LogOut />
        <span>Logout</span>
      </div>
      <hr />
      <div className="flex items-center text-lg gap-1">
        <Profile />
      </div>
    </div>
  );
};

export default DropDownMenu;
