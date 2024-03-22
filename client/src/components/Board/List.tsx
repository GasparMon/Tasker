import React, { useEffect, useState } from "react";
import CreateList from "./createList";
import { getListCard } from "../../assets/controller/controller";
import Card from "./Card";
// import { useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { HiDotsHorizontal } from "react-icons/hi";
import { useModalList } from "../../assets/store/store";
import { useModalChat } from "../../assets/store/store";

interface ListProps {
  id: string;
  name: string;
}

const List: React.FC<ListProps> = ({ id, name }) => {
  //actualizacion room//

  const { socket } = useModalChat(
    (state) => ({
      ...state,
      socket: state.socket,
    }),
    shallow
  );

  const [listCard, setListCard] = useState([] as any[]);

  // const { cardStatus } = useSettingCard(
  //   (state) => ({
  //     cardStatus: state.status,
  //   }),
  //   shallow
  // );

  const { setModalList } = useModalList();

  const fetchData = async () => {
    const data = await getListCard(id);

    if (data) {
      setListCard(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      socket.on("change", fetchData);
    }
  }, [socket]);

  return (
    <div className="w-full h-full pt-[10px]">
      <div className=" relative w-[95%] h-[auto] bg-gray-200  rounded-[10px] flex flex-col overflow-hidden">
        <HiDotsHorizontal
          className="absolute top-2 right-2 cursor-pointer text-slate-600 hover:text-black w-[20px] h-[20px] rounded-[20px] hover:bg-gray-300"
          onClick={() => setModalList(id)}
        />
        <div className=" w-full h-[50px] pl-[20px] flex flex-col justify-center text-[18px] font-normal text-slate-900">
          {name}
          <div
            className={`w-[120px] mt-[3px] h-[10px] rounded-[10px]
       ${name === "ToDo" && "bg-emerald-500"}
       ${name === "InProgress" && "bg-yellow-400"}
       ${name === "Waiting" && "bg-orange-400"}
       ${name === "Finished" && "bg-sky-500 "}
       ${name === "Archived" && "bg-slate-400"}
      `}
          ></div>
        </div>
        <div className="overflow-auto max-h-[60vh] ">
          {listCard &&
            listCard.map((element) => (
              <Card
                key={element._id}
                id={element._id}
                title={element.title}
                status={element.status}
                card_worker={element.card_worker}
                card_checklist={element.card_checklist}
                dueDate={element.dueDate}
                label={element.label}
                list_id={id}
              />
            ))}
        </div>
        <CreateList id={id} handleFetch={handleFetch} name={name} />
      </div>
    </div>
  );
};

export default List;
