import { useEffect, useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { createList } from "../../assets/controller/controller";
import { useModalChat } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

interface Board {
  id: string;
  table_list: any[];
  handleFetch: () => void;
}

interface List {
  name: string;
  table_id: string;
}

const CreateBoard: React.FC<Board> = ({ id, handleFetch, table_list }) => {
  const [option, setOption] = useState(true);
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [listOption, setListOptions] = useState<any[]>([]);
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
    if (
      list.name.length < 3 ||
      list.table_id.length < 3 ||
      listOption.includes(list.name)
    ) {
      return true;
    }

    return false;
  };

  const handleList = async () => {
    setbuttonDisable(true);
    const data = await createList({
      name: list.name,
      table_id: list.table_id,
    });

    if (data) {
      await socket.emit("change", IdRoom);
      handleFetch();
      handleOption();
      setbuttonDisable(false);
    }

    setbuttonDisable(false);
  };

  useEffect(() => {
    if (table_list) {
      const namesArray: string[] = table_list.map((item) => item.name);

      setListOptions(namesArray);
    }
  }, [table_list]);

  //actualizacion room//

  const { socket, IdRoom} = useModalChat((state) => ({
    ...state,
    socket: state.socket,
  }),shallow);

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
              <option value={"ToDo"} disabled={listOption.includes("ToDo")}>
                ToDo List
              </option>
              <option
                value={"InProgress"}
                disabled={listOption.includes("InProgress")}
              >
                InProgress List
              </option>
              <option
                value={"Waiting"}
                disabled={listOption.includes("Waiting")}
              >
                Waiting List
              </option>
              <option
                value={"Finished"}
                disabled={listOption.includes("Finished")}
              >
                Finished List
              </option>
              <option
                value={"Archived"}
                disabled={listOption.includes("Archived")}
              >
                Archived List
              </option>
            </select>
          </div>
          <div className="w-full h-[40px] flex items-center pl-[30px]">
            <button
              className="w-[120px] h-[35px] bg-blue-600 hover:bg-blue-700 rounded-[5px] text-white disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={isDiseable()}
              onClick={() => handleList() || buttonDisable}
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
