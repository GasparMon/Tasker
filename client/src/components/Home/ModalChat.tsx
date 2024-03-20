import { CgClose } from "react-icons/cg";
import { useModalChat } from "../../assets/store/store";
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMessage } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import Message from "../Chat/Message";
import {
  createMessage,
  getMessage,
  getTeamBoard,
} from "../../assets/controller/controller";
import TeamCard from "../Chat/TeamCard";
import { RiUserVoiceLine } from "react-icons/ri";

interface User {
  _id: string;
  email: string;
  connection:boolean;
  chatRoom: string;
}

const ModalChat: React.FC = () => {
  const [currentMessage, setcurrentMessage] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const [storageMessages, setStorageMessages] = useState<any[]>([]);
  const [fistTime, setFirsTime] = useState(false)

  const { socket, userId, IdRoom, email, setOpenRoom, chatRoom } = useModalChat((state) => ({
    ...state,
    socket: state.socket,
    chatRoom: state.chatRoom,
  }),shallow);

  const { message } = useMessage(
    (state) => ({
      ...state,
      message: state.message,
      
    }),
    shallow
  );

  const sendMessage = async () => {
    if (message !== "") {
      const currentTime = `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
      const messageData = {
        room: IdRoom,
        author: email,
        message: currentMessage,
        userId: userId,
        time: currentTime,
      };

      await socket.emit("message", messageData);

      const data = await createMessage({
        body: currentMessage,
        date: currentTime,
        table_id: IdRoom,
        user_id: userId,
      });

      if (data) {
        setList([...list, messageData])
        setcurrentMessage("");
      }
    }
  };

  useEffect(() => {

    const receivedMessage = (message: any) => {

      setList((prevList) => [...prevList, message]);
    };
    

    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage)
    }


  }, [socket])

  useEffect(() =>{

    if(!fistTime){

      const fetchMessages = async () => {
         const data = await getMessage(IdRoom)

         if(data){
          setStorageMessages(data)
          setFirsTime(true);
         }
      }

      fetchMessages();
    }
  }, [])

  const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setcurrentMessage(value);
  };

  useEffect(() => {
    if (IdRoom) {
      const fetchBoard = async () => {
        try {
          const data = await getTeamBoard(IdRoom);

          if (data) {
            setRoomUsers(data.table_Team);
          }
        } catch (error) {
          console.error("Error al obtener el tablero:", error);
        }
      };

      fetchBoard();
    }
  }, [IdRoom]);

  console.log(chatRoom)

  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[85%] min-h-[80vh] h-full bg-white rounded-[10px] flex flex-col mt-[40px] mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50"
          onClick={() => setOpenRoom()}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" relative w-full h-[70px] flex items-center justify-center">
          <h1 className="text-[30px] text-gray-700">Messaging Hub</h1>
        </div>
        <div className=" w-full min-h-[450px] flex flex-row ">
          <div className=" w-[75%] min-h-[66vh] px-[10px] bg-gray-100 pb-[40px] max-h-[66vh] ml-[30px] rounded-[15px]  shadow-lg shadow-black/20 overflow-y-scroll">
            {storageMessages && storageMessages.map((element) => (
               <Message
               key={element._id}
               author={element.comment_user.email}
               message={element.body}
               time={element.date}
               userId={element.comment_user._id}
               room={element.chatRoom._id}
             />
            ))}
            {list &&
              list.map((element, index) => (
                <Message
                  key={index}
                  author={element.author}
                  message={element.message}
                  time={element.time}
                  userId={element.userId}
                  room={element.room}
                />
              ))}
          </div>
          <div className=" w-[25%] min-h-[450px] ml-[20px] mr-[30px] rounded-[15px] border-[2px] bg- border-blue-700 shadow-md shadow-black/10">
            <div className="w-full h-[60px] flex items-center justify-center">
              <RiUserVoiceLine className="text-[30px] text-slate-600 font-semibold mr-[10px]" />
              <h1 className="text-[20px] text-slate-600 font-semibold">
                Online Users
              </h1>
            </div>
            {roomUsers &&
              roomUsers.map((element, index) => (
                <TeamCard
                  key={element._id}
                  email={element.email}
                  connection={element.connection}
                  index={index}
                  IdRoom={IdRoom}
                  chatRoom={element.chatRoom}
                />
              ))}
          </div>
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
