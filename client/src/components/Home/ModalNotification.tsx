import { CgClose } from "react-icons/cg";
import { useLocalStorage } from "../../assets/localStorage";
import { useModalChat, useModalNotification } from "../../assets/store/store";
import { useEffect, useState } from "react";
import {
  addNewUserBoard,
  getNotifications,
  putNotification,
  putUserTeamResponse,
  updateNotifications,
} from "../../assets/controller/controller";
import CardNotification from "../settings/CardNotification";
import { useUpdate } from "../../assets/store/store";
import { TbMessageCircleExclamation } from "react-icons/tb";
import { TbMessage } from "react-icons/tb";
import { shallow } from "zustand/shallow";
import Loader from "../Loader";

const ModalNotification: React.FC = () => {
  const { setUpdate } = useUpdate();
  const [isLoading, setIsloading] = useState(false);

  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const { socket } = useModalChat(
    (state) => ({
      ...state,
      socket: state.socket,
    }),
    shallow
  );

  const { setModalNotification } = useModalNotification();

  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await getNotifications(user.id);

    if (data) {
      setNotifications(data);
      const newdata = await updateNotifications(user.id);

      if (newdata) {
        setUpdate();
        setIsloading(true);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNotification = async ({
    notification_id,
    sender_id,
    reciever_id,
    response,
  }: {
    notification_id: string;
    sender_id: string;
    reciever_id: string;
    response: string;
  }) => {
    const data = await putNotification({
      notification_id,
      sender_id,
      reciever_id,
      response,
    });

    if (data.response === "Accepted") {
      const dataBoard = await addNewUserBoard({
        table_id: data.board,
        user_id: data.sender,
      });

      if (dataBoard) {
        const finaldata = await putUserTeamResponse({
          board_id: data.board,
          user_id: data.sender,
          response: "Accepted",
        });

        if (finaldata) {
          if (Object.keys(socket).length > 0) {
            console.log(socket)
            await socket.emit("alertTwo", sender_id);
          }

          fetchData();
          setUpdate();
        }
      }
    } else {
      const finaldata = await putUserTeamResponse({
        board_id: data.board,
        user_id: data.sender,
        response: "Rejected",
      });

      if (finaldata) {
        fetchData();
        if (Object.keys(socket).length > 0) {
          await socket.emit("alertTwo", sender_id);
        }
      }
    }
  };

  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[850px] min-h-[55vh] h-full bg-white rounded-[10px] flex flex-col items-center mt-[40px] mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50"
          onClick={() => setModalNotification()}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" relative w-full h-[70px] flex items-center justify-center">
          <h1 className="text-[30px] text-gray-700">Notification Center</h1>
        </div>
        {!isLoading ? (
          <div className="h-full w-full flex items-center justify-center mt-[100px]">
            <Loader />
          </div>
        ) : (
          <>
            {notifications && notifications.length > 0 ? (
              <div className="w-full h-[40px] flex items-center">
                <TbMessage className="ml-[100px] text-[25px] text-slate-500" />
                <h1 className="ml-[10px] text-[15px] text-slate-500">
                  {`${notifications.length}`} Messages
                </h1>
              </div>
            ) : null}
            {notifications && notifications.length === 0 ? (
              <div className="w-full h-[400px] flex flex-col items-center justify-center">
                <TbMessageCircleExclamation className="text-[200px] mb-[25px] text-slate-500" />
                <h1 className="text-[30px] text-slate-500">
                  Your inbox is empty.
                </h1>
              </div>
            ) : (
              <div className="w-full">
                {notifications &&
                  notifications.map((element) => (
                    <CardNotification
                      key={element._id}
                      id={element._id}
                      status={element.status}
                      board={element.board?.name}
                      sender={element.sender.email}
                      senderid={element.sender._id}
                      reciever={element.reciever}
                      handleNotification={handleNotification}
                      type={element.type}
                      response={element.response}
                      created={element.createdAt}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalNotification;
