import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";

interface PropsStatus {
  handleClose: (name: string) => void;
}

interface Status {
  toDo: boolean;
  inProgress: boolean;
  waiting: boolean;
  finished: boolean;
  archived: boolean;
}

const CardStatus: React.FC<PropsStatus> = ({ handleClose }) => {
  const [status, setStatus] = useState<Status>({
    toDo: false,
    inProgress: false,
    waiting: false,
    finished: false,
    archived: false,
  });

  const handleStatus = (name: string) => {
    setStatus({
      toDo: false,
      inProgress: false,
      waiting: false,
      finished: false,
      archived: false,
      [name]: true,
    });
  };

  return (
    <div className="absolute w-[300px] h-[290px] bg-white top-[55px] right-[-95px] rounded-[10px] border-[1px] shadow-sm shadow-black/10">
      <div className="w-full h-[35px] flex items-center justify-center text-slate-800 text-[19px] font-semibold">
        <h1>Status</h1>
        <div
          className="absolute top-[6px] right-[10px] rounded-[5px] group hover:bg-gray-100 w-[25px] h-[25px] flex items-center justify-center"
          onClick={() => handleClose("status")}
        >
          <CgClose className="text-[20px] text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-[230px] grid grid-rows-5 gap-[4px] py-[8px] mt-[5px]">
        <div
          className="ml-[15px] w-[90%] h-full bg-emerald-500 rounded-[5px] flex items-center cursor-pointer hover:bg-emerald-400 justify-between px-[20px]"
          onClick={() => handleStatus("toDo")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">ToDo</h1>
          {status.toDo ? (
                  <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
                ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-yellow-300 rounded-[5px] flex items-center cursor-pointer hover:bg-yellow-200 justify-between px-[20px]"
          onClick={() => handleStatus("inProgress")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">
            In-Progress
          </h1>
          {status.inProgress ? (
                  <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
                ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-orange-400 rounded-[5px] flex items-center cursor-pointer hover:bg-orange-300 justify-between px-[20px]"
          onClick={() => handleStatus("waiting")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Waiting</h1>
          {status.waiting ? (
                  <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
                ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-sky-500 rounded-[5px] flex items-center cursor-pointer hover:bg-sky-400 justify-between px-[20px]"
          onClick={() => handleStatus("finished")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Finished</h1>
          {status.finished ? (
                  <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
                ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-slate-400 rounded-[5px] flex items-center cursor-pointer hover:bg-slate-300 justify-between px-[20px]"
          onClick={() => handleStatus("archived")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Archived</h1>
          {status.archived ? (
                  <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
                ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardStatus;
