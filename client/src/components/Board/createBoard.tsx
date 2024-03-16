import { useEffect, useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { createList } from "../../assets/controller/controller";

interface Board {
  id: string;
  handleFetch: () => void;
}

interface List {
  name: string;
  table_id: string;
}

const CreateBoard: React.FC<Board> = ({ id, handleFetch }) => {
  const [option, setOption] = useState(true);
  const [list, setList] = useState<List>({
    name: "",
    table_id: "",
  });

  useEffect(() => {
    setList({
      ...list,
      table_id: id,
    });
  }, [id]);

  const handleOption = () => {
    setOption(!option);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setList((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const isDiseable = () => {
    if (list.name.length < 3 || list.table_id.length < 3) {
      return true;
    }

    return false;
  };

  const handleList = async () => {
    const data = await createList({
      name: list.name,
      table_id: list.table_id,
    });

    if (data) {
      handleFetch();
      handleOption();
    }
  };

  return (
    <>
      {option ? (
        <div
          className="w-[270px] h-[60px] bg-white/30 hover:bg-white/40 rounded-[10px] cursor-pointer flex items-center justify-center"
          onClick={() => handleOption()}
        >
          <MdPlaylistAdd className="text-white text-[30px]" />
          <h1 className="ml-[10px] text-white text-[20px]">Create new List</h1>
        </div>
      ) : (
        <div className="w-[270px] h-[120px] bg-gray-100  rounded-[10px] flex flex-col justify-center overflow-hidden">
          <div className="w-full h-[70px] flex items-center justify-center">
            <select
              className="w-[80%] h-[40px] rounded-[10px] pl-[15px] border-2"
              onChange={(event) => handleChange(event)}
            >
              <option value="">Select a List Model</option>
              <option value={"ToDo"}>ToDo List</option>
              <option value={"InProgress"}>InProgress List</option>
              <option value={"Waiting"}>Waiting List</option>
              <option value={"Finished"}>Finished List</option>
              <option value={"Archived"}>Archived List</option>
            </select>
          </div>
          <div className="w-full h-[40px] flex items-center pl-[30px]">
            <button
              className="w-[120px] h-[35px] bg-blue-600 hover:bg-blue-700 rounded-[5px] text-white disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={isDiseable()}
              onClick={() => handleList()}
            >
              Create List
            </button>
            <div
              className="ml-[15px] rounded-[5px] group hover:bg-gray-300 w-[35px] h-[35px] flex items-center justify-center "
              onClick={() => handleOption()}
            >
              <CgClose className=" text-[25px] text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBoard;
