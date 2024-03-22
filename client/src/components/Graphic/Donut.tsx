import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { PiChartDonutDuotone } from "react-icons/pi";

Chart.register(ArcElement, Tooltip, Legend);

interface Info {
    tableInfo: any[];
  }
  

  const Donut: React.FC<Info> = ({ tableInfo }) => {

    const [toDo, setToDo] = useState<any[]>([]);
    const [inProgress, setInProgress] = useState<any[]>([]);
    const [waiting, setWaiting] = useState<any[]>([]);
    const [finished, setFinished] = useState<any[]>([]);
    const [archived, setArchived] = useState<any[]>([]);
  
    useEffect(() => {
      if (tableInfo) {
        tableInfo.forEach((element) => {
          if (element.name === "ToDo") {
            setToDo(element.list_Cards);
          }
          if (element.name === "InProgress") {
            setInProgress(element.list_Cards);
          }
          if (element.name === "Waiting") {
            setWaiting(element.list_Cards);
          }
          if (element.name === "Finished") {
            setFinished(element.list_Cards);
          }
          if (element.name === "Archived") {
            setArchived(element.list_Cards);
          }
        });
      }
    }, [tableInfo]);
  
    const data = {
      labels: ["ToDo", "InProgress", "Waiting", "Finished", "Archived"],
      datasets: [
        {
          label: "Tasks",
          data: [toDo.length, inProgress.length, waiting.length, finished.length, archived.length],
          backgroundColor: ["#10b981", "#facc15", "#fb923c", "#0ea5e9", "#94a3b8"],
          borderColor: ["#10b981", "#facc15", "#fb923c", "#0ea5e9", "#94a3b8"],
        },
      ],
    };
  
    const options = {
      // Opciones del gráfico si las necesitas
    };
  return (
    <div className="relative w-full h-full rounded-[10px] flex flex-col p-[20px]">
    {toDo.length === 0 && inProgress.length === 0 && waiting.length === 0 && finished.length === 0 && archived.length === 0 ? (
      <div className="w-full h-[520px] flex flex-col items-center justify-center">
        <PiChartDonutDuotone className="text-[300px] text-slate-500" />
        <h1 className="text-[30px] text-slate-500">You Don't have Task</h1>
      </div>
    ) : (
      <div className="w-full h-[620px] flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    )}
  </div>
  );
};

export default Donut;
