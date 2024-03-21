import { MdOutlineCheckBox } from "react-icons/md";
import { LuCheckSquare } from "react-icons/lu";
import { useEffect, useState } from "react";
import {
  createChecklist,
  getChecklist,
  removeCheck,
} from "../../assets/controller/controller";
import { useLocalStorage } from "../../assets/localStorage";
import { CgClose } from "react-icons/cg";
import { MdOutlineAddTask } from "react-icons/md";
import Checkbox from "./CheckBox";
import { useCheckBox, useModalChat } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
// import { useSettingCard } from "../../assets/store/store";
// import { shallow } from "zustand/shallow";

interface Propschecklist {
  title: string;
  card_id: string;
}

interface Task {
  task: string;
}

const Checklist: React.FC<Propschecklist> = ({ title, card_id }) => {
  const { getItem } = useLocalStorage("value");
  const { id } = getItem();

  //actualizacion room//

  const { socket, IdRoom} = useModalChat((state) => ({
    ...state,
    socket: state.socket,
  }),shallow);


  const [checklist, setChecklist] = useState<any[]>([]);
  const [check, setCheck] = useState(true);
  const [done, setDone] = useState(0);
  const [task, setTask] = useState<Task>({
    task: "",
  });

  const { setBox } = useCheckBox();

  const fetchData = async () => {
    const data = await getChecklist(card_id);

    if (data) {
      setChecklist(data);

      setBox();
    }
  };

  useEffect(() => {
    fetchData();
  }, [card_id]);

  const handleTask = () => {
    setTask({
      ...task,
      task: "",
    });
    setCheck(!check);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({
      ...task,
      task: event.target.value,
    });
  };

  const isDiseable = () => {
    if (task.task.length < 3) {
      return true;
    }

    return false;
  };

  const handleCreate = async () => {
    const data = await createChecklist({
      task: task.task,
      user_id: id,
      card_id: card_id,
    });

    if (data) {
      fetchData();
      handleTask();
      await socket.emit("change", IdRoom);
    }
  };

  const updateSetting = async () => {
    fetchData();
    await socket.emit("change", IdRoom);
  };

  useEffect(() => {
    const count = checklist.filter((item) => item.status === "Done").length;

    setDone(count);
  }, [checklist]);

  const handleDeleteTask = async ({
    card_id,
    check_id,
  }: {
    card_id: string;
    check_id: string;
  }) => {
    const data = await removeCheck({ card_id, check_id });

    if (data) {
      fetchData();
      await socket.emit("change", IdRoom);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-[50px] pl-[40px] flex items-center">
        <MdOutlineCheckBox className="text-slate-800 text-[30px] mr-[20px] " />
        <h1 className="ml-[10px] text-[17px] text-slate-800 font-semibold">
          {title}
        </h1>
      </div>
      {checklist && checklist.length > 0 && (
        <>
          {done === checklist.length ? (
            <div className="w-full h-[30px] pl-[100px] mb-[10px] flex items-center">
              <LuCheckSquare className="text-[15px]  text-green-700 " />
              <h1 className="text-[15px]  text-green-700 ml-[5px]">Progress</h1>
              <h1 className="text-[15px]  text-green-700 ml-[5px]">
                {done}/{checklist.length}
              </h1>
            </div>
          ) : (
            <div className="w-full h-[30px] pl-[100px] mb-[10px] flex items-center">
              <LuCheckSquare className="text-[15px] text-slate-700 " />
              <h1 className="text-[15px] text-slate-700 ml-[5px]">Progress</h1>
              <h1 className="text-[15px] text-slate-700 ml-[5px]">
                {done}/{checklist.length}
              </h1>
            </div>
          )}
        </>
      )}

      {checklist &&
        checklist.length > 0 &&
        checklist.map((element) => (
          <Checkbox
            key={element._id}
            id={element._id}
            status={element.status}
            task={element.task}
            updateSetting={updateSetting}
            card_id={card_id}
            handleDeleteTask={handleDeleteTask}
          />
        ))}

      <>
        {check ? (
          <div
            className="w-[170px] h-[30px] ml-[75px] mt-[10px] rounded-[5px] flex items-center justify-evenly cursor-pointer bg-gray-200 hover:bg-gray-300 hover:text-slate-800 text-slate-700 text-[16px] px-[10px]"
            onClick={() => handleTask()}
          >
            <MdOutlineAddTask />
            <h1>Add an Item</h1>
          </div>
        ) : (
          <div className="w-[full] h-[100px] flex flex-col items-center justify-center text-slate-500">
            <div className="w-full flex">
              <textarea
                className="text-slate-800 ml-[90px] h-[50px]  w-[550px] p-[10px] rounded-[7px] border-[2px] border-slate-400 focus:border-blue-700"
                style={{ resize: "none" }}
                placeholder="Task max 60 chars"
                value={task.task}
                onChange={(event) => handleChange(event)}
              ></textarea>
            </div>
            <div className="w-full h-[40px] flex items-center">
              <button
                className="bg-blue-600 h-[30px] w-[120px] rounded-[3px] text-white ml-[110px] disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={isDiseable()}
                onClick={() => handleCreate()}
              >
                Create Task
              </button>
              <div className="ml-[15px] rounded-[5px] group hover:bg-gray-300 w-[30px] h-[30px] flex items-center justify-center">
                <CgClose
                  className=" text-[20px] text-gray-600 cursor-pointer"
                  onClick={() => handleTask()}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Checklist;
