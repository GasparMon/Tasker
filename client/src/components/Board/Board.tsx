import { useEffect, useState } from "react";
import { GetIdBoard } from "../../assets/controller/controller";
import { useParams } from "react-router-dom";
import CreateBoard from "./createBoard";
import List from "./List";
import { useBoardState } from "../../assets/store/store";

interface Board {
  id: string;
  name: string;
  image: string;
  table_List: any[];
  table_Team: any[];
}

const Board: React.FC = () => {
  const { setBoardFunction } = useBoardState();
  const { id } = useParams();
  const [board, setBoard] = useState<Board>({
    id: "",
    name: "",
    image: "",
    table_List: [],
    table_Team: [],
  });

  const fetchBoard = async () => {
    if (id) {
      const data = await GetIdBoard(id);

      if (data) {
        setBoard({
          id: data._id,
          name: data.name,
          image: data.image,
          table_List: data.table_Lists,
          table_Team: data.table_Team,
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      setBoardFunction(id);
      fetchBoard();
    }
  }, [id]);

  const handleFetch = () => {
    fetchBoard();
  };

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: `var(--${board.image})` }}
    >
      <div className="w-full pt-[50px] h-[120px] flex items-center backdrop-filter backdrop-blur-sm bg-black bg-opacity-10">
        <h1 className="text-white text-[25px] font-extralight ml-[80px]">
          {board.name}
        </h1>
      </div>
      <div className="w-full h-[85%] grid grid-cols-5 grid-rows-1  px-[10px]">
        {board.table_List &&
          board.table_List.map((element) => (
            <List key={element._id} id={element._id} name={element.name} />
          ))}
        {board.table_List.length < 5 ? (
          <div className="w-full h-full flex flex-col items-center pt-[10px]">
            <CreateBoard id={board.id} handleFetch={handleFetch} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Board;
