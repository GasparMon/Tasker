import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { BiSolidMessageRoundedCheck } from "react-icons/bi";
import { BiSolidMessageRoundedX } from "react-icons/bi";

interface Notification {
  id: string;
  status: string;
  board: string;
  sender: string;
  reciever: string;
  senderid: string;
  type: string;
  response: string;
  created: string;
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
  type,
  response,
  created,
  handleNotification,
}) => {
  return (
    <>
      {type === "Invite" ? (
        <div className="relative w-[85%] mb-[15px] min-h-[80px] ml-[70px] flex flex-col justify-center pl-[20px] pr-[100px] border-[2px] border-blue-500 rounded-[10px] shadow-md shadow-black/20 hover:border-[2px] hover:border-blue-600">
          <div className="h-full w-[100%] flex flex-row items-center">
            <FcCollaboration className="text-[40px] mr-[20px]" />
            <h1>{` ${sender}, has invited you to join the Board ${board}`}</h1>
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
          {status === "Accepted" ? (
            <div className="absolute right-0 flex flex-row items-center justify-evenly h-full w-[100px]">
              <div className="w-[85%] h-[30px] bg-green-600 flex items-center justify-center rounded-[10px] text-white">
                {status}
              </div>
            </div>
          ) : null}
          {status === "Rejected" ? (
            <div className="absolute right-0 flex flex-row items-center justify-evenly h-full w-[100px]">
              <div className="w-[85%] h-[30px] bg-red-600 flex items-center justify-center rounded-[10px] text-white">
                {status}
              </div>
            </div>
          ) : null}
           <h1 className="ml-[60px] text-[12px] text-slate-500">Recieved: {created.substring(0, 10)}</h1>
        </div>
      ) : (
        <div className="relative w-[85%] mb-[15px] min-h-[80px] ml-[70px] flex flex-col justify-center pl-[20px] pr-[100px] border-[2px] border-blue-500 rounded-[10px] shadow-md shadow-black/20 hover:border-[2px] hover:border-blue-600">
          <div className="h-full w-[100%] flex flex-row items-center">
            {response === "Accepted" ? (
              <BiSolidMessageRoundedCheck className="text-[40px] mr-[20px] text-green-500" />
            ) : (
              <BiSolidMessageRoundedX className="text-[40px] mr-[20px] text-red-500" />
            )}

            <h1>{` ${sender}, has ${response} you to join the Board ${board}`}</h1>
          </div>
          <h1 className="ml-[60px] text-[12px] text-slate-500">Recieved: {created.substring(0, 10)}</h1>
        </div>
      )}{" "}
    </>
  );
};

export default CardNotification;
