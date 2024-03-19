import React, { useEffect, useState } from "react";
import { GrTasks } from "react-icons/gr";
import { useLocalStorage } from "../../assets/localStorage";
import { IoNotifications } from "react-icons/io5";
import { getNotifications } from "../../assets/controller/controller";
import { useModalNotification } from "../../assets/store/store";
import { useUpdate } from "../../assets/store/store";
import { shallow } from "zustand/shallow";

const NavHome: React.FC = () => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const {update} = useUpdate((state) => ({
    ...state,
    update: state.update
  }), shallow)

  const {setModalNotification} = useModalNotification();

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotifications(user.id);

      if (data) {
        setNotifications(data);
      }
    };

    fetchData();
  }, [update]);

  const total = notifications.filter(
    (notification) => !notification.view
  ).length;

  return (
    <div className="w-full h-[50px] flex fixed items-center justify-between bg-white backdrop-blur-sm border-b-[1px] border-slate-300 z-50">
      <div className="h-full w-[250px] flex items-center px-[10px] ml-[70px]">
        <GrTasks className="text-[40px] text-teal-700" />
        <h1 className="text-[40px] ml-[20px] font-bold">Tasker</h1>
      </div>

      <div className="h-full w-[120px] mr-[50px] grid grid-cols-2">
        <div className="relative w-full h-full flex items-center justify-center"
        onClick={()=> setModalNotification()}
        >
          <IoNotifications className="text-[40px] text-slate-700 cursor-pointer" />
          {total > 0 ? (
            <div className="absolute h-[22px] w-[22px] bg-red-600 rounded-[20px] top-[3px] right-2 items-center justify-center flex">
              <h1 className="text-white font-semibold text-[14px]">{total}</h1>
            </div>
          ) : null}
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div
            className=" h-[40px] w-[40px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
            style={{ background: `var(--gradiante-1` }}
          >
            {`${user.email[0].toUpperCase() + user.email[1].toUpperCase()}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHome;
