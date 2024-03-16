import { TbLayoutGridRemove } from "react-icons/tb";
import { MdLabelImportant } from "react-icons/md";
import { useState } from "react";
import CardStatus from "./CardStatus";
import CardSType from "./CardType";
import { TbAlertSquareFilled } from "react-icons/tb";
import CardLabel from "./CardLabel";
import { LuCalendarClock } from "react-icons/lu";
import CardDate from "./CardDate";
import { MdOutlineCheckBox } from "react-icons/md";
import CardChecklist from "./CardChecklist";
import { TbUserShare } from "react-icons/tb";

interface Setting {
  status: boolean;
  type: boolean;
  label: boolean;
  users: boolean;
  checklist: boolean;
  date: boolean;
}

interface MainProps{
  card_id: string
  handleSave: () => void
}

const MainSettings: React.FC <MainProps> = ({card_id, handleSave}) => {
  const [settings, setSettings] = useState<Setting>({
    status: false,
    type: false,
    label: false,
    users: false,
    checklist: false,
    date: false,
  });

  

  const handleSetting = (name: string) => {
    setSettings({
      status: false,
      type: false,
      label: false,
      users: false,
      checklist: false,
      date: false,
      [name]: true,
    });
  };

  const handleClose = (name: string) => {
    setSettings({
      ...settings,
      [name]: ![name],
    });
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[40px] flex items-center pl-[20px]">
        <h1 className="text-slate-800 font-semibold">Add to card</h1>
      </div>
      <div className="relative w-full h-[420px] grid grid-rows-7 gap-[10px] p-[10px]">
        {settings.status ? <CardStatus handleClose={handleClose} /> : null}
        {settings.type ? <CardSType handleClose={handleClose} /> : null}
        {settings.label ? <CardLabel handleClose={handleClose} /> : null}
        {settings.date ? <CardDate handleClose={handleClose} /> : null}
        {settings.checklist ? (
          <CardChecklist handleClose={handleClose} card_id={card_id} />
        ) : null}
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer font-normal"
          onClick={() => handleSetting("status")}
        >
          <TbLayoutGridRemove className="mr-[15px] text-[18px]" />
          <h1>Status</h1>
        </div>
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer"
          onClick={() => handleSetting("type")}
        >
          <MdLabelImportant className="mr-[15px] text-[18px]" />
          <h1>Type</h1>
        </div>
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer"
          onClick={() => handleSetting("label")}
        >
          <TbAlertSquareFilled className="mr-[15px] text-[18px]" />
          <h1>Label</h1>
        </div>
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer"
          onClick={() => handleSetting("date")}
        >
          <LuCalendarClock className="mr-[15px] text-[18px]" />
          <h1>Due Date</h1>
        </div>
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer"
          onClick={() => handleSetting("checklist")}
        >
          <MdOutlineCheckBox className="mr-[15px] text-[18px]" />
          <h1>Checklist</h1>
        </div>
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer"
          onClick={() => handleSetting("users")}
        >
          <TbUserShare className="mr-[15px] text-[18px]" />
          <h1>Members</h1>
        </div>
        <div className="mt-[20px]  bg-blue-600 hover:bg-blue-700  text-white w-full h-full  rounded-[5px] flex flex-row items-center justify-center text-[18px] cursor-pointer"
        onClick={()=> handleSave()}
        >
          <h1>Save Card</h1>
        </div>
      </div>
    </div>
  );
};

export default MainSettings;
