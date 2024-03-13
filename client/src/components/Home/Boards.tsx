import { FaFlipboard } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";

const Boards: React.FC = () => {
  return (
    <div className={`w-[95%] h-full flex flex-col pl-[20px] bg-blue-300`}>
      <div className=" w-full h-[90px] flex flex-row items-center border-b-[2px] border-gray-300 bg-white">
        <FaFlipboard className="text-[50px] mr-[20px] text-teal-700" />
        <h1 className="text-[40px] text-gray-600">My Boards</h1>
      </div>
      <div className="pl-[40px] w-full h-[150px] flex flex-row items-center bg-white ">
        <div className="group relative h-[120px] w-[250px] rounded-[10px] bg-gradient-to-r from-indigo-400 via-in-300 to-sky-300 cursor-pointer flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200">
          <HiPlusCircle className="absolute text-white text-[40px] top-[5px] left-[5px] ease-in duration-200 group-hover:text-[45px]" />
          <h1 className="text-[25px] txt-">Create Board</h1>
        </div>
      </div>
    </div>
  );
};

export default Boards;
