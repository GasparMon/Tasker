import React, { useState, ChangeEvent, FormEvent } from "react";
import { GrTasks } from "react-icons/gr";
import { RiSendBackward } from "react-icons/ri";
import { getUser } from "../assets/controller/controller";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(email !== null){

      const data = await getUser(email) 

      if(data._id){
        navigate("/home")
      }
    }
  };

  return (
    <div className="w-full h-[50px] flex fixed items-center justify-between bg-white backdrop-blur-sm">
      <div className="h-full w-[250px] flex items-center px-[10px] ml-[70px] ">
        <GrTasks className="text-[40px] text-teal-700" />
        <h1 className="text-[40px] ml-[20px] font-bold">Tasker</h1>
      </div>
      <form
        className="h-full w-[550px] flex items-center px-[10px] ml-[70px]"
        onSubmit={handleSubmit}
      >
        <input
          value={email || ""}
          placeholder="Enter your Email"
          className="w-[300px] h-[40px] bg-[#ffffff] border-2 rounded-lg text-black px-6 py-3 text-base border-indigo-600  cursor-text"
          onChange={handleChange}
          type="email"
          required
        />
        <button
          className={`bg-indigo-600 text-white flex ml-[10px] rounded-[10px] items-center px-[15px] font-medium justify-between w-[100px] h-[40px] text-[20px]cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95`}
          type="submit"
        >
          <RiSendBackward className="text-[25px]" /> Try it
        </button>
      </form>
    </div>
  );
}

export default NavBar;
