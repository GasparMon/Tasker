import React, { useEffect, useState } from "react";
import { GrTasks } from "react-icons/gr";
import { useLocalStorage } from "../../assets/localStorage";
import { IoNotifications } from "react-icons/io5";
import {
  addConnection,
  getNotifications,
} from "../../assets/controller/controller";
import { useModalNotification } from "../../assets/store/store";
import { useUpdate } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";

const NavHome: React.FC = () => {
  const { getItem, setItem } = useLocalStorage("value");
  const user = getItem();
  const navigate = useNavigate();

  const { update } = useUpdate(
    (state) => ({
      ...state,
      update: state.update,
    }),
    shallow
  );

  const { setModalNotification } = useModalNotification();

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

  const handleNavigate = async () => {
    const data = await addConnection({
      user_id: user.id,
      connection: false,
      table_id: "",
    });
    if (data) {
      console.log(data)
      navigate("/home");
    }
  };

  const handleLogOut = async () => {
    setItem({
      id: "",
      email: "",
    });
    const data = await addConnection({
      user_id: user.id,
      connection: false,
      table_id: "",
    });
    if (data) {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-w-[100px] min-h-[70px] flex absolue items-center justify-between bg-white backdrop-blur-sm border-b-[1px] border-slate-300 z-50">
      <div
        className="h-full w-[250px] flex items-center px-[10px] ml-[70px] cursor-pointer"
        onClick={() => handleNavigate()}
      >
        <GrTasks className="text-[40px] text-teal-700 cursor-pointer" />
        <h1 className="text-[40px] ml-[20px] font-bold cursor-pointer">
          Tasker
        </h1>
      </div>

      <div className="h-full w-[180px] mr-[60px] grid grid-cols-3">
        <div
          className="relative w-full h-full flex items-center justify-center"
          onClick={() => setModalNotification()}
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
        <div className="w-full h-full flex items-center justify-center">
          <RiLogoutBoxRLine
            className="text-[40px] text-slate-700 cursor-pointer hover:text-red-600 ml-[20px]"
            onClick={() => handleLogOut()}
          />
        </div>
      </div>
    </div>
  );
};

export default NavHome;
