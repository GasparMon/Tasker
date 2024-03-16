import { HiDotsHorizontal } from "react-icons/hi";
import { useModalCard } from "../../assets/store/store";
import { ListCard } from "../../assets/store/store";
import { useEffect } from "react";

interface PropsCard {
  id: string;
  title: string;
  list_id: string;
}

const Card: React.FC<PropsCard> = ({ id, title, list_id }) => {
  const { setModal } = useModalCard();

  const { setList } = ListCard();

  useEffect(() => {
    if (list_id) {
      setList(list_id);
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <h1 className=" relative w-[90%] bg-white my-[10px] p-[5px] pl-[10px] pr-[25px] rounded-[10px] shadow-md shadow-black/10">
        {title}
        <HiDotsHorizontal
          className="absolute top-2 right-2 cursor-pointer text-slate-600 hover:text-black"
          onClick={() => setModal(id)}
        />
      </h1>
    </div>
  );
};

export default Card;
