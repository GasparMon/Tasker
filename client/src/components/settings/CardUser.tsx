import { RiUserSettingsLine } from "react-icons/ri";
import { useLocalStorage } from "../../assets/localStorage";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { FaUserSlash } from "react-icons/fa";

interface PropUser {
  id: string;
  email: string;
  table_id: string;
  status: string;
  index: number;
  handleDelete: (props: { user_id: string; table_id: string }) => void;
}

const CardUser: React.FC<PropUser> = ({
  id,
  email,
  table_id,
  handleDelete,
  index,
  status,
}) => {
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const [checkInfo, setCheckInfo] = useState(true);

  const handleinfo = () => {
    setCheckInfo(!checkInfo);
  };

  return (
    <div
      className="relative w-full h-[50px] my-[7px] px-[1px] flex items-center rounded-[10px] group ease-in duration-100 border-[2px] border-transparent hover:border-blue-500"
      onMouseEnter={() => handleinfo()}
      onMouseLeave={() => handleinfo()}
    >
      <div
        className="absolute h-[40px] w-[40px] mr-[10px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
        style={{ background: `var(--gradiante-${index + 1})` }}
      >
        {`${email[0].toUpperCase() + email[1].toUpperCase()}`}
      </div>
      <h1 className="ml-[50px] text-[16px] text-slate-800">{email}</h1>

      <div className="w-full h-[40px] flex items-center">
        {status === "pending" ? (
          <>
            {" "}
            <FaUserSlash className="ml-[10px] text-[20px] text-slate-500" />
            <h1 className="text-[12px] ml-[5px] text-slate-500">{status}</h1>
          </>
        ) : null}
        {user.id === id ? (
          <>
            {" "}
            <RiUserSettingsLine className="ml-[10px] text-[20px] text-slate-500" />
            <h1 className="text-[12px] ml-[5px] text-slate-500">Admin</h1>
          </>
        ) : null}
      </div>

      {checkInfo ? null : (
        <div className="absolute w-[50px] h-full flex items-center justify-center right-[10px]">
          {user.id !== id && (
            <HiTrash
              className="text-[25px] text-slate-800 hover:text-red-500 cursor-pointer"
              onClick={() => handleDelete({ user_id: id, table_id: table_id })}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CardUser;
