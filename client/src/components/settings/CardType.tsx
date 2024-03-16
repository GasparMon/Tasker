import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface PropsStatus {
  handleClose: (name: string) => void;
}

interface Type {
  Task: boolean;
  Idea: boolean;
  Bug: boolean;
  Story: boolean;
}

const CardSType: React.FC<PropsStatus> = ({ handleClose }) => {
  const { setModal } = useSettingCard();
  const { Cardtype } = useSettingCard(
    (state) => ({ Cardtype: state.type }),
    shallow
  );

  useEffect(() => {
    setType((prevType) => ({
      ...prevType,
      Task: false,
      Idea: false,
      Bug: false,
      Story: false,
      [Cardtype]: true,
    }));
  }, [Cardtype]);

  const [type, setType] = useState<Type>({
    Task: false,
    Idea: false,
    Bug: false,
    Story: false,
  });

  const handleStatus = (name: string) => {
    setModal("type", name);
  };

  return (
    <div className="absolute w-[300px] h-[240px] bg-white top-[120px] right-[-92px] border-gray-100 rounded-[10px] border-[1px] shadow-sm shadow-black/10">
      <div className="w-full h-[35px] flex items-center justify-center text-slate-800 text-[19px] font-semibold">
        <h1>Type</h1>
        <div
          className="absolute top-[6px] right-[10px] rounded-[5px] group hover:bg-gray-100 w-[25px] h-[25px] flex items-center justify-center"
          onClick={() => handleClose("type")}
        >
          <CgClose className="text-[20px] text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-[230px] grid grid-rows-5 gap-[4px] py-[8px] mt-[5px]">
        <div
          className="ml-[15px] w-[90%] h-full bg-purple-400 rounded-[5px] flex items-center cursor-pointer hover:bg-purple-300 justify-between px-[20px]"
          onClick={() => handleStatus("Task")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Task</h1>
          {type.Task ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-blue-400 rounded-[5px] flex items-center cursor-pointer hover:bg-blue-300  justify-between px-[20px]"
          onClick={() => handleStatus("Idea")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Idea</h1>
          {type.Idea ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-red-400 rounded-[5px] flex items-center cursor-pointer hover:bg-red-300 justify-between px-[20px]"
          onClick={() => handleStatus("Bug")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Bug</h1>
          {type.Bug ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-green-400 rounded-[5px] flex items-center cursor-pointer hover:bg-green-300 justify-between px-[20px]"
          onClick={() => handleStatus("Story")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Story</h1>
          {type.Story ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardSType;
