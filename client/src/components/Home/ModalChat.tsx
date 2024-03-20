import { CgClose } from "react-icons/cg";
import { useModalChat } from "../../assets/store/store";
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMessage } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import Message from "../Chat/Message";

const ModalChat: React.FC = () => {
  const [currentMessage, setcurrentMessage] = useState("");
  const [list, setList] = useState<any[]>([]);

  const { socket, setRoom, userId, IdRoom, email } = useModalChat();

  const { message } = useMessage(
    (state) => ({
      ...state,
      message: state.message,
    }),
    shallow
  );

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: IdRoom,
        author: email,
        message: currentMessage,
        userId: userId,
        time: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      await socket.emit("send_message", messageData);

      setcurrentMessage("");
    }
  };

  const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setcurrentMessage(value);
  };

  useEffect(() => {
    setList([...list, message]);
  }, [message]);

  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[85%] min-h-[80vh] h-full bg-white rounded-[10px] flex flex-col mt-[40px] mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50"
          onClick={() => setRoom({ socket, userId, IdRoom, email })}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" relative w-full h-[70px] flex items-center justify-center">
          <h1 className="text-[30px] text-gray-700">Messaging Hub</h1>
        </div>
        <div className=" w-full min-h-[450px] flex flex-row">
          <div className=" w-[75%] min-h-[66vh] px-[10px] pb-[40px] max-h-[66vh] ml-[30px] rounded-[15px] border-[2px] border-gray-100 shadow-lg shadow-black/20 overflow-y-scroll">
            {list &&
              list.map((element, index) => (
                <Message
                  key={index}
                  author={element.author}
                  message={element.message}
                  time={element.time}
                  userId={element.userId}
                />
              ))}
          </div>
          <div className=" w-[25%] min-h-[450px] ml-[20px] mr-[30px] rounded-[15px] border-[2px] border-blue-700 shadow-md shadow-black/10"></div>
        </div>
        <div className=" w-[70%] h-[80px] ml-[30px] mt-[10px] flex items-center justify-evenly">
          <input
            placeholder="Enter your Message"
            className="text-[18px] w-[80%] bg-white h-[50px] border-[2px] border-slate-500 rounded-[10px] font-normal pl-[10px] focus:border-blue-700 focus:bg-white"
            type="text"
            onChange={(event) => handleChage(event)}
            value={currentMessage}
          />
          <button
            className="h-[50px] w-[14%] bg-blue-600 ml-[10px] rounded-[10px] flex flex-row items-center justify-evenly hover:bg-blue-700"
            onClick={() => sendMessage()}
          >
            <h1 className="text-white text-[20px] cursor-pointer">Send</h1>
            <IoMdSend className="text-white text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChat;
