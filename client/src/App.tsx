import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/navBar";
import NavHome from "./components/Home/NavHome";
import Home from "./components/Home/Home";
import Sidebar from "./components/Home/SideBar";
import ModalBoard from "./components/Home/ModalBoard";
import { useModalBoard } from "./assets/store/store";
import Board from "./components/Board/Board";
import { useModalCard } from "./assets/store/store";
import { shallow } from "zustand/shallow";
import ModalCard from "./components/Home/ModalCard";

function App() {
  const location = useLocation();

  const { createBoard } = useModalBoard((state) => ({
    createBoard: state.createBoard,
  }), shallow);

  const { createCard} = useModalCard((state) => ({
    createCard: state.createCard,
  }), shallow);


  return (
    <div className="relative w-screen h-screen flex flex-col items-center overflow-hidden">
      {location.pathname === "/" ? <NavBar /> : <NavHome />}
      {location.pathname === "/home" ? <Sidebar /> : null}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/board/:id" element={<Board/>}/>
      </Routes>

      {createBoard ? <ModalBoard /> : null}
      {createCard ? <ModalCard/> : null}
    </div>
  );
}

export default App;
