import { useOptionsHome } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import Boards from "./Boards";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useLocalStorage } from "../../assets/localStorage";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();
  const notify = () => toast(`👋 Welcome ${user.email}!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    });

  // const { board, bookmark, team, task } = useOptionsHome(
  //   (state) => ({
  //     board: state.board,
  //     bookmark: state.bookmark,
  //     team: state.team,
  //     task: state.task,
  //   }),
  //   shallow
  // );


  useEffect(() => {
    if (user.email) {
      notify();
    }
  }, []);

  return (
    <div className=" mt-[50px] w-[95%] h-[90%]  items-center overflow-x-hidden ">
      <ToastContainer />
      <Boards />
    </div>
  );
};

export default Home;
