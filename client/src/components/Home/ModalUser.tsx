import { CgClose } from "react-icons/cg";
import { useModalUser } from "../../assets/store/store";
import { shallow } from "zustand/shallow";
// import { useLocalStorage } from "../../assets/localStorage";
import { useEffect, useState } from "react";
import {
  addUserTeam,
  getTeamBoard,
  removeUserTeam,
} from "../../assets/controller/controller";
import CardUser from "../settings/CardUser";

const ModalUser: React.FC = () => {
//   const { getItem } = useLocalStorage("value");
//   const user = getItem();

  const [inputValue, setInputValue] = useState("");
  const [userTeam, setUserTeam] = useState<any[]>([]);

  const { setModalUser, id } = useModalUser(
    (state) => ({
      setModalUser: state.setModalUser,
      id: state.id,
    }),
    shallow
  );

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    if (id) {
      const fetchBoard = async () => {
        try {
          const data = await getTeamBoard(id);

          if (data) {
            setUserTeam(data);
          }
        } catch (error) {
          console.error("Error al obtener el tablero:", error);
        }
      };

      fetchBoard();
    }
  }, [id]);

  const handleAddTeam = async () => {
    const data = await addUserTeam({ email: inputValue, table_id: id });

    if (data) {
      setUserTeam(data);
      setInputValue("");
    }
  };

  const handleDelete = async ({
    user_id,
    table_id,
  }: {
    user_id: string;
    table_id: string;
  }) => {
    const data = await removeUserTeam({ user_id, table_id });

    if (data) {
      setUserTeam(data);
    }
  };

  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[650px] min-h-[55vh] h-full bg-white rounded-[10px] flex flex-col items-center mt-[40px] mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50"
          onClick={() => setModalUser(id)}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" relative w-full h-[70px] flex items-center justify-center">
          <h1 className="text-[30px] text-gray-700">Add User Members</h1>
        </div>
        <div className="w-full h-[120px] flex items-center flex-col">
          <input
            placeholder="Search member by Email"
            className="styled-input"
            type="email"
            required
            value={inputValue}
            onChange={(event) => handleName(event)}
          />
          <div className="w-full h-[80px] flex items-center justify-center">
            <button
              className="w-[200px] h-[40px] bg-blue-600 hover:bg-blue-700 ease-in duration-200 rounded-[10px] text-white text-[20px] disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handleAddTeam()}
            >
              Add Member
            </button>
          </div>
        </div>
        <div className=" w-[80%] rounded-[10px] border-[2px] border-blue-600 px-[50px] mb-[20px]">
          <div className="w-full h-[40px] flex items-center">
            <h1 className=" text-[18px] font-semibold mr-[7px] text-slate-800">
              Current Team{" "}
            </h1>
          </div>

          {userTeam &&
            userTeam.map((element, index) => (
              <CardUser
                key={element._id}
                id={element._id}
                email={element.email}
                table_id={id}
                handleDelete={handleDelete}
                index = {index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
