import { useEffect, useState } from "react";
import { putChecklist } from "../../assets/controller/controller";

interface PropsCheck {
  id: string;
  task: string;
  status: string;
  updateSetting: () => void
}

interface Check {
  status: string;
}

const Checkbox: React.FC<PropsCheck> = ({ id, task, status, updateSetting }) => {
    const [check, setCheck] = useState<Check>({
      status: "",
    });

  
    useEffect(() => {
      setCheck({
        status: status,
      });
    }, [status]);
  
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStatus = event.target.checked ? "Done" : "Not-Done";
      
      
      const data = await putChecklist({
        status: newStatus,
        checklist_id: id
      })

      if(data){
        setCheck({
            status: newStatus,
          }); 
          
          updateSetting();
    
      }
    };
  
    return (
      <div className="w-[500px] h-[40px] ml-[120px] flex flex-row items-center">
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <label className="container">
            <input
              type="checkbox"
              checked={check.status === "Done"}
              onChange={handleChange}
            />
            <div className="checkmark"></div>
          </label>
        </div>
        <h1 className={`text-[17px] text-slate-800 ml-[15px]  
        ${check.status === "Done" && "line-through"}
        `}>{task}</h1>
      </div>
    );
  };
  

export default Checkbox;
