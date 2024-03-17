import { useEffect, useState } from "react";
import {
  putChecklist,
  putChecklistInfo,
} from "../../assets/controller/controller";
import { HiTrash } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { useCheckBox } from "../../assets/store/store";

interface PropsCheck {
  id: string;
  task: string;
  status: string;
  card_id: string;
  updateSetting: () => void;
  handleDeleteTask: ({
    card_id,
    check_id,
  }: {
    card_id: string;
    check_id: string;
  }) => void;
}

interface Check {
  status: string;
}

const Checkbox: React.FC<PropsCheck> = ({
  id,
  task,
  status,
  updateSetting,
  card_id,
  handleDeleteTask,
}) => {
  const [check, setCheck] = useState<Check>({
    status: "",
  });

  const [checkInfo, setCheckInfo] = useState(true);
  const [saveInfo, setSaveInfo] = useState(true);
  const [CheckTask, setCheckTask] = useState({
    Checktask: "",
  });

  const {setBox} = useCheckBox();

  useEffect(() => {
    if (task) {
      setCheckTask({
        ...CheckTask,
        Checktask: task,
      });
    }
  }, [task]);

  useEffect(() => {
    setCheck({
      status: status,
    });
  }, [status]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? "Done" : "Not-Done";

    const data = await putChecklist({
      status: newStatus,
      checklist_id: id,
    });

    if (data) {
      setCheck({
        status: newStatus,
      });

      setBox();
      updateSetting();
    }
  };

  const handleinfo = () => {
    setCheckInfo(!checkInfo);
  };

  const handleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCheckTask({
      Checktask: value,
    });
  };

  const handleSaveTask = async () => {
    const data = await putChecklistInfo({
      task: CheckTask.Checktask,
      checklist_id: id,
    });

    if (data) {
      setSaveInfo(true);
    }
  };
  
  useEffect(() => {
    if (task !== CheckTask.Checktask) {
        setSaveInfo(false);
    } else {
        setSaveInfo(true);
    }
}, [CheckTask.Checktask, task]);

  return (
    <div className="w-[560px] h-[40px] ml-[100px] flex flex-row items-center my-[5px]">
      <div className="w-[20px] h-[20px] flex items-center justify-center mr-[5px]">
        <label className="container">
          <input
            type="checkbox"
            checked={check.status === "Done"}
            onChange={handleChange}
          />
          <div className="checkmark"></div>
        </label>
      </div>
      <div
        className="w-[95%] hover:bg-gray-200 ml-[5px] h-[45px] flex items-center rounded-[10px] group ease-in duration-100"
        onMouseEnter={() => handleinfo()}
        onMouseLeave={() => handleinfo()}
      >
        <input
          className={`text-[17px] ml-[5px] w-[450px] h-[35px] border-[2px] border-transparent rounded-[10px] font-normal pl-[10px] focus:border-blue-700 hover:bg-white ease-in duration-100 ${
            check.status === "Done" && "line-through"
          }`}
          value={CheckTask.Checktask}
          onChange={(event) => handleTask(event)}
        />
        {checkInfo ? null : (
          <div className="h-full w-[80px] ml-[5px] grid grid-cols-2">
            <div className="w-full h-full flex items-center justify-center ">
              {!saveInfo ? (
                <FaCheckCircle
                  className="text-[25px] text-slate-800 hover:text-blue-600 cursor-pointer"
                  onClick={() => handleSaveTask()}
                />
              ) : null}
            </div>
            <div className="w-full h-full flex items-center justify-center  ">
              <HiTrash
                className="text-[25px] text-slate-800 hover:text-red-500 cursor-pointer"
                onClick={() =>
                  handleDeleteTask({ card_id: card_id, check_id: id })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
