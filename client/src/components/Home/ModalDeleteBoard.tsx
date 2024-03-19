import { CgClose } from "react-icons/cg";
import { useModalList } from "../../assets/store/store";
import { FcDeleteRow } from "react-icons/fc";

const ModalDeleteBoard: React.FC = () => {
  const { listId, setModalList } = useModalList();

  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center items-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[650px] min-h-[55vh] h-full bg-white rounded-[10px] flex flex-col items-center  mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50"
          onClick={() => setModalList(listId)}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" relative w-full h-[300px] flex items-center justify-center">
          <FcDeleteRow className="text-[250px]" />
        </div>
        <div>
          <h1 className="text-[27px] text-slate-800">
            Do you want to delete the selected Board?
          </h1>
        </div>
        <div className="h-[100px] w-full flex items-center justify-center">
          <button className="h-[50px] w-[150px] bg-blue-600 mr-[20px] rounded-[10px]"
          onClick={() => setModalList(listId)}
          >
            <h1 className="text-[20px] font-semibold cursor-pointer text-white">Cancel</h1>
          </button>
          <button className="h-[50px] w-[150px] bg-red-500 ml-[20px] rounded-[10px]"
          
          >
            <h1 className="text-[20px] font-semibold cursor-pointer text-white">Delete</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteBoard;
