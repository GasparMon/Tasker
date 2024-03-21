import { CgClose } from "react-icons/cg";
import { useModalChat, useModalList } from "../../assets/store/store";
import { FcDeleteDatabase } from "react-icons/fc";
import { removeList } from "../../assets/controller/controller";
import { useBoardState } from "../../assets/store/store";
import { useUpdate } from "../../assets/store/store";
import { shallow } from "zustand/shallow";



const ModalList: React.FC = () => {
  const { listId, setModalList } = useModalList();
  const {id, setBoardFunction} = useBoardState();
  const {setUpdate} = useUpdate();

  //actualizacion room//

const { socket, IdRoom} = useModalChat((state) => ({
  ...state,
  socket: state.socket,
}),shallow);


  const handleRemove = async () => {

    const data = await removeList({table_id: id, list_id: listId})

    if(data){
      setModalList(listId)
      setBoardFunction(id)
      await socket.emit("change", IdRoom);
      setUpdate();
    }
  }

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
          <FcDeleteDatabase className="text-[250px]" />
        </div>
        <div>
          <h1 className="text-[27px] text-slate-800">
            Do you want to delete the selected list?
          </h1>
        </div>
        <div className="h-[100px] w-full flex items-center justify-center">
          <button className="h-[50px] w-[150px] bg-blue-600 mr-[20px] rounded-[10px]"
          onClick={() => setModalList(listId)}
          >
            <h1 className="text-[20px] font-semibold cursor-pointer text-white">Cancel</h1>
          </button>
          <button className="h-[50px] w-[150px] bg-red-500 ml-[20px] rounded-[10px]"
          onClick={()=> handleRemove()}
          >
            <h1 className="text-[20px] font-semibold cursor-pointer text-white">Delete</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalList;
