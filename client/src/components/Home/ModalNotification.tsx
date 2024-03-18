import { CgClose } from "react-icons/cg";
import { useLocalStorage } from "../../assets/localStorage";
import { useModalNotification } from "../../assets/store/store";
import { useEffect, useState } from "react";
import { getNotifications, putNotification } from "../../assets/controller/controller";
import CardNotification from "../settings/CardNotification";

const ModalNotification: React.FC = () => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const { setModalNotification } = useModalNotification();

  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await getNotifications(user.id);

    if (data) {
      setNotifications(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNotification = async ({ notification_id, sender_id, reciever_id, response }: { notification_id: string; sender_id: string; reciever_id: string; response: string }) => {
    const data = await putNotification({ notification_id, sender_id, reciever_id, response });

    if (data) {
        fetchData();
    }
}

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
        <div className="w-full">
          {notifications &&
            notifications.map((element) => (
              <CardNotification
                key={element._id}
                id={element._id}
                status={element.status}
                board={element.board.name}
                sender={element.sender.email}
                senderid={element.sender._id}
                reciever={element.reciever}
                handleNotification = {handleNotification}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;
