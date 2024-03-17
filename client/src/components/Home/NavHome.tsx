import React from "react";
import { GrTasks } from "react-icons/gr";
import { useLocalStorage } from "../../assets/localStorage";
import { IoNotifications } from "react-icons/io5";

const NavHome: React.FC = () => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  return (
    <div className="w-full h-[50px] flex fixed items-center justify-between bg-white backdrop-blur-sm border-b-[1px] border-slate-300 z-50">
      <div className="h-full w-[250px] flex items-center px-[10px] ml-[70px]">
        <GrTasks className="text-[40px] text-teal-700" />
        <h1 className="text-[40px] ml-[20px] font-bold">Tasker</h1>
      </div>

      <div className="h-full w-[120px] mr-[50px] grid grid-cols-2">
      <div className="w-full h-full flex items-center justify-center">
        <IoNotifications className="text-[30px] text-slate-700 cursor-pointer" />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div
            className=" h-[40px] w-[40px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
            style={{ background: `var(--gradiante-1` }}
          >
            {`${user.email[0].toUpperCase() + user.email[1].toUpperCase()}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHome;
