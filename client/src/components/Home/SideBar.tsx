import React, { useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaFlipboard } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { BiSolidGroup } from "react-icons/bi";
import { RiTaskFill } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const [options, setOptions] = useState({
    board: true,
    favorite: false,
    team: false,
    task: false,
  });

  return (
    <div className="mt-[50px] absolute h-[500px] w-[300px] left-0 border-r-[1px] border-slate-300">
      <h1 className="h-[50px] flex items-center justify-center text-[25px] text-white bg-teal-600 ">
        <BsPersonWorkspace className="text-[30px] mr-[20px] " /> workspace
      </h1>
      <div className="bg-red-200 w-full h-[220px] grid grid-rows-4 ">
        <div className="w-full h-full bg-indigo-50 flex items-center pl-[70px] text-[20px] cursor-pointer ">
          <FaFlipboard className="text-[22px] mr-[10px]" />
          <h1>Boards </h1>
        </div>
        <div className="w-full h-full bg-yellow-50 flex items-center pl-[70px] text-[20px]">
          <FaRegBookmark className="text-[22px] mr-[10px]" />
          <h1>Bookmark</h1>
        </div>
        <div className="w-full h-full bg-yellow-50 flex items-center pl-[70px] text-[20px]">
          <BiSolidGroup className="text-[22px] mr-[10px]" />
          <h1>Teams</h1>
        </div>
        <div className="w-full h-full bg-yellow-50 flex items-center pl-[70px] text-[20px]">
          <RiTaskFill className="text-[22px] mr-[10px]" />
          <h1>Tasks</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
