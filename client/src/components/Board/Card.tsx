import { HiDotsHorizontal } from "react-icons/hi";
import { useModalCard, useModalChat } from "../../assets/store/store";
import { ListCard } from "../../assets/store/store";
import { useEffect, useState } from "react";
import { getCard } from "../../assets/controller/controller";
import { TbAlertSquareFilled } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { LuCheckSquare } from "react-icons/lu";
import { useCheckBox } from "../../assets/store/store";
import { TbUserShare } from "react-icons/tb";
import { shallow } from "zustand/shallow";

interface PropsCard {
  id: string;
  title: string;
  list_id: string;
}

interface CardInfo {
  card_checklist: { status: string }[];
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


      //actualizacion room//

      const { socket} = useModalChat((state) => ({
        ...state,
        socket: state.socket,
      }),shallow);



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

  const { status } = useCheckBox(
    (state) => ({
      status: state.status,
    }),
    shallow
  );

  const [done, setDone] = useState(0);

  const { setModal } = useModalCard();

  const { setList } = ListCard();

  useEffect(() => {
    if (list_id) {
      setList(list_id);
    }
  }, []);

  const fetchData = async () => {
    const data = await getCard(id);

    if (data) {
      setCardInfo(data);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, [status]);

  useEffect(() => {
    const count = cardInfo.card_checklist.filter(
      (item) => item.status === "Done"
    ).length;

    setDone(count);
  }, [cardInfo]);

  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      socket.on("change", fetchData);
    }
  }, [socket]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className=" relative w-[90%] bg-white my-[10px] p-[5px] pl-[10px] pr-[25px] rounded-[10px] shadow-md shadow-black/10">
        {title}
        <HiDotsHorizontal
          className="absolute top-2 right-2 cursor-pointer text-slate-600 hover:text-black w-[20px] h-[20px] rounded-[20px] hover:bg-gray-200"
          onClick={() => setModal(id)}
        />
        <div className="w-full grid grid-cols-4 mt-[3px]">
          {cardInfo && cardInfo?.label ? (
            <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <TbAlertSquareFilled className="text-[22px]" />
            </div>
          ) : null}
          {cardInfo && cardInfo?.dueDate ? (
           <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <LuCalendarClock className="text-[22px]" />
            </div>
          ) : null}
          {cardInfo && cardInfo?.card_checklist.length ? (
            <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <LuCheckSquare className="text-[21px] mr-[4px]" />
              <h1 className="text-[15px]">
                {done}/{cardInfo?.card_checklist.length}
              </h1>
            </div>
          ) : null}

          {cardInfo && cardInfo?.card_worker.length ? (
         <div className="h-full w-full justify-center  text-gray-400  flex items-center">
              <TbUserShare className="text-[21px]" />
              <h1 className="text-[15px] ml-[5px]">
                {cardInfo?.card_worker.length}
              </h1>
            </div>
          ) : null}
        </div>
      </h1>
    </div>
  );
};

export default Card;
