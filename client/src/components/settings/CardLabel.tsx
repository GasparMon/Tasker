import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface PropsStatus {
  handleClose: (name: string) => void;
}

interface Label {
  Urgent: boolean;
  Priority: boolean;
  Critical: boolean;
}

const CardLabel: React.FC<PropsStatus> = ({ handleClose }) => {
  const { setModal } = useSettingCard();
  const { CardLabel } = useSettingCard(
    (state) => ({ CardLabel: state.label }),
    shallow
  );

  useEffect(() => {
    setLabel((prevLabel) => ({
      ...prevLabel,
      Urgent: false,
      Priority: false,
      Critical: false,
      [CardLabel]: true,
    }));
  }, [CardLabel]);

  const [label, setLabel] = useState<Label>({
    Urgent: false,
    Priority: false,
    Critical: false,
  });

  const handleStatus = (name: string) => {
    setModal("label", name);
  };

  return (
    <div className="absolute w-[300px] h-[200px] bg-white top-[155px] right-[-95px] rounded-[10px] border-[1px] shadow-sm shadow-black/10">
      <div className="w-full h-[35px] flex items-center justify-center text-slate-800 text-[19px] font-semibold">
        <h1>Label</h1>
        <div
          className="absolute top-[6px] right-[10px] rounded-[5px] group hover:bg-gray-100 w-[25px] h-[25px] flex items-center justify-center"
          onClick={() => handleClose("label")}
        >
          <CgClose className="text-[20px] text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-[230px] grid grid-rows-5 gap-[4px] py-[8px] mt-[5px]">
        <div
          className="ml-[15px] w-[90%] h-full bg-amber-500 rounded-[5px] flex items-center cursor-pointer hover:bg-amber-400 justify-between px-[20px]"
          onClick={() => handleStatus("Urgent")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Urgent</h1>
          {label.Urgent ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-orange-600 rounded-[5px] flex items-center cursor-pointer hover:bg-orange-500  justify-between px-[20px]"
          onClick={() => handleStatus("Priority")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Priority</h1>
          {label.Priority ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-red-600 rounded-[5px] flex items-center cursor-pointer hover:bg-red-500 justify-between px-[20px]"
          onClick={() => handleStatus("Critical")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Critical</h1>
          {label.Critical ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardLabel;
