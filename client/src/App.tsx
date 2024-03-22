import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/navBar";
import NavHome from "./components/Home/NavHome";
import Home from "./components/Home/Home";
import ModalBoard from "./components/Home/ModalBoard";
import { useModalBoard, useModalNotification } from "./assets/store/store";
import Board from "./components/Board/Board";
import { useModalCard } from "./assets/store/store";
import { shallow } from "zustand/shallow";
import ModalCard from "./components/Home/ModalCard";
import { useModalUser } from "./assets/store/store";
import ModalUser from "./components/Home/ModalUser";
import ModalNotification from "./components/Home/ModalNotification";
import { useModalList } from "./assets/store/store";
import ModalList from "./components/Home/ModalList";
import { useModalDeleteBoard } from "./assets/store/store";
import ModalDeleteBoard from "./components/Home/ModalDeleteBoard";
import { useModalChat } from "./assets/store/store";
import ModalChat from "./components/Home/ModalChat";
import Unknow from "./components/404";
import { useEffect } from "react";
import { useLocalStorage } from "./assets/localStorage";
import { useModalGraph } from "./assets/store/store";
import ModalGraph from "./components/Home/ModalGraph";
import Loader from "./components/Loader";
import About from "./components/About";
import { useModalAbout } from "./assets/store/store";

function App() {
  const location = useLocation();

  const { createBoard } = useModalBoard(
    (state) => ({
      createBoard: state.createBoard,
    }),
    shallow
  );

  const { createCard } = useModalCard(
    (state) => ({
      createCard: state.createCard,
    }),
    shallow
  );

  const { createUser } = useModalUser(
    (state) => ({
      createUser: state.createUser,
    }),
    shallow
  );

  const { notification } = useModalNotification(
    (state) => ({
      notification: state.notification,
    }),
    shallow
  );

  const { deleteList } = useModalList(
    (state) => ({
      ...state,
      deleteList: state.deleteList,
    }),
    shallow
  );

  const { deleteBoard } = useModalDeleteBoard(
    (state) => ({
      ...state,
      deleteBoard: state.deleteBoard,
    }),
    shallow
  );

  const {setGraph} = useModalGraph((state) => ({
    ...state,
    setGraph: state.setGraph
  }))

  const { chatRoom } = useModalChat(
    (state) => ({
      ...state,
      chatRoom: state.chatRoom,
    }),
    shallow
  );

  const { about } = useModalAbout(
    (state) => ({
      ...state,
      about: state.about,
    }),
    shallow
  );

  //location

  const { setLocation } = useLocalStorage("location");

  useEffect(() => {
    const currentLocation = window.location.pathname;
    if (
      currentLocation === "/" ||
      currentLocation === "/home" ||
      currentLocation.startsWith("/board/")
    ) {
      setLocation({ pathname: currentLocation });
    }
  }, [setLocation]);

  return (
    <div className="relative w-screen h-screen min-w-[1150px] min-h-[600px] flex flex-col items-center overflow-hidden">
      {location.pathname === "/"? <NavBar /> : <NavHome />}
      {/* {location.pathname === "/home" ? <Sidebar /> : null} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<Unknow />} />
      </Routes>

      {createBoard ? <ModalBoard /> : null}
      {createCard ? <ModalCard /> : null}
      {createUser ? <ModalUser /> : null}
      {notification ? <ModalNotification /> : null}
      {deleteList ? <ModalList /> : null}
      {deleteBoard ? <ModalDeleteBoard /> : null}
      {chatRoom ? <ModalChat /> : null}
      {setGraph ? <ModalGraph/> : null}
      {about ? <About/> : null}
    </div>
  );
}

export default App;
