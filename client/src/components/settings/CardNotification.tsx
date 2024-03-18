import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Notification {
  id: string;
  status: string;
  board: string;
  sender: string;
  reciever: string;
  senderid: string;
  handleNotification: ({
    notification_id,
    sender_id,
    reciever_id,
    response,
  }: {
    notification_id: string;
    sender_id: string;
    reciever_id: string;
    response: string;
  }) => void;
}

const CardNotification: React.FC<Notification> = ({
  id,
  status,
  board,
  sender,
  reciever,
  senderid,
  handleNotification,
}) => {
  return (
    <div className="relative w-[85%] min-h-[60px] ml-[70px] flex flex-row items-center pl-[20px] pr-[100px] border-[2px] border-gray-100 rounded-[10px] shadow-md shadow-black/20 hover:border-[2px] hover:border-blue-600">
      <div className="h-full w-[100%] flex flex-row items-center">
        <h1>{`🤝 ${sender}, has invited you to join the Board ${board}`}</h1>
      </div>
      {status === "Pending" ? (
        <div className="absolute right-0 flex flex-row items-center justify-evenly h-full w-[100px]">
          <FaCheckCircle
            className="text-[30px] cursor-pointer hover:text-green-600"
            onClick={() =>
              handleNotification({
                notification_id: id,
                sender_id: senderid,
                reciever_id: reciever,
                response: "Accepted",
              })
            }
          />
          <FaTimesCircle
            className="text-[30px] cursor-pointer hover:text-red-600"
            onClick={() =>
              handleNotification({
                notification_id: id,
                sender_id: senderid,
                reciever_id: reciever,
                response: "Rejected",
              })
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default CardNotification;
