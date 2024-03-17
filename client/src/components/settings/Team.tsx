import { shallow } from "zustand/shallow";
import { useSettingCard } from "../../assets/store/store";
import { useEffect, useState } from "react";

interface Team {
  user_id: string;
  index: number;
  email: string;
  element: any[];
}

const Team: React.FC<Team> = ({ user_id, index, email, element }) => {
  const [usersCard, setUsersCard] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const { workers, setModal } = useSettingCard(
    (state) => ({
      workers: state.workers,
      setModal: state.setModal,
    }),
    shallow
  );

  useEffect(() => {
    const isUserChecked = workers.some((worker) => worker._id === user_id);
    setIsChecked(isUserChecked);
  }, [user_id]);

  useEffect(() => {
    setUsersCard(workers);
  }, [workers]);

  const handleCheckboxChange = () => {
    if (usersCard.length === 0) {
      setUsersCard([element]);
      setModal("workers", [element]);
      setIsChecked(true);
      return;
    }

    if (usersCard.length === 1 && usersCard[0]._id === user_id) {
      setUsersCard([]);
      setModal("workers", []);
      setIsChecked(false);
      return;
    }

    const isUserChecked = usersCard.some((worker) => worker._id === user_id);
    if (isUserChecked) {
      const filteredWorkers = usersCard.filter(
        (worker) => worker._id !== user_id
      );
      setUsersCard(filteredWorkers);
      setModal("workers", filteredWorkers);
      setIsChecked(false);
      return;
    }

    setUsersCard([...usersCard, element]);
    setModal("workers", [...usersCard, element]);
    setIsChecked(true);
  };

  return (
    <div className="w-full h-[40px] flex items-center my-[5px]">
      <div className="w-[40px] h-[40px] flex items-center justify-center">
        <input
          type="checkbox"
          className="w-5 h-5"
          value={user_id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      {email}
      <div
        className="absolute h-[40px] w-[40px] mr-[10px] right-[10px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
        style={{ background: `var(--gradiante-${index + 1})` }}
      >
        {`${email[0].toUpperCase() + email[1].toUpperCase()}`}
      </div>
    </div>
  );
};

export default Team;
