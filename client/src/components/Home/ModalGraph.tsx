import { CgClose } from "react-icons/cg";
import { useModalGraph } from "../../assets/store/store";
import Donut from "../Graphic/Donut";
import Graph from "../Graphic/Graph";
import { useEffect, useState } from "react";
import { GetIdBoard } from "../../assets/controller/controller";
import Loader from "../Loader";

const ModalGraph: React.FC = () => {
  const { setModalGraph, id } = useModalGraph();

  const [tableInfo, setTableInfo] = useState<any[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (id) {
      const fecthBoard = async () => {
        const data = await GetIdBoard(id);

        if (data) {
          setTableInfo(data.table_Lists);
          setIsloading(true);
        }
      };

      fecthBoard();
    }
    
  }, [id]);

  return (
    <div className="absolute w-full max-h-full min-h-full bg-black/70 flex justify-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[1300px] min-h-[87vh] h-full bg-white rounded-[10px] flex flex-col mt-[40px] mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50"
          onClick={() => setModalGraph("id")}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className="relative w-full h-[70px] flex items-center justify-center">
          <h1 className="text-[30px] text-gray-700">Statistics</h1>
        </div>
        <div className="w-[97%] h-full flex flex-row gap-[15px] justify-center">
          {!isLoading ? (
            <div className="h-full w-full flex items-center justify-center mt-[250px]">
            <Loader />
            </div>
          ) : (
            <>
              <div className="w-[60%] h-full">
                <Donut tableInfo={tableInfo} />
              </div>
              <div className="w-[40%] h-full">
                <Graph tableInfo={tableInfo} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalGraph;
