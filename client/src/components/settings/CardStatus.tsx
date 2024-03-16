import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { useModalCard, useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { useBoardState } from "../../assets/store/store";
import {
  getTableList,
  putCardNewList,
} from "../../assets/controller/controller";

interface PropsStatus {
  handleClose: (name: string) => void;
}

interface Status {
  ToDo: boolean;
  InProgress: boolean;
  Waiting: boolean;
  Finished: boolean;
  Archived: boolean;
}

const CardStatus: React.FC<PropsStatus> = ({ handleClose }) => {
  const { setModal } = useSettingCard();
  const { Cardstatus } = useSettingCard(
    (state) => ({ Cardstatus: state.status }),
    shallow
  );

  const { id: table_id } = useBoardState();

  const { card_id, current_List } = useModalCard(
    (state) => ({
      card_id: state.id,
      current_List: state.list_id,
    }),
    shallow
  );

  useEffect(() => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      ToDo: false,
      InProgress: false,
      Waiting: false,
      Finished: false,
      Archived: false,
      [Cardstatus]: true,
    }));
  }, [Cardstatus]);

  const [status, setStatus] = useState<Status>({
    ToDo: false,
    InProgress: false,
    Waiting: false,
    Finished: false,
    Archived: false,
  });

  const handleStatus = async (name: string) => {
    const id = table_id;

   

    const tabledata = await getTableList(id);

    if (tabledata) {
      const result = tabledata.find((element: any) => element.name === name);

      if (result) {
        const new_List = result._id;

        console.log(new_List)
        console.log(current_List)
        console.log(card_id)

        const data = await putCardNewList({
          card_id,
          current_List,
          new_List,
        });

        console.log(data)
      }
    }

    setModal("status", name);
  };

  return (
    <div className="absolute w-[300px] h-[290px] bg-white top-[60px] right-[-92px] border-[1px] border-gray-100 rounded-[10px]  shadow-sm shadow-black/10">
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
          onClick={() => handleStatus("ToDo")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">ToDo</h1>
          {status.ToDo ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-yellow-300 rounded-[5px] flex items-center cursor-pointer hover:bg-yellow-200 justify-between px-[20px]"
          onClick={() => handleStatus("InProgress")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">InProgress</h1>
          {status.InProgress ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-orange-400 rounded-[5px] flex items-center cursor-pointer hover:bg-orange-300 justify-between px-[20px]"
          onClick={() => handleStatus("Waiting")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Waiting</h1>
          {status.Waiting ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-sky-500 rounded-[5px] flex items-center cursor-pointer hover:bg-sky-400 justify-between px-[20px]"
          onClick={() => handleStatus("Finished")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Finished</h1>
          {status.Finished ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
        <div
          className="ml-[15px] w-[90%] h-full bg-slate-400 rounded-[5px] flex items-center cursor-pointer hover:bg-slate-300 justify-between px-[20px]"
          onClick={() => handleStatus("Archived")}
        >
          <h1 className="ml-[15px] text-slate-800 font-semibold">Archived</h1>
          {status.Archived ? (
            <FaCheck className="text-slate-800 text-[20px] ease-in duration-200" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardStatus;
