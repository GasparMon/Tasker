import React from "react";
import { GrTasks } from "react-icons/gr";

const NavHome: React.FC = () => {
  return (
    <div className="w-full h-[50px] flex fixed items-center justify-between bg-white backdrop-blur-sm border-b-[1px] border-slate-300">
      <div className="h-full w-[250px] flex items-center px-[10px] ml-[70px] ">
        <GrTasks className="text-[40px] text-slate-600" />
        <h1 className="text-[40px] ml-[20px] font-bold text-slate-600">Tasker</h1>
      </div>
    </div>
  );
}

export default NavHome;
