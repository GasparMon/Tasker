import { TbLayoutGridRemove } from "react-icons/tb";
import { MdLabelImportant } from "react-icons/md";
import { useState } from "react";
import CardStatus from "./CardStatus";

interface Setting {
  status: boolean;
  type: boolean;
  label: boolean;
  users: boolean;
  checklist: boolean;
  date: boolean;
}

const MainSettings: React.FC = () => {
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
      <div className="relative w-full h-[420px] grid grid-rows-8 gap-[10px] p-[10px]">
        {settings.status ? <CardStatus handleClose={handleClose} /> : null}
        <div
          className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer font-normal"
          onClick={() => handleSetting("status")}
        >
          <TbLayoutGridRemove className="mr-[15px] text-[18px]" />
          <h1>Status</h1>
        </div>
        <div className="text-gray-600 hover:text-slate-900 w-full h-full bg-zinc-200 hover:bg-zinc-300 rounded-[5px] flex flex-row items-center pl-[20px] text-[18px] cursor-pointer">
          <MdLabelImportant className="mr-[15px] text-[18px]" />
          <h1>Type</h1>
        </div>
      </div>
    </div>
  );
};

export default MainSettings;
