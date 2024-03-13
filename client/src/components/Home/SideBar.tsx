import { BsPersonWorkspace } from "react-icons/bs";
import { FaFlipboard } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { BiSolidGroup } from "react-icons/bi";
import { RiTaskFill } from "react-icons/ri";
import { useOptionsHome } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

const Sidebar: React.FC = () => {

    const { board, bookmark, team, task } = useOptionsHome(state => ({
        board: state.board,
        bookmark: state.bookmark,
        team: state.team,
        task: state.task
    }), shallow);
    
  const { setOption } = useOptionsHome();

  return (
    <div className="mt-[50px] absolute h-[271px] w-[300px] left-0 ">
      <h1 className="h-[50px] flex items-center justify-center text-[25px] text-white bg-teal-600 ">
        <BsPersonWorkspace className="text-[30px] mr-[20px] " /> workspace
      </h1>
      <div className=" w-full h-[220px] grid grid-rows-4 ">
        <div className={`group hover:text-black w-full h-full bg-indigo-50 flex items-center pl-[70px] text-[20px] cursor-pointer ease-in duration-100
         ${
            board
              ? "bg-blue-500/20 border-b-[5px] border-sky-600"
              : "bg-white border-b-[5px] border-white text-gray-600"
          }
        `}
        onClick={() => setOption("board")}
        >
          <FaFlipboard className={`text-[22px] mr-[10px] group-hover:text-black  ${
            board
              ? "text-black"
              : "text-gray-500"
          }`} />
          <h1>Boards </h1>
        </div>
        <div className={`group hover:text-black w-full h-full bg-indigo-50 flex items-center pl-[70px] text-[20px] cursor-pointer ease-in duration-100
         ${
            bookmark
            ? "bg-blue-500/20 border-b-[5px] border-sky-600"
            : "bg-white border-b-[5px] border-white text-gray-600"
          }
        `}
        onClick={() => setOption("bookmark")}
        >
          <FaRegBookmark className={`text-[22px] mr-[10px] group-hover:text-black  ${
            bookmark
              ? "text-black"
              : "text-gray-500"
          }`} />
          <h1>Bookmark</h1>
        </div>
        <div className={`group hover:text-black w-full h-full bg-indigo-50 flex items-center pl-[70px] text-[20px] cursor-pointer ease-in duration-100
         ${
            team
            ? "bg-blue-500/20 border-b-[5px] border-sky-600"
            : "bg-white border-b-[5px] border-white text-gray-600"
          }
        `}
        onClick={() => setOption("team")}
        >
          <BiSolidGroup className={`text-[22px] mr-[10px] group-hover:text-black  ${
            team
              ? "text-black"
              : "text-gray-500"
          }`} />
          <h1>Teams</h1>
        </div>
        <div className={`group hover:text-black w-full h-full bg-indigo-50 flex items-center pl-[70px] text-[20px] cursor-pointer ease-in duration-100
         ${
            task
            ? "bg-blue-500/20 border-b-[5px] border-sky-600"
            : "bg-white border-b-[5px] border-white text-gray-600"
          }
        `}
         onClick={() => setOption("task")}
        >
          <RiTaskFill className={`text-[22px] mr-[10px] group-hover:text-black  ${
            task
              ? "text-black"
              : "text-gray-500"
          }`} />
          <h1>Tasks</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
