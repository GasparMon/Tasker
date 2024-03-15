import { shallow } from "zustand/shallow";
import { useModalCard } from "../../assets/store/store";
import { CgClose } from "react-icons/cg";
import { BsCardChecklist } from "react-icons/bs";
import { ChangeEvent, useEffect, useState } from "react";
import { getCard } from "../../assets/controller/controller";
import { MdOutlineSubtitles } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { MdOutlineAutorenew } from "react-icons/md";
import MainSettings from "../settings/MainSettings";
import { useSettingCard } from "../../assets/store/store";

interface CardInfo {
  title: string;
  description: string;
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

const ModalCard: React.FC = () => {
  const [addDescription, setAddDescription] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    title: "",
    description: "",
    label: "",
    dueDate: "",
    type: "",
    status: "",
    checklist:"",
    card_user: {},
    card_worker: [],
    card_comment: [],
    card_checklist: [],
    createdAt: "",
  });
  const { setModal } = useModalCard();
  const { id } = useModalCard(
    (state) => ({
      id: state.id,
    }),
    shallow
  );

  const {setStatus, setType, setLabel, setDate, setChecklist, workers} = useSettingCard((state) => ({
    setStatus: state.status, 
    setType: state.type, 
    setLabel: state.label, 
    setDate: state.date, 
    setChecklist: state.checklist, 
    workers: state.workers
  }), shallow)

  useEffect(() => {

    setCardInfo({
      ...cardInfo,
      label: setLabel,
      dueDate: setDate,
      type: setType,
      status: setStatus,
      card_worker: workers,
      checklist:setChecklist,
    });
  }, [setLabel, setDate, setType, setStatus, setChecklist, workers])

  useEffect(() => {
    const fetchCard = async () => {
      const data = await getCard(id);

      if (data) {
        setCardInfo({
          ...cardInfo,
          title: data.title,
          description: data.description,
          label: data.label,
          dueDate: data.dueDate,
          type: data.type,
          status: data.status,
          checklist: data.checklist,
          card_user: data.card_user,
          card_worker: data.card_worker,
          card_comment: data.card_comment,
          card_checklist: data.card_checklist,
          createdAt: data.createdAt,
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

    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleDescription = () => {
    setAddDescription(!addDescription);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardInfo({
      ...cardInfo,
      description: event.target.value,
    });
  };

  return (
    <div className="absolute w-full h-full bg-black/70 flex items-center justify-center ease-in duration-200 z-50">
      <div className="relative w-[910px] h-[750px] bg-gray-100 rounded-[10px] flex flex-col">
        <div
          className="absolute top-[10px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center"
          onClick={() => setModal(id)}
        >
          <CgClose className="text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className="relative w-[500px] h-[50px] flex items-center justify-center">
          <BsCardChecklist className="text-[25px] text-gray-700 mr-[20px]" />
          <h1 className="text-[25px] text-gray-700">Card Settings</h1>
        </div>
        <div className="w-full h-[50px] flex items-center pl-[40px]">
          <MdOutlineSubtitles className="text-slate-800 text-[30px] mr-[20px] " />
          <input
            className="text-[20px] w-[500px] bg-gray-100 h-[40px] border-[2px] border-transparent rounded-[10px] font-semibold pl-[10px] focus:border-blue-700 focus:bg-white"
            value={cardInfo.title}
            onChange={(event) => handleChangeInput("title", event)}
          ></input>
        </div>
        <div className="w-[500px] h-[50px] bg-red-200 ml-[100px] grid grid-cols-4 gap-[10px]">
          {cardInfo.status ? (
            <div className="w-full h-full">
              <div className="w-[90%] h-[20px]">
                <h1 className="text-[15px] font-medium">Status</h1>
                <div className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${cardInfo.status === "ToDo" && 'bg-emerald-500'}
                ${cardInfo.status === "InProgress" && 'bg-yellow-300'}
                ${cardInfo.status === "Waiting" && 'bg-orange-400'}
                ${cardInfo.status === "Finished" && 'bg-sky-500 '}
                ${cardInfo.status === "Archived" && 'bg-slate-400'}`}>
                  <h1 className="text-slate-800 font-medium">{cardInfo.status}</h1>
                </div>
              </div>
            </div>
          ) : null}
          {cardInfo.type ? (
            <div className="w-full h-full">
              <div className="w-[90%] h-[20px]">
                <h1 className="text-[15px] font-medium">Type</h1>
                <div className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${cardInfo.type === "Task" && 'bg-purple-400'}
                ${cardInfo.type === "Idea" && 'bg-blue-400'}
                ${cardInfo.type === "Bug" && 'bg-red-400'}
                ${cardInfo.type === "Story" && 'bg-green-400 '}
               `}>
                  <h1 className="text-slate-800 font-medium">{cardInfo.type}</h1>
                </div>
              </div>
            </div>
          ) : null}
          {cardInfo.label ? (
            <div className="w-full h-full">
              <div className="w-[90%] h-[20px]">
                <h1 className="text-[15px] font-medium">Label</h1>
                <div className={`w-full h-[30px] rounded-[5px] flex items-center justify-center shadow-sm shadow-black/20 
                ${cardInfo.label === "Urgent" && 'bg-amber-500'}
                ${cardInfo.label === "Priority" && 'bg-orange-600'}
                ${cardInfo.label === "Critical" && 'bg-red-600'}
               `}>
                  <h1 className="text-slate-800 font-medium">{cardInfo.label}</h1>
                </div>
              </div>
            </div>
          ) : null}
          <div className="w-full h-full bg-yellow-300"></div>
        </div>
        <div className="w-full">
          <div className="w-full h-[50px] pl-[40px] flex items-center">
            <MdOutlineDescription className="text-slate-800 text-[30px] mr-[20px] " />
            <h1 className="ml-[10px] text-[18px] text-slate-800 font-semibold">
              Description
            </h1>
          </div>
          {!addDescription && !cardInfo.description && (
            <div
              className="w-[220px] h-[30px] ml-[80px] rounded-[5px] flex items-center justify-evenly cursor-pointer hover:bg-gray-300 hover:text-slate-800 text-gray-600 text-[17px]"
              onClick={() => handleDescription()}
            >
              <LuPlusCircle />
              <h1>Create a Description</h1>
            </div>
          )}
          {addDescription && (
            <div className=" w-full flex flex-col">
              <textarea
                className=" ml-[90px] h-[100px]  w-[550px] p-[10px] rounded-[7px] border-[2px] border-slate-400 focus:border-blue-700"
                style={{ resize: "none" }}
                placeholder="Card description max 100 chars"
                value={cardInfo.description}
                onChange={(event) => handleChangeText(event)}
              ></textarea>
              <button
                className="bg-blue-600 h-[30px] w-[70px] rounded-[3px] text-white ml-[110px] mt-[10px]"
                onClick={() => handleDescription()}
              >
                Save
              </button>
            </div>
          )}
          {!addDescription && cardInfo.description && (
            <div className=" ml-[100px] w-[500px]">
              <h1>{cardInfo.description}</h1>
              <div
                className="w-[220px] h-[30px] mt-[7px] rounded-[5px] flex items-center justify-evenly cursor-pointer hover:bg-gray-300 hover:text-slate-800 text-gray-600 text-[17px]"
                onClick={() => handleDescription()}
              >
                <MdOutlineAutorenew />
                <h1>Change Description</h1>
              </div>
            </div>
          )}
        </div>
        <div className="absolute w-[220px] h-[570px] border-[2px] border-slate-400 top-[70px] right-[20px] rounded-[10px]">
          <MainSettings />
        </div>
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
