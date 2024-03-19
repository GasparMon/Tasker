import { CgClose } from "react-icons/cg";
import { useModalBoard } from "../../assets/store/store";
import { ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocalStorage } from "../../assets/localStorage";
import { createBoard } from "../../assets/controller/controller";
import { ToastContainer, toast } from "react-toastify";

interface Board {
  name: string;
  image: string;
  user_id: string;
}

const ModalBoard: React.FC = () => {
  const { setModal } = useModalBoard();
  const { getItem } = useLocalStorage("value");

  const user = getItem();

  const [board, setBoard] = useState<Board>({
    name: "",
    image: "",
    user_id: user.id,
  });

  const handleBoardName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBoard({
      ...board,
      name: value,
    });
  };

  const handleBoardImage = (value: string) => {
    setBoard({
      ...board,
      image: value,
    });
  };

  const isDiseable = () => {
    if (board.name.length < 3 || board.image.length < 1 || board.name.length > 29) {
      return true;
    }

    return false;
  };

  const handleCreateBoard = async () => {
    toast
      .promise(
        createBoard({
          name: board.name,
          image: board.image,
          user_id: board.user_id,
        }),
        {
          pending: "Creating your Board",
          success: "Board Created 🎉",
          error: "Error creating your Board",
          
        }
      )
      .then(() => {
        setBoard({
            ...board,
            name: "",
            image:""
        })
        setTimeout(() => {
          setModal();
        }, 1700);
      });
  };

  return (
    <div className="absolute w-full h-full bg-black/70 flex items-center justify-center ease-in duration-200 z-50">
      <ToastContainer 
      autoClose={1500}
      />
      <div className="relative w-[600px] h-[700px] bg-white rounded-[10px] flex flex-col items-center">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center"
          onClick={() => setModal()}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" relative w-[500px] h-[70px] flex items-center justify-center">
          <h1 className="text-[30px] text-gray-700">Create Board</h1>
        </div>
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
          <img
            src="img/modal_create.png"
            alt="create_img"
            className="h-full"
          ></img>
        </div>
        <div className="w-full h-[240px] grid grid-rows-2">
          <div className="w-full h-full flex flex-col pl-[120px]">
            <h1 className="text-[19px] text-gray-700 my-[5px]">Board Title</h1>
            <input
              placeholder="Your Board Title"
              className="styled-input"
              type="text"
              value={board.name}
              onChange={handleBoardName}
            />
            <h1 className="text-[14px] text-gray-500 ml-[15px] my-[7px]">
              👋 Your title should range from 3 to 30 characters.
            </h1>
          </div>

          <div className="w-full h-full">
            <h1 className="text-[19px] text-gray-700 my-[5px] ml-[120px]">
              Board Background
            </h1>
            <div className="w-[500px] h-[80px] ml-[60px] grid grid-cols-5 gap-[20px] items-center justify-center">
              <div
                className="w-full h-[70px] flex items-center justify-center rounded-[10px] shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200 cursor-pointer"
                style={{ background: 'var(--modelone)'}}
                onClick={() => handleBoardImage("modelone")}
              >
                {board.image === "modelone" ? (
                  <FaCheck className="text-white text-[30px] ease-in duration-200" />
                ) : null}
              </div>
              <div
                className="w-full h-[70px] flex items-center justify-center rounded-[10px]  shadow-lg shadow-black/20 cursor-pointer hover:shadow-black/30 ease-in duration-200"
                style={{ background: 'var(--modeltwo)'}}
                onClick={() => handleBoardImage("modeltwo")}
              >
                {board.image === "modeltwo" ? (
                  <FaCheck className="text-white text-[30px] ease-in duration-200" />
                ) : null}
              </div>
              <div
                className="w-full h-[70px] flex items-center justify-center rounded-[10px] shadow-lg shadow-black/20 cursor-pointer hover:shadow-black/30 ease-in duration-200"
                style={{ background: 'var(--modelthree)'}}
                onClick={() => handleBoardImage("modelthree")}
              >
                {board.image === "modelthree" ? (
                  <FaCheck className="text-white text-[30px] ease-in duration-200" />
                ) : null}
              </div>
              <div
                className="w-full h-[70px] flex items-center justify-center rounded-[10px] shadow-lg shadow-black/20 cursor-pointer hover:shadow-black/30 ease-in duration-200"
                style={{ background: 'var(--modelfour)'}}
                onClick={() => handleBoardImage("modelfour")}
              >
                {board.image === "modelfour" ? (
                  <FaCheck className="text-white text-[30px] ease-in duration-200" />
                ) : null}
              </div>
              <div
                className="w-full h-[70px] flex items-center justify-center rounded-[10px] shadow-lg shadow-black/20 cursor-pointer hover:shadow-black/30 ease-in duration-200"
                style={{ background: 'var(--modelfive)'}}
                onClick={() => handleBoardImage("modelfive")}
              >
                {board.image === "modelfive" ? (
                  <FaCheck className="text-white text-[30px] ease-in duration-200" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[80px] flex items-center justify-center">
          <button
            className="w-[300px] h-[50px] bg-blue-600 hover:bg-blue-700 ease-in duration-200 rounded-[10px] text-white text-[20px] disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={isDiseable()}
            onClick={() => handleCreateBoard()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBoard;
