import { PiCardsBold } from "react-icons/pi";

interface UrgentCard {
  title: string;
  status: string;
  label: string;
}
const UrgentCard: React.FC<UrgentCard> = ({ title, status, label }) => {
  return (
    <div className="relative w-full h-[50px] flex justify-center items-center px-[20px]">
      <div className="w-[170px] h-[30px] rounded-[5px] flex items-center justify-center shadow-sm bg-gray-400 shadow-black/20  mr-[20px] px-[10px]">
        <div className="h-full w-[30px] flex items-center justify-center">
          <PiCardsBold className="text-[20px] mr-[10px] text-slate-800" />
        </div>
        <h1 className="text-[17px] text-slate-800 font-semibold truncate">
          {title}
        </h1>
      </div>
      <div className="w-[100px] h-[20px] flex items-center justify-center mr-[20px]">
        <div
          className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${label === "Urgent" && "bg-amber-500"}
                ${label === "Priority" && "bg-orange-600"}
                ${label === "Critical" && "bg-red-600"}
               `}
        >
          <h1 className="text-slate-800 font-medium">{label}</h1>
        </div>
      </div>
      <div className="w-[100px] h-[20px] flex items-center justify-center mr-[20px]">
        <div
          className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${status === "ToDo" && "bg-emerald-500"}
                ${status === "InProgress" && "bg-yellow-300"}
                ${status === "Waiting" && "bg-orange-400"}
                ${status === "Finished" && "bg-sky-500 "}
                ${status === "Archived" && "bg-slate-400"}`}
        >
          <h1 className="text-slate-800 font-medium">{status}</h1>
        </div>
      </div>
    </div>
  );
};

export default UrgentCard;
