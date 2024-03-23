import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { RiTimerFlashLine } from "react-icons/ri";
import UrgentCard from "./UrgentCard";
import WorkingCard from "./WorkingCard";
import { BsClipboard2Data } from "react-icons/bs";

interface Info {
  tableInfo: any[];
}

interface Card {
  _id: string;
  title: string;
  status: string;
  card_user: string;
  dueDate: string;
  label: string;
  // Agrega cualquier otra propiedad que puedas tener en tus objetos
}

interface ListCard {
  _id: string;
  title: string;
  status: string;
  card_user: string;
  dueDate: string;
  label: string;
}

interface ElementInfo {
  list_Cards: ListCard;
}

const Graph: React.FC<Info> = ({ tableInfo }) => {
  const [urgent, setUrgent] = useState<any[]>([]);
  const [working, setWorking] = useState<any[]>([]);

  useEffect(() => {
    var elementUrgent: any = [];
    var elementWork: any = [];

    if (tableInfo) {
      const filteredInfo = tableInfo.reduce((acc: ElementInfo[], curr) => {
        curr.list_Cards.forEach((card: Card) => {
          acc.push({
            list_Cards: card,
          });
        });
        return acc;
      }, []);

      filteredInfo.forEach((element: ElementInfo) => {
        if (
          element.list_Cards.label === "Urgent" ||
          element.list_Cards.label === "Priority" ||
          element.list_Cards.label === "Critical"
        ) {
          elementUrgent.push(element.list_Cards);
        }

        if (element.list_Cards?.dueDate) {
          elementWork.push(element.list_Cards);
        }

        setUrgent(elementUrgent);
        setWorking(elementWork);
      });
    }
  }, [tableInfo]);

  return (
    <div className="relative w-full h-full   rounded-[10px] flex flex-col items-start ">
      {urgent.length === 0 && working.length === 0 ? (
         <div className="w-full min-h-[250px] mt-[140px] flex  flex-col items-center justify-center">
          <BsClipboard2Data className="text-[250px] text-slate-500"/>
          <h1 className="text-[30px] mt-[20px] text-slate-500">You Don't have Urgent Task</h1>
        </div>
      ) : (
        <>
          {urgent && urgent.length > 0 ? (
            <div className="w-full min-h-[50px] bg-gray-200  border-[1px] border-gray-100 rounded-[10px] mb-[20px] shadow-lg shadow-black/20">
              <div className="w-full h-[45px] flex items-center justify-center">
                <IoWarningOutline className="text-[35px] text-slate-700 mr-[15px]" />
                <h1 className="text-[25px] text-slate-700">Urgent Tasks</h1>
              </div>
              {urgent.map((element) => (
                <UrgentCard
                  key={element._id}
                  title={element.title}
                  status={element.status}
                  label={element.label}
                />
              ))}
            </div>
          ) : null}
          {working && working.length > 0 ? (
            <div className="w-full min-h-[50px] bg-gray-200  border-[1px] border-gray-100 rounded-[10px] shadow-lg shadow-black/20 mb-[20px]" >
              <div className="w-full h-[45px] flex items-center justify-center">
                <RiTimerFlashLine className="text-[35px] text-slate-700 mr-[15px]" />
                <h1 className="text-[25px] text-slate-700">Timed Tasks</h1>
              </div>
              {working.map((element) => (
                <WorkingCard
                  key={element._id}
                  title={element.title}
                  status={element.status}
                  dueDate={element.dueDate}
                />
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Graph;
