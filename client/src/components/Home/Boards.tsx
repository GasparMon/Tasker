import { FaFlipboard } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useModalBoard } from "../../assets/store/store";
import { useEffect, useState } from "react";
import { getBoard } from "../../assets/controller/controller";
import { useLocalStorage } from "../../assets/localStorage";
import BoardCard from "./BoardCard";
import { shallow } from "zustand/shallow";
import { useUpdate } from "../../assets/store/store";

const Boards: React.FC = () => {
  const { setModal } = useModalBoard();
  const { createBoard } = useModalBoard(
    (state) => ({ createBoard: state.createBoard }),
    shallow
  );

  const {update} = useUpdate((state) => ({
    ...state,
    update: state.update
  }), shallow)

  console.log(update)
  
  const { getItem } = useLocalStorage("value");
  const [boards, setBoards] = useState<any[]>([]);

  const { id } = getItem();

  useEffect(() => {
    const handleBoards = async () => {
      const response = await getBoard(id);

      if (response) {
        setBoards(response);
      }
    };

    handleBoards();
  }, [createBoard, update]);

  return (
    <div className={`relative w-full h-full flex flex-col pl-[20px]`}>
      <div className="w-full h-[90px] flex flex-row items-center border-b-[2px] border-gray-300 bg-white">
        <FaFlipboard className="text-[50px] mr-[20px] text-teal-700" />
        <h1 className="text-[40px] text-gray-600">My Boards</h1>
      </div>
      <div className=" w-full h-[150px] flex flex-row items-center bg-white ">
        <div
          className="group relative h-[120px] w-[250px] rounded-[10px] bg-gradient-to-r from-indigo-500 via-in-300 to-sky-400 cursor-pointer flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200"
          onClick={() => setModal()}
        >
          <HiPlusCircle className="absolute text-white text-[40px] top-[5px] left-[5px] ease-in duration-200 group-hover:text-[45px]" />
          <h1 className="text-[25px] text-white">Create Board</h1>{" "}
        </div>
      </div>
      <div className="w-full mt-[30px] h-[450px] grid grid-rows-3 grid-cols-5 gap-x-[15px] gap-y-[10px]">
        {boards &&
          boards.map((element) => (
            <BoardCard
              key={element._id}
              id={element._id}
              name={element.name}
              image={element.image}
              userId={id}
              owner={element.owner}
            />
          ))}
      </div>
    </div>
  );
};

export default Boards;
