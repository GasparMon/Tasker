import React, { useEffect, useState } from "react";
import CreateList from "./createList";
import { getListCard } from "../../assets/controller/controller";
import Card from "./Card";
import { useSettingCard } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface ListProps {
  id: string;
  name: string;
}

const List: React.FC<ListProps> = ({ id, name }) => {
  const [listCard, setListCard] = useState([] as any[]);

  const {cardStatus} = useSettingCard((state) => ({
    cardStatus: state.status
  }), shallow)

  const fetchData = async () => {
    const data = await getListCard(id);

    if (data) {
      setListCard(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, cardStatus]);

  const handleFetch = () => {

    fetchData();
  }

  return (
    <div className="w-full h-full pt-[10px]">
      <div className="w-[270px] h-[auto] bg-gray-200  rounded-[10px] flex flex-col overflow-hidden">
        <div className=" w-full h-[50px] pl-[20px] flex flex-col justify-center text-[18px] font-normal text-slate-900">
        {name}
        <div className={`w-[120px] mt-[3px] h-[10px] rounded-[10px]
       ${name === "ToDo" && "bg-emerald-500"}
       ${name === "InProgress" && "bg-yellow-400"}
       ${name === "Waiting" && "bg-orange-400"}
       ${name === "Finished" && "bg-sky-500 "}
       ${name === "Archived" && "bg-slate-400"}
      `}>
     
        </div>
        </div>
        <div className="overflow-auto max-h-[550px]">
        {listCard &&
          listCard.map((element) => (
            <Card key={element._id} id={element._id} title={element.title} list_id={id} />
          ))}
          </div>
        <CreateList id={id} handleFetch={handleFetch} name={name}/>
      </div>
    </div>
  );
};

export default List;
