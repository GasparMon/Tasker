import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { putCardChecklist } from "../../assets/controller/controller";

interface PropsStatus {
  handleClose: (name: string) => void;
  card_id: string;
}

interface Checklist {
  checklist: string;
}

const CardChecklist: React.FC<PropsStatus> = ({ handleClose, card_id }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setModal } = useSettingCard();
  const { CardChecklist } = useSettingCard(
    (state) => ({ CardChecklist: state.checklist }),
    shallow
  );

  useEffect(() => {
    setChecklist((prevChecklist) => ({
      ...prevChecklist,
      checklist: CardChecklist,
    }));
  }, [CardChecklist]);

  const [checklist, setChecklist] = useState<Checklist>({
    checklist: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChecklist({ checklist: value });
  };

  const handleChecklist = async () => {
    const inputValue = inputRef.current?.value || "";
    const data = await putCardChecklist({
      checklist: inputValue,
      card_id: card_id,
    });

    if (data) {
      setModal("checklist", inputValue);
      handleClose("checklist");
    }
  };

  const isDisable = () => {
    if (checklist.checklist?.length < 3 || checklist.checklist === undefined) {
      return true;
    }

    return false;
  };

  return (
    <div className="absolute w-[300px] h-[150px] bg-white top-[298px] right-[-92px] border-gray-100 rounded-[10px] border-[1px] shadow-sm shadow-black/10">
      <div className="w-full h-[35px] flex items-center justify-center text-slate-800 text-[19px] font-semibold">
        <h1>Checklist</h1>
        <div
          className="absolute top-[6px] right-[10px] rounded-[5px] group hover:bg-gray-100 w-[25px] h-[25px] flex items-center justify-center"
          onClick={() => handleClose("checklist")}
        >
          <CgClose className="text-[20px] text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-[230px] grid grid-rows-5 gap-[4px] py-[8px] mt-[5px] items-center justify-center">
        <input
          ref={inputRef}
          className="text-[16px] w-[250px] bg-gray-100 h-[40px] border-[2px] border-sky-500 rounded-[10px] font-normal pl-[10px] focus:border-blue-700 focus:bg-white"
          value={checklist.checklist}
          placeholder="Checklist Title"
          onChange={(event) => handleChange(event)}
        ></input>
        <button
          className="w-[80px] h-[35px] bg-blue-600 hover:bg-blue-700 ease-in duration-200 rounded-[5px] text-white text-[17px] disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => handleChecklist()}
          disabled={isDisable()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CardChecklist;
