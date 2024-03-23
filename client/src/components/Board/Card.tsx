import { HiDotsHorizontal } from "react-icons/hi";
import { useModalCard } from "../../assets/store/store";
import { ListCard } from "../../assets/store/store";
import { useEffect, useState } from "react";
import { TbAlertSquareFilled } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { LuCheckSquare } from "react-icons/lu";
import { TbUserShare } from "react-icons/tb";

interface PropsCard {
  id: string;
  title: string;
  status: string;
  card_worker: any[];
  card_checklist: any[];
  dueDate: string;
  label: string;
  list_id: string;
}

const Card: React.FC<PropsCard> = ({
  id,
  title,
  list_id,
  card_worker,
  card_checklist,
  dueDate,
  label,
}) => {
  const [done, setDone] = useState(0);

  const { setModal } = useModalCard();

  const { setList } = ListCard();

  useEffect(() => {
    if (list_id) {
      setList(list_id);
    }
  }, []);

  useEffect(() => {

    const count = card_checklist.filter(
      (item) => item.status === "Done"
    ).length;

    setDone(count);
  }, [card_checklist]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className=" relative w-[90%] bg-white my-[10px] p-[5px] pl-[10px] pr-[30px] rounded-[10px] shadow-md shadow-black/10">
        {title}
        <HiDotsHorizontal
          className="absolute top-2 right-2 cursor-pointer text-slate-600 hover:text-black w-[20px] h-[20px] rounded-[20px] hover:bg-gray-200"
          onClick={() => setModal(id)}
        />
        <div className="w-full grid grid-cols-4 mt-[3px]">
          {label && label.length > 0 ? (
            <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <TbAlertSquareFilled className="text-[22px]" />
            </div>
          ) : null}
          {dueDate && dueDate.length > 0 ? (
            <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <LuCalendarClock className="text-[22px]" />
            </div>
          ) : null}
          {card_checklist && card_checklist.length > 0 ? (
            <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <LuCheckSquare className="text-[21px] mr-[4px]" />
              <h1 className="text-[15px]">
                {done}/{card_checklist?.length}
              </h1>
            </div>
          ) : null}

          {card_worker && card_worker.length > 0 ? (
            <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <TbUserShare className="text-[21px]" />
              <h1 className="text-[15px] ml-[5px]">{card_worker?.length}</h1>
            </div>
          ) : null}
        </div>
      </h1>
    </div>
  );
};

export default Card;
