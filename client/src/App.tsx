import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { useLocalStorage } from "./assets/localStorage";
import { useEffect} from "react";


function App() {
  const location = useLocation();

  const { createBoard } = useModalBoard((state) => ({
    createBoard: state.createBoard,
  }), shallow);

  const { createCard} = useModalCard((state) => ({
    createCard: state.createCard,
  }), shallow);

  const {createUser} = useModalUser((state) => ({
    createUser: state.createUser
  }), shallow)

  const {notification} = useModalNotification((state) => ({
    notification: state.notification
  }), shallow)

  const {deleteList} = useModalList((state) => ({
    ...state,
    deleteList: state.deleteList
  }), shallow)

  const {deleteBoard} = useModalDeleteBoard((state) => ({
    ...state,
    deleteBoard: state.deleteBoard
  }), shallow)

  const {chatRoom} = useModalChat((state) => ({
    ...state,
    chatRoom: state.chatRoom
  }), shallow)


  //reload//

  const navigate = useNavigate();

  const { getLocation, setLocation } = useLocalStorage('location');
 

  useEffect(() => {
    const currentLocation = location.pathname;
    setLocation({ pathname: currentLocation });
   
  }, [location.pathname]);

  useEffect(() => {
    const savedLocation = getLocation();
    if (savedLocation) {
      navigate(savedLocation.pathname)
    }else {
      navigate("/")
    }
  }, []);

  // useEffect(() => {
  
    
  //     const lastLocation = localStorage.getItem("lastLocation");

  //     if (lastLocation) {
       
  //       if (lastLocation === "/login") {
  //         navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
  //       } else if (lastLocation === "/") {
  //         navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
  //       } else{
  //         navigate(lastLocation)
  //       }
  //     } else {
      
  //       navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
  //     }
  //   }

  //   if(userData.email && userData.email.length > 0 && userData.password && userData.password.length > 0 && !userData.isAuthenticated){
  //     setUserData({});
  //   }
  //   // if (data.email && !data.profile) {
  //   //   setUserData({});
  //   //   navigate("/");
  //   // }
  // }, [data]);

  return (
    <div className="relative w-screen h-screen min-w-[1150px] min-h-[600px] flex flex-col items-center overflow-hidden">
      {location.pathname === "/" ? <NavBar /> : <NavHome />}
      {/* {location.pathname === "/home" ? <Sidebar /> : null} */}
      <Routes >
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/board/:id" element={<Board/>}/>
      </Routes>

      {createBoard ? <ModalBoard /> : null}
      {createCard ? <ModalCard/> : null}
      {createUser ? <ModalUser/> : null}
      {notification ? <ModalNotification/> : null}
      {deleteList ? <ModalList/> : null}
      {deleteBoard? <ModalDeleteBoard/> : null}
      {chatRoom? <ModalChat/> : null}
    </div>
  );
}

export default App;
