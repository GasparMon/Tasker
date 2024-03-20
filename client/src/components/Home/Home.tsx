import Boards from "./Boards";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useLocalStorage } from "../../assets/localStorage";
import { useChatConnection } from "../../assets/store/store";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { addConnection } from "../../assets/controller/controller";

const Home: React.FC = () => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();
  const notify = () =>
    toast(`👋 Welcome ${user.email}!`, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
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

  const { setUserOut } = useChatConnection();

  useEffect(() => {
    if (user.email) {
      notify();
      setUserOut(user.id);
    }
  }, [user.email]);

  useEffect(() => {
    const fetchCleanUser = async () => {
      await addConnection({
        user_id: user.id,
        connection: false,
        table_id: "",
      });
    };

    fetchCleanUser();
  }, []);

  return (
    <div className=" mt-[50px] w-[95%] h-[90%]  items-center overflow-x-hidden ">
      <ToastContainer />
      <Boards />
    </div>
  );
};

export default Home;
