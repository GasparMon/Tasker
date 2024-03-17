import { HiDotsHorizontal } from "react-icons/hi";
import { useModalCard } from "../../assets/store/store";
import { ListCard } from "../../assets/store/store";
import { useEffect, useState } from "react";
import { getCard } from "../../assets/controller/controller";
import { TbAlertSquareFilled } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { LuCheckSquare } from "react-icons/lu";
import { useCheckBox } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface PropsCard {
  id: string;
  title: string;
  list_id: string;
}

interface CardInfo {
  card_checklist: {status:string}[];
  card_comment: {}[];
  card_user: {
    _id: string;
    email: string;
  };
  card_worker: any[];
  checklist: string;
  createdAt: string;
  description: string;
  dueDate: string;
  label: string;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
}

const Card: React.FC<PropsCard> = ({ id, title, list_id }) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    card_checklist: [],
    card_comment: [],
    card_user: {
      _id: "",
      email: "",
    },
    card_worker: [],
    checklist: "",
    createdAt: "",
    description: "",
    dueDate: "",
    label: "",
    status: "",
    title: "",
    type: "",
    updatedAt: "",
  });

  const {status} = useCheckBox((state) => ({
    status: state.status
  }), shallow);

  const [done, setDone] = useState(0);

  const { setModal } = useModalCard();

  const { setList } = ListCard();

  useEffect(() => {
    if (list_id) {
      setList(list_id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCard(id);

      if (data) {
        setCardInfo(data);
      }
    };

    fetchData();
  }, [status]);

  useEffect(() => {
    const count = cardInfo.card_checklist.filter((item) => item.status === "Done").length;

    setDone(count);
  }, [cardInfo]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className=" relative w-[90%] bg-white my-[10px] p-[5px] pl-[10px] pr-[25px] rounded-[10px] shadow-md shadow-black/10">
        {title}
        <HiDotsHorizontal
          className="absolute top-2 right-2 cursor-pointer text-slate-600 hover:text-black"
          onClick={() => setModal(id)}
        />
        <div className="w-[80%] flex mt-[3px] ">
          {cardInfo && cardInfo?.label ? (
            <div className="mt-[5px] justify-center px-[2px] h-full w-[35px] mr-[5px] text-gray-400  flex items-center">
              <TbAlertSquareFilled className="text-[22px]" />
            </div>
          ) : null}
          {cardInfo && cardInfo?.dueDate ? (
            <div className="mt-[5px]  justify-center px-[2px] h-full w-[35px] mr-[5px] text-gray-400 flex items-center">
              <LuCalendarClock className="text-[22px]" />
            </div>
          ) : null}
          {cardInfo && cardInfo?.card_checklist.length ? (
            <div className="mt-[5px]  justify-between px-[2px] h-full w-[54px] text-gray-400  flex items-center">
              <LuCheckSquare className="text-[21px]"/>
              <h1 className="text-[15px]">
              {done}/{cardInfo?.card_checklist.length}
              </h1>
            </div>
          ) : null}
        </div>
      </h1>
    </div>
  );
};

export default Card;
