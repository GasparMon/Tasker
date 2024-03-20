import { useLocalStorage } from "../../assets/localStorage";

interface Message {
  author: string;
  message: string;
  time: string;
  userId: string;
}

const Message: React.FC<Message> = ({ author, message, time, userId }) => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  return (
    <div>
      {user.id === userId? (
        <div className=" relative w-full min-h-[100px] flex flex-col justify-center">
          <div className="absolute h-[60px] w-[60px] left-[20px] bottom-[-10px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20" style={{ background: `var(--gradiante-1` }}>
          {/* {author.length > 1 ? `${author[0].toUpperCase()}${author[1].toUpperCase()}` : null} */}
          </div>
          <div className="min-h-[60px] w-[70%] bg-indigo-500 ml-[100px] rounded-t-[25px] rounded-br-[25px] flex items-center px-[25px] py-[5px] shadow-md shadow-black/20">
            <h1 className="text-white font-light text-[16px]">{message}</h1>
          </div>
          <div className="absolute bottom-[-5px] left-[100px] w-[150px] h-[20px">
            <h1 className="text-[12px] text-slate-600">Send: {time}</h1>
          </div>
        </div>
      ) : (
        <div className=" relative w-full min-h-[100px] flex flex-col items-end justify-center">
          <div className="absolute h-[60px] w-[60px] right-[20px] bottom-[-10px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20" style={{ background: `var(--gradiante-2` }}>
          {/* {author.length > 1 ? `${author[0].toUpperCase()}${author[1].toUpperCase()}` : null} */}
          </div>
          <div className="min-h-[60px] w-[70%] bg-cyan-600 mr-[100px] rounded-t-[25px] rounded-bl-[25px] flex items-center px-[25px] py-[5px] shadow-md shadow-black/20">
            <h1 className="text-white font-light text-[16px]">{message}</h1>
          </div>
          <div className="absolute bottom-[-5px] right-[100px] w-[150px] h-[20px">
            <h1 className="text-[12px] text-slate-600">Send: {time}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
