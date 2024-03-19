import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useModalUser } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
import { getTeamBoard } from "../../assets/controller/controller";
import Team from "./Team";

interface PropsStatus {
  handleClose: (name: string) => void;
}

const CardUserTeam: React.FC<PropsStatus> = ({ handleClose }) => {
  const [userTeam, setUserTeam] = useState<any[]>([]);
  //   const [newTeam, setnewTeam] = useState<any[]>([]);

  const { id } = useModalUser(
    (state) => ({
      id: state.id,
    }),
    shallow
  );

  useEffect(() => {
    if (id) {
      const fetchBoard = async () => {
        try {
          const data = await getTeamBoard(id);

          if (data) {
            setUserTeam(data.table_Team);
          }
        } catch (error) {
          console.error("Error al obtener el tablero:", error);
        }
      };

      fetchBoard();
    }
  }, [id]);

  return (
    <div className="absolute w-[370px] bg-white bottom-[180px] right-[-160px] border-gray-100 rounded-[10px] border-[1px] shadow-sm shadow-black/10">
      <div className="w-full h-[35px] flex items-center justify-center text-slate-800 text-[19px] font-semibold">
        <h1>Add Users</h1>
        <div
          className="absolute top-[6px] right-[10px] rounded-[5px] group hover:bg-gray-100 w-[25px] h-[25px] flex items-center justify-center"
          onClick={() => handleClose("users")}
        >
          <CgClose className="text-[20px] text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-[5px] m-[10px]">
        {userTeam &&
          userTeam.map((element, index) => (
            <Team
              key={element._id}
              user_id={element._id}
              index={index}
              email={element.email}
              element={element}
            />
          ))}
      </div>
    </div>
  );
};

export default CardUserTeam;
