import { useLocalStorage } from "../../assets/localStorage";
import { useModalChat } from "../../assets/store/store";

interface Message {
  author: string;
  message: string;
  time: string;
  userId: string;
  room: string;
}

const Message: React.FC<Message> = ({
  author,
  message,
  time,
  userId,
  room,
}) => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const { IdRoom } = useModalChat();

  return (
    <div>
      {room === IdRoom ? (
        user.id === userId ? (
          <div className=" relative w-full min-h-[100px] mt-[10px] flex flex-col justify-center">
            <div
              className="absolute h-[60px] w-[60px] left-[20px] bottom-[-10px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
              style={{ background: `var(--gradiante-1)` }}
            >
              {author.length > 1
                ? `${author[0].toUpperCase()}${author[1].toUpperCase()}`
                : null}
            </div>
            <div className=" relative min-h-[60px] w-[55%] bg-indigo-500 ml-[100px] rounded-t-[25px] rounded-br-[25px] flex items-center px-[25px] py-[5px] shadow-md shadow-black/20">
              <h1 className="text-white font-light text-[16px]">{message}</h1>
              <div className="absolute bottom-[-22px] left-[20px] w-[150px] h-[20px]">
                <h1 className="text-[12px] text-slate-600">Send: {time}</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className=" relative w-full min-h-[100px] flex flex-col items-end justify-center">
            <div
              className="absolute h-[60px] w-[60px] right-[20px] bottom-[-10px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
              style={{ background: `var(--gradiante-2)` }}
            >
              {author.length > 1
                ? `${author[0].toUpperCase()}${author[1].toUpperCase()}`
                : null}
            </div>
            <div className="relative min-h-[60px] w-[55%] bg-cyan-600 mr-[100px] rounded-t-[25px] rounded-bl-[25px] flex items-center px-[25px] py-[5px] shadow-md shadow-black/20">
              <h1 className="text-white font-light text-[16px]">{message}</h1>
              <div className="absolute bottom-[-22px] right-[px] w-[180px] h-[20px]">
                <h1 className="text-[12px] text-slate-600">Recieved: {time}</h1>
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Message;
