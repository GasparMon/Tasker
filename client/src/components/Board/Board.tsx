import { useEffect, useState } from "react";
import { GetIdBoard } from "../../assets/controller/controller";
import { useParams } from "react-router-dom";
import CreateBoard from "./createBoard";
import List from "./List";
import { useBoardState, useModalChat } from "../../assets/store/store";
import { RiUserSearchLine } from "react-icons/ri";
import { useModalUser } from "../../assets/store/store";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useUpdate } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { BsChatDotsFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { useLocalStorage } from "../../assets/localStorage";
import { Slide, ToastContainer, toast } from "react-toastify";
const URL = import.meta.env.VITE_URL_HOST;

interface Board {
  id: string;
  name: string;
  image: string;
  table_List: any[];
  table_Team: any[];
}

const Board: React.FC = () => {
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

 

  const { socket, setOpenRoom } = useModalChat((state) => ({
    ...state,
    socket: state.socket
  }), shallow);

  const { chatRoom, setRoom} = useModalChat((state) => ({
    ...state,
    chatRoom: state.chatRoom
  }), shallow);

  const { getItem } = useLocalStorage("value");
  const user = getItem();

  useEffect(() => {
    if (id) {
      const socket = io(URL);
      setRoom({
        socket: socket,
        userId: user.id,
        IdRoom: id,
        email: user.email,
      });

      socket.emit('join_room', id);

      return () => {
        socket.disconnect(); // Asegúrate de desconectar el socket cuando el componente se desmonte
      };
    }
  }, [id, setRoom, user.id, user.email]);

  // useEffect(() => {
  //   if (socket) {
  //     const receivedMessage = (message: any) => {
  //       if (!chatRoom && message.author !== user.email) {
  //         toast(`💬 ${message.author} : ${message.message}`, {
  //           position: "bottom-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           theme: "dark",
  //           progress: undefined,
  //           transition: Slide,
  //         });
  //       }
  //     };
  
  //     socket.on("message", receivedMessage);
  
  //     return () => {
  //       socket.off("message", receivedMessage);
  //     };
  //   }
  // }, [socket, chatRoom, user.email]);


  useEffect(() => {
    const receivedMessage = (message: any) => {
      if (!chatRoom && message.author !== user.email) {
        toast(`💬 ${message.author} : ${message.message}`, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: 'dark',
          transition: Slide,
        });
      }
    };
console.log(socket)
    if (!chatRoom && Object.keys(socket).length > 0) {
      socket.on('message', receivedMessage);

      return () => {
        socket.off('message', receivedMessage);
      };
    }
  }, [chatRoom, user.email]);
  
  // enviar informacion a la sala de Chat

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: `var(--${board.image})` }}
    >
      {chatRoom ? null : (<ToastContainer />) }
      
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
              onClick={() => setOpenRoom()}
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
