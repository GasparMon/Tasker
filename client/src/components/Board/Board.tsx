import { useEffect, useState } from "react";
import { GetIdBoard } from "../../assets/controller/controller";
import { useParams } from "react-router-dom";
import CreateBoard from "./createBoard";
import List from "./List";
import { useBoardState } from "../../assets/store/store";
import { RiUserSearchLine } from "react-icons/ri";
import { useModalUser } from "../../assets/store/store";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useUpdate } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { BsChatDotsFill } from "react-icons/bs";
import { io } from "socket.io-client";
import { useLocalStorage } from "../../assets/localStorage";
import { useModalChat } from "../../assets/store/store";
import { useMessage } from "../../assets/store/store";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = import.meta.env.VITE_URL_HOST;

const socket = io(URL);
interface Board {
  id: string;
  name: string;
  image: string;
  table_List: any[];
  table_Team: any[];
}

const Board: React.FC = () => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const { setBoardFunction } = useBoardState();
  const { setModalUser } = useModalUser();
  const { id } = useParams();
  const { update } = useUpdate(
    (state) => ({
      ...state,
      update: state.update,
    }),
    shallow
  );
  const [board, setBoard] = useState<Board>({
    id: "",
    name: "",
    image: "",
    table_List: [],
    table_Team: [],
  });

  const fetchBoard = async () => {
    if (id) {
      const data = await GetIdBoard(id);

      if (data) {
        setBoard({
          id: data._id,
          name: data.name,
          image: data.image,
          table_List: data.table_Lists,
          table_Team: data.table_Team,
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      setBoardFunction(id);
      fetchBoard();
      // setModalUser(id)
    }
  }, [id, update]);

  const handleFetch = () => {
    fetchBoard();
  };

  //Chat con Socket IO

  const notify = (message: string) =>
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState("");

  const { setRoom, chatRoom } = useModalChat(
    (state) => ({
      ...state,
      chatRoom: state.chatRoom,
      setRoom: state.setRoom,
    }),
    shallow
  );

  const { setMessage } = useMessage();

  const handleChat = () => {
    if (id) {
      setRoom({
        socket: socket,
        userId: user.id,
        IdRoom: id,
        email: user.email,
      });
    }
  };

 

  useEffect(() => {
    socket.emit("join_room", id);
  }, [isConnected]);

  useEffect(() => {
  
    const messageHandle = (data: any) => {
      setMessage(data);
      setNotification(`${data.author}: ${data.message}`);
    };

    socket.on("receive_message", messageHandle);
  }, [socket]);

  useEffect(() => {

    const handleUsers = (data:any) => {
      setUsers(data)
    }

    socket.emit("recieve_message", handleUsers)
  },[socket])

  useEffect(() => {
    if (!chatRoom && notification.length > 0) {
      notify(notification);
      setNotification("");
    }
  }, [notification]);

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: `var(--${board.image})` }}
    >
      <ToastContainer />
      <div className="w-full p-[5px] h-[70px] flex items-center justify-between backdrop-filter backdrop-blur-sm bg-black bg-opacity-10">
        <div className="w-[600px] h-full flex items-center  ml-[70px]">
          <MdOutlineSpaceDashboard className="text-[50px] text-white mr-[20px]" />
          <h1 className="text-white text-[30px] font-light ">{board.name}</h1>
        </div>
        <div className="w-[270px] h-full mr-[50px] grid grid-cols-3 gap-[10px]">
          <div className="w-full h-full items-center justify-center flex">
            <RiUserSearchLine
              className="text-[35px] text-white cursor-pointer hover:text-[37px]"
              onClick={() => setModalUser(board.id)}
            />
          </div>
          <div className="w-full h-full items-center justify-center flex">
            <BsChatDotsFill
              className="text-[35px] text-white cursor-pointer hover:text-[37px]"
              onClick={() => handleChat()}
            />
          </div>
          <div className="w-full h-full"></div>
        </div>
      </div>
      <div className="w-full h-[85%] grid grid-cols-5 grid-rows-1 px-[10px]">
        {board.table_List &&
          board.table_List.map((element) => (
            <List key={element._id} id={element._id} name={element.name} />
          ))}
        {board.table_List.length < 5 ? (
          <div className="w-full h-full flex flex-col items-center pt-[10px]">
            <CreateBoard
              id={board.id}
              handleFetch={handleFetch}
              table_list={board.table_List}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Board;
