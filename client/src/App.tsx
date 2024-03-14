import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/navBar";
import NavHome from "./components/Home/NavHome";
import Home from "./components/Home/Home";
import Sidebar from "./components/Home/SideBar";
import ModalBoard from "./components/Home/ModalBoard";
import { useModalBoard } from "./assets/store/store";

function App() {
  const location = useLocation();

  const {createBoard} = useModalBoard(state => ({createBoard: state.createBoard}))

  return (
    <div className="relative w-screen h-screen flex flex-col items-center">
      {location.pathname === "/" ? <NavBar /> : <NavHome />}
      {location.pathname === "/home" ? (<Sidebar/>) : (null)}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>


{createBoard
?<ModalBoard/>
:null}

    </div>
  );
}

export default App;
