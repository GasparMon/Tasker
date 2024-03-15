import React, { useEffect, useState } from "react";
import CreateList from "./createList";
import { getListCard } from "../../assets/controller/controller";
import Card from "./Card";

interface ListProps {
  id: string;
  name: string;
}

const List: React.FC<ListProps> = ({ id, name }) => {
  const [listCard, setListCard] = useState([] as any[]);

  const fetchData = async () => {
    const data = await getListCard(id);

    if (data) {
      setListCard(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleFetch = () => {

    fetchData();
  }


  return (
    <div className="w-full h-full pt-[10px]">
      <div className="w-[270px] h-[auto] bg-gray-200  rounded-[10px] flex flex-col overflow-hidden">
        <div className="w-full h-[50px] pl-[20px] flex items-center text-[18px] font-normal text-slate-900">
          {name}
        </div>
        <div className="overflow-auto max-h-[550px]">
        {listCard &&
          listCard.map((element) => (
            <Card key={element._id} id={element._id} title={element.title} />
          ))}
          </div>
        <CreateList id={id} handleFetch={handleFetch} name={name}/>
      </div>
    </div>
  );
};

export default List;
