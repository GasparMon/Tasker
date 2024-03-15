import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface PropsStatus {
  handleClose: (name: string) => void;
}

interface Label {
  date: string;
}

const CardDate: React.FC<PropsStatus> = ({ handleClose }) => {
  const { setModal } = useSettingCard();
  const { CardDate } = useSettingCard(
    (state) => ({ CardDate: state.date }),
    shallow
  );

  useEffect(() => {
    setDate((prevDate) => ({
      ...prevDate,
      date: CardDate,
    }));
  }, [CardDate]);

  const [date, setDate] = useState<Label>({
    date: "",
  });

  const handleStatus = (name: string) => {
    setModal("date", name);
  };

  const handleChange = (date: string) => {
    setDate({
      date: date,
    });
  };

  return (
    <div className="absolute w-[300px] h-[130px] bg-white top-[205px] right-[-95px] rounded-[10px] border-[1px] shadow-sm shadow-black/10">
      <div className="w-full h-[35px] flex items-center justify-center text-slate-800 text-[19px] font-semibold">
        <h1>Due Date</h1>
        <div
          className="absolute top-[6px] right-[10px] rounded-[5px] group hover:bg-gray-100 w-[25px] h-[25px] flex items-center justify-center"
          onClick={() => handleClose("date")}
        >
          <CgClose className="text-[20px] text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-[230px] grid grid-rows-5 gap-[4px] py-[8px] mt-[5px] items-center justify-center">
        <input className=" w-[190px] h-[50px] text-[18px] border-[2px] border-sky-500 rounded-[15px] px-[10px]" type="date" id="fecha" name="fecha" />
      </div>
    </div>
  );
};

export default CardDate;
