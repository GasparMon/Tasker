import { CgClose } from "react-icons/cg";
import { useModalAbout } from "../assets/store/store";
import { FaLinkedin } from "react-icons/fa6";
import { VscGithubInverted } from "react-icons/vsc";
import { SiBuymeacoffee } from "react-icons/si";

const About: React.FC = () => {
  const { setModalAbout } = useModalAbout();

  return (
    <div className="absolute w-full max-h-full min-h-full  bg-black/70 flex justify-center items-center ease-in duration-200 z-50 overflow-auto">
      <div className="relative w-[1250px] h-[670px] bg-white rounded-[10px] flex flex-col justify-center items-center  mb-[50px] ">
        <div
          className="absolute top-[20px] right-[20px] rounded-[5px] group hover:bg-gray-100 w-[35px] h-[35px] flex items-center justify-center z-50 "
          onClick={() => setModalAbout()}
        >
          <CgClose className=" text-[30px] text-gray-500 cursor-pointer" />
        </div>
        <div className=" w-full h-[80%] bg-red-200 grid grid-cols-2">
          <div className="relative w-full h-full bg-white">
            <div className="absolute w-[60%] h-[70%] top-[5px] left-[35px]  bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-slate-700/30">
              <div className="absolute w-[90%] h-[90%] bg-white"></div>
            </div>
            <div className="absolute w-[60%] h-[70%] bottom-[5px] right-[45px]  bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-slate-700/30">
              <div className="absolute w-[90%] h-[90%] bg-white"> </div>
            </div>
            <div className="absolute w-[60%] h-[80%] top-[50px] left-[110px] justify-center shadow-lg shadow-slate-700/30 overflow-hidden">
              <img src="img/aboutMe.png" />
            </div>
          </div>
          <div className="relative w-full h-full bg-white flex flex-col items-center">
            <div className="w-full h-[100px] flex items-center justify-center">
              <h1 className="text-[45px] font-semibold bg-gradient-to-r from-sky-700 to-violet-700 text-transparent bg-clip-text">
                Gaspar Moncivaez
              </h1>
            </div>
            <div className="w-[500px] h-[70px] flex items-center justify-center bg-black rounded-[20px] shadow-md shadow-slate-700/30">
              <h1 className="text-[35px] font-normal text-white">
                Full Stack Developer
              </h1>
            </div>
            <div className="w-[210px] h-[50px] items-center justify-center mt-[15px] grid grid-cols-3">
              <a
                className="w-full h-full flex items-center justify-center"
                href="https://www.linkedin.com/in/gaspar-moncivaez-48467b151/"
                target="_blank"
              >
                <FaLinkedin className="text-[40px] text-slate-700 hover:text-[45px] hover:text-sky-700 ease-in duration-200 cursor-pointer" />
              </a>
              <a
                className="w-full h-full flex items-center justify-center"
                href="https://github.com/GasparMon"
                target="_blank"
              >
                <VscGithubInverted className="text-[40px] text-slate-700 hover:text-[45px] hover:text-black ease-in duration-200 cursor-pointer" />
              </a>
              <a
                className="w-full h-full flex items-center justify-center"
                href="https://www.buymeacoffee.com/gasparmonz"
                target="_blank"
              >
                <SiBuymeacoffee className="text-[40px] text-slate-700 hover:text-[45px] hover:text-yellow-600 ease-in duration-200 cursor-pointer " />
              </a>
            </div>
            <div className="w-full h-[250px] mt-[50px] flex flex-col items-center justify-center">
              <div className="w-full h-[70px] bg-white flex flex-col items-center justify-center">
                <h1 className="text-[20px] font-semibold text-slate-800">
                  Technologies Employed
                </h1>
              </div>
              <div className="w-[440px] h-[160px] grid grid-cols-5 grid-rows-2 gap-[5px]">
                <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20 ">
                  <img src="img/Vite.js.png" className="w-[60px] h-[60px] "></img>
                </div>
                <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/TypeScript.png" className="w-[60px] h-[60px]  "></img>
                </div>
                <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/Tailwind CSS.png" className="w-[60px] h-[60px]  "></img>
                </div>
                <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/zustand.png" className="w-w-[60px] h-[60px]  "></img>
                </div>
            <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/Node.js.png" className="w-[60px] h-[60px]  "></img>
                </div>
                <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/Express.png" className="w-[60px] h-[60px]  "></img>
                </div>
                <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/MongoDB.png" className="w-[60px] h-[60px]  "></img>
                </div>
             <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/Mongoose.js.png" className="w-[60px] h-[60px]  "></img>
                </div>
             <div className="w-full h-full flex items-center justify-center border-[1px] border-slate-300 rounded-[10px] shadow-sm shadow-black/20">
                  <img src="img/Socket.io.png" className="w-[60px] h-[60px]  "></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
