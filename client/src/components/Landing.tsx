import { useState } from "react";
import sliderData from "../../public/data/sliderData"
import LandingCard from "./LandingCard";


interface IndexState {
  connection: boolean;
  task: boolean;
  cooperation: boolean;
  tables: boolean;
  productivity: boolean;
}

interface IndexState {
    [key: string]: boolean;
  }

const Landing: React.FC = () => {
  const [index, setIndex] = useState<IndexState>({
    connection: true,
    task: false,
    cooperation: false,
    tables: false,
    productivity: false,
  });

  const handleIndex = (element: keyof IndexState) => {
    const userIndex: IndexState = {
      connection: false,
      task: false,
      cooperation: false,
      tables: false,
      productivity: false,
      [element]: true,
    };

    setIndex(userIndex);
  };


  return (
    <div className="mt-[50px] w-full h-full items-center overflow-x-hidden ">
      <div className="w-full h-[620px]  bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-600 grid grid-cols-2 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[500px]">
            <h1 className="text-white text-[35px] font-bold my-[10px]">
              Welcome to Tasker, where you can effortlessly consolidate your
              projects, team members, and discussions into a unified platform,
              regardless of your team's location.
            </h1>
            <h1 className="text-white text-[25px] font-light my-[20px]">
              Tasker is the intersection of task management and real-time group
              collaboration. Bid farewell to scattered efforts and disjointed
              communication.
            </h1>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="./img/20943997.jpg"
            alt="landing_intro"
            className="w-[550px] rounded-[100px]"
          ></img>
        </div>
      </div>
      <div className="w-full h-[80px] grid grid-cols-5">
        <div
          className={`ease-in duration-200 w-full h-full flex items-center justify-center text-[25px] font-light cursor-pointer
         ${
           index.connection
             ? "bg-blue-500/20 border-b-[5px] border-sky-600"
             : "bg-white border-b-[5px] border-white"
         } `}
          onClick={() => handleIndex("connection")}
        >
          Connection
        </div>
        <div
          className={`ease-in duration-200 w-full h-full flex items-center justify-center text-[25px] font-light cursor-pointer
         ${
           index.task
             ? "bg-blue-500/20 border-b-[5px] border-sky-600"
             : "bg-white border-b-[5px] border-white"
         } `}
          onClick={() => handleIndex("task")}
        >
          Tasks
        </div>
        <div
          className={`ease-in duration-200 w-full h-full flex items-center justify-center text-[25px] font-light cursor-pointer
           ${
             index.cooperation
               ? "bg-blue-500/20 border-b-[5px] border-sky-600"
               : "bg-white border-b-[5px] border-white"
           } `}
          onClick={() => handleIndex("cooperation")}
        >
          Cooperation
        </div>
        <div
          className={`ease-in duration-200 w-full h-full flex items-center justify-center text-[25px] font-light cursor-pointer
           ${
             index.tables
               ? "bg-blue-500/20 border-b-[5px] border-sky-600"
               : "bg-white border-b-[5px] border-white"
           } `}
          onClick={() => handleIndex("tables")}
        >
          Tables
        </div>
        <div
          className={`ease-in duration-200 w-full h-full flex items-center justify-center text-[25px] font-light cursor-pointer
          ${
            index.productivity
              ? "bg-blue-500/20 border-b-[5px] border-sky-600"
              : "bg-white border-b-[5px] border-white"
          } `}
          onClick={() => handleIndex("productivity")}
        >
          Productivity
        </div>
      </div>
      <div className="w-full h-[660px] ">
        {sliderData &&
          sliderData.map(
            (element) =>
              index[element.name] && (
                <LandingCard
                  key={element.name}
                  {...element}
                />
              )
          )}
      </div>
    </div>
  );
};

export default Landing;
