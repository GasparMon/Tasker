import { useOptionsHome } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import Boards from "./Boards";

const Home: React.FC = () => {

    const { board, bookmark, team, task } = useOptionsHome(state => ({
        board: state.board,
        bookmark: state.bookmark,
        team: state.team,
        task: state.task
    }), shallow);

  return (
    <div className="ml-[300px] mt-[50px] w-[78%] h-[90%]  items-center overflow-x-hidden ">
    {board
    ? <Boards/>
    : null
    }
    </div>
  );
};

export default Home;
