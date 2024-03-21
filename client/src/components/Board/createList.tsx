import { useEffect, useState } from "react";
import { LuListPlus } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { createCard } from "../../assets/controller/controller";
import { useLocalStorage } from "../../assets/localStorage";
import { useModalChat } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface PropsList {
  id: string;
  name: string;
  handleFetch: () => void;
}

interface PropsCard {
  list_id: string;
  title: string;
  user_id: string;
}

const CreateList: React.FC<PropsList> = ({ id, name, handleFetch }) => {
   //actualizacion room//

   const { socket, IdRoom} = useModalChat((state) => ({
    ...state,
    socket: state.socket,
  }),shallow);


  const { getItem } = useLocalStorage("value");
  const user = getItem();
  const [list, setList] = useState(true);
  const [card, setCard] = useState<PropsCard>({
    title: "",
    list_id: "",
    user_id: "",
  });

  useEffect(() => {
    if (id) {
      setCard((prevCard) => ({
        ...prevCard,
        list_id: id,
      }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCard((prevCard) => ({
        ...prevCard,
        user_id: user.id,
      }));
    }
  }, []);

  const handleList = () => {
    setCard({
      ...card,
      title: "",
    });
    setList(!list);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCard({
      ...card,
      title: event.target.value,
    });
  };

  const handleCreate = async () => {
    const data = await createCard({
      title: card.title,
      user_id: card.user_id,
      list_id: card.list_id,
      status: name
    });

    if (data) {
      await socket.emit("change", IdRoom);
      handleFetch();
      handleList();
    }
  };

  const isDiseable = () => {
    if (
      card.title.length < 3 ||
      card.list_id.length < 3 ||
      card.user_id.length < 3
    ) {
      return true;
    }

    return false;
  };

  

  return (
    <>
      {list ? (
        <div className="w-[full] h-[50px] flex flex-row items-center justify-center text-slate-500">
          <div
            className="cursor-pointer w-[80%] h-[75%] hover:bg-gray-300 hover:text-slate-900 flex flex-row items-center justify-center rounded-[10px]"
            onClick={() => handleList()}
          >
            <LuListPlus className="mr-[15px] text-[20px]" />
            <h1 className="text-[18px]">Create new Card</h1>
          </div>
        </div>
      ) : (
        <div className="w-[full] h-[130px] flex flex-col items-center justify-center text-slate-500">
          <div className="w-full h-[80px] flex items-center justify-center">
            <textarea
              className="w-[90%] h-[70px] border-[1px] border-gray-100 rounded-[10px] p-[10px] text-black shadow-md shadow-black/15"
              style={{ resize: "none" }}
              placeholder="Card title max 40 chars"
              value={card.title}
              onChange={(event) => handleChange(event)}
            ></textarea>
          </div>
          <div className="w-full h-[50px] flex items-center pl-[20px]">
            <button
              className="w-[120px] h-[35px] bg-blue-600 hover:bg-blue-700 rounded-[5px] text-white disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={isDiseable()}
              onClick={() => handleCreate()}
            >
              Create Card
            </button>
            <div className="ml-[15px] rounded-[5px] group hover:bg-gray-300 w-[35px] h-[35px] flex items-center justify-center ">
              <CgClose
                className=" text-[25px] text-gray-600 cursor-pointer"
                onClick={() => handleList()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateList;
