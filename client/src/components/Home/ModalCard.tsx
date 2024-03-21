import { shallow } from "zustand/shallow";
import { useModalCard, useModalChat } from "../../assets/store/store";
import { CgClose } from "react-icons/cg";
import { ChangeEvent, useEffect, useState } from "react";
import { getCard, putCard } from "../../assets/controller/controller";
import { MdOutlineSubtitles } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { TbTextPlus } from "react-icons/tb";
import MainSettings from "../settings/MainSettings";
import { useSettingCard } from "../../assets/store/store";
import Checklist from "../settings/Checklist";
import { toast } from "react-toastify";
import { TbUserStar } from "react-icons/tb";
import CardWorkingOn from "../settings/CardWorkinOn";

interface CardInfo {
  label: string;
  dueDate: string;
  type: string;
  status: string;
  checklist: string;
  card_user: any;
  card_worker: any[];
  card_comment: any[];
  card_checklist: any[];
  createdAt: string;
}

interface Header {
  id: string;
  title: string;
  description: string;
}

const ModalCard: React.FC = () => {

      //actualizacion room//

      const { socket, IdRoom} = useModalChat((state) => ({
        ...state,
        socket: state.socket,
      }),shallow);

      

  const [addDescription, setAddDescription] = useState(false);
  const [cardHeader, setHeader] = useState<Header>({
    id: "",
    title: "",
    description: "",
  });
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    label: "",
    dueDate: "",
    type: "",
    status: "",
    checklist: "",
    card_user: {},
    card_worker: [],
    card_comment: [],
    card_checklist: [],
    createdAt: "",
  });
  const { setModal } = useModalCard();
  const { resetModal, postModal } = useSettingCard();
  const { id } = useModalCard(
    (state) => ({
      id: state.id,
    }),
    shallow
  );

  const { setStatus, setType, setLabel, setDate, setChecklist, workers } =
    useSettingCard(
      (state) => ({
        setStatus: state.status,
        setType: state.type,
        setLabel: state.label,
        setDate: state.date,
        setChecklist: state.checklist,
        workers: state.workers,
      }),
      shallow
    );

  useEffect(() => {
    setCardInfo({
      ...cardInfo,
      label: setLabel,
      dueDate: setDate,
      type: setType,
      status: setStatus,
      card_worker: workers,
      checklist: setChecklist,
    });
  }, [setLabel, setDate, setType, setStatus, setChecklist, workers]);

  useEffect(() => {
    const fetchCard = async () => {
      const data = await getCard(id);

      if (data) {
        setHeader({
          id: data._id,
          title: data.title,
          description: data.description,
        });

        setCardInfo({
          ...cardInfo,
          label: data.label,
          dueDate: data.dueDate,
          type: data.type,
          status: data.status,
          checklist: data.checklist,
          card_user: data.card_user,
          // card_worker: data.card_worker,
          card_comment: data.card_comment,
          card_checklist: data.card_checklist,
          createdAt: data.createdAt,
        });

        postModal({
          status: data.status,
          label: data.label,
          type: data.type,
          date: data.dueDate,
          checklist: data.checklist,
          workers: data.card_worker,
        });
      }
    };

    fetchCard();
  }, [id]);

  const handleChangeInput = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setHeader({
      ...cardHeader,
      [name]: value,
    });
  };

  const handleDescription = () => {
    setAddDescription(!addDescription);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeader({
      ...cardHeader,
      description: event.target.value,
    });
  };

  const handleClose = () => {
    const id = "";
    setModal(id);
    resetModal();
  };

  const handleSocket = async () => {

    await socket.emit("change", IdRoom);
  }


  const handleSave = async () => {
    try {
      await Promise.all([
        putCard({
          card_id: cardHeader.id,
          title: cardHeader.title,
          description: cardHeader.description,
          label: cardInfo.label,
          dueDate: cardInfo.dueDate,
          type: cardInfo.type,
          status: cardInfo.status,
          workers: workers,
        }),
        handleSocket()
      ]);
  
      toast.success("Card has been Updated 👍", {
        theme: "dark",
        autoClose: 1500
      });
    } catch (error) {
      toast.error("Error creating your Board");
      console.error("Error:", error);
    }
  };
  


  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center ease-in duration-200 z-50 overflow-auto">
      {/* <ToastContainer autoClose={1000}
      theme="dark"
      /> */}
      <div className="relative w-[920px] min-h-[87vh] h-full bg-white rounded-[10px] flex flex-col mt-[40px] mb-[50px] ">
        <div
          className="absolute top-[10px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-20"
          onClick={() => handleClose()}
        >
          <CgClose className="text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className="relative w-full h-[30px] flex items-center justify-center">
          {/* <MdOutlineDisplaySettings className="text-[25px] text-gray-700 mr-[20px]" />
          <h1 className="text-[25px] text-gray-700">Card Settings</h1> */}
        </div>
        <div className="w-full h-[60px] flex items-center pl-[40px] mb-[10px]">
          <MdOutlineSubtitles className="text-slate-800 text-[30px] mr-[20px] " />
          <input
            className="text-[30px] w-[500px] bg-white h-[50px] border-[2px] border-transparent rounded-[10px] font-semibold pl-[10px] focus:border-blue-700 focus:bg-white"
            value={cardHeader.title}
            onChange={(event) => handleChangeInput("title", event)}
          ></input>
        </div>
        <div className="w-[500px] h-[60px] ml-[100px] grid grid-cols-4 gap-[10px]">
          {cardInfo.status ? (
            <div className="w-full h-full ">
              <div className="w-[90%] h-[20px] ">
                <h1 className="text-[15px] font-medium">Status</h1>
                <div
                  className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${cardInfo.status === "ToDo" && "bg-emerald-500"}
                ${cardInfo.status === "InProgress" && "bg-yellow-300"}
                ${cardInfo.status === "Waiting" && "bg-orange-400"}
                ${cardInfo.status === "Finished" && "bg-sky-500 "}
                ${cardInfo.status === "Archived" && "bg-slate-400"}`}
                >
                  <h1 className="text-slate-800 font-medium">
                    {cardInfo.status}
                  </h1>
                </div>
              </div>
            </div>
          ) : null}
          {cardInfo.type ? (
            <div className="w-full h-full">
              <div className="w-[90%] h-[20px]">
                <h1 className="text-[15px] font-medium">Type</h1>
                <div
                  className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${cardInfo.type === "Task" && "bg-purple-400"}
                ${cardInfo.type === "Idea" && "bg-blue-400"}
                ${cardInfo.type === "Bug" && "bg-red-400"}
                ${cardInfo.type === "Story" && "bg-green-400 "}
               `}
                >
                  <h1 className="text-slate-800 font-medium">
                    {cardInfo.type}
                  </h1>
                </div>
              </div>
            </div>
          ) : null}
          {cardInfo.label ? (
            <div className="w-full h-full">
              <div className="w-[90%] h-[20px]">
                <h1 className="text-[15px] font-medium">Label</h1>
                <div
                  className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${cardInfo.label === "Urgent" && "bg-amber-500"}
                ${cardInfo.label === "Priority" && "bg-orange-600"}
                ${cardInfo.label === "Critical" && "bg-red-600"}
               `}
                >
                  <h1 className="text-slate-800 font-medium">
                    {cardInfo.label}
                  </h1>
                </div>
              </div>
            </div>
          ) : null}
          {cardInfo.dueDate ? (
            <div className="w-full h-full">
              <div className="w-[90%] h-[20px]">
                <h1 className="text-[15px] font-medium">Due Date</h1>
                <div
                  className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 bg-sky-800 text-white
               
               `}
                >
                  <h1 className="text-white font-medium">{cardInfo.dueDate}</h1>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {workers.length > 0 ? (
          <div className="w-full h-[50px] mb-[15px] flex flex-col mt-[10px]">
            <div className="w-full h-[50px] pl-[40px] flex items-center">
              <TbUserStar className="text-slate-800 text-[30px] mr-[20px] " />
              <h1 className="ml-[10px] text-[18px] text-slate-800 font-semibold">
                Working On
              </h1>
            </div>
            <div className="w-[500px] h-[50px] ml-[100px] grid grid-cols-8 gap-[10px">
              {workers &&
                workers.map((element) => (
                  <CardWorkingOn key={element._id} email={element.email} />
                ))}
            </div>
          </div>
        ) : null}

        <div className="w-full mt-[10px] min-h-[120px]">
          <div className="w-full h-[50px] pl-[40px] flex items-center">
            <MdOutlineDescription className="text-slate-800 text-[30px] mr-[20px] " />
            <h1 className="ml-[10px] text-[18px] text-slate-800 font-semibold">
              Description
            </h1>
          </div>
          {!addDescription && !cardHeader.description && (
            <div
              className="w-[220px] h-[30px] ml-[75px] rounded-[5px] flex items-center justify-evenly cursor-pointer hover:bg-gray-300 hover:text-slate-800 text-slate-700 text-[16px] px-[10px] bg-gray-200"
              onClick={() => handleDescription()}
            >
              <LuPlusCircle />
              <h1>Create a Description</h1>
            </div>
          )}
          {addDescription && (
            <div className=" w-full flex flex-col">
              <textarea
                className=" ml-[90px] h-[100px] text-slate-800 w-[550px] p-[10px] rounded-[7px] border-[2px] border-slate-400 focus:border-blue-700"
                style={{ resize: "none" }}
                placeholder="Card description max 100 chars"
                value={cardHeader.description}
                onChange={(event) => handleChangeText(event)}
              ></textarea>
              <button
                className="bg-blue-600 h-[30px] w-[70px] rounded-[3px] text-white ml-[110px] mt-[10px]"
                onClick={() => handleDescription()}
              >
                Close
              </button>
            </div>
          )}
          {!addDescription && cardHeader.description && (
            <div className=" ml-[75px] w-[500px] min-h-[70px]">
              <h1 className="ml-[25px]">{cardHeader.description}</h1>
              <div
                className="w-[220px] h-[30px] mt-[7px] rounded-[5px] flex items-center justify-evenly cursor-pointer hover:bg-gray-300 bg-gray-200 hover:text-slate-800 text-slate-700 text-[16px] px-[10px]"
                onClick={() => handleDescription()}
              >
                <TbTextPlus />
                <h1>Change Description</h1>
              </div>
            </div>
          )}
        </div>
        <div className="absolute w-[220px] h-[550px] border-[2px] border-slate-400 top-[70px] right-[20px] rounded-[10px]">
          <MainSettings
            card_id={cardHeader.id}
            handleSave={handleSave}
            handleCloseModal={handleClose}
          />
        </div>
        {cardInfo.checklist && (
          <div className="mb-[25px]">
            <Checklist title={cardInfo.checklist} card_id={cardHeader.id} />
          </div>
        )}
        {/* <div className="w-full h-[240px] grid grid-rows-2">
          <div className="w-full h-[80px] flex items-center justify-center">
            <button className="w-[300px] h-[50px] bg-blue-600 hover:bg-blue-700 ease-in duration-200 rounded-[10px] text-white text-[20px] disabled:opacity-30 disabled:cursor-not-allowed">
              Create
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ModalCard;
