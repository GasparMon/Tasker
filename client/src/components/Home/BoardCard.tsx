import React, { useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useBoardState} from "../../assets/store/store";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbUserStar } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { useModalDeleteBoard } from "../../assets/store/store";
import { useLocalStorage } from "../../assets/localStorage";
import { addConnection } from "../../assets/controller/controller";




interface BoardCardProps {
  id: string;
  name: string;
  image: string;
  userId: string;
  owner: string;
}

const BoardCard: React.FC<BoardCardProps> = ({
  id,
  name,
  image,
  userId,
  owner,
}) => {
  const navigate = useNavigate();
  const [cardHover, setCardHover] = useState(false);
  const { setBoardFunction } = useBoardState();
  const { setModalBoard } = useModalDeleteBoard();
  const { getItem } = useLocalStorage("value");
  const user = getItem();

  const handleHoverIn = () => {
    setCardHover(true);
  };

  const handleHoverOff = () => {
    setCardHover(false);
  };



  const handleBoard = async () => {
    setBoardFunction(id);
    navigate(`/board/${id}`);

    await addConnection({ user_id: user.id, connection: true, table_id: id });
  };

  return (
    <div
      className="relative w-full h-full rounded-[10px]  shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200 overflow-hidden"
      onMouseEnter={() => handleHoverIn()}
      onMouseLeave={() => handleHoverOff()}
      style={{ background: `var(--${image})` }}
    >
      {owner !== userId ? (
        <PiUsersThreeBold className="absolute left-5 bottom-5 text-white text-[40px]" />
      ) : (
        <TbUserStar className="absolute left-5 bottom-5 text-white text-[40px]" />
      )}
      <div className="absolute w-full h-full z-10 ">
        <h1 className="text-white text-[22px] mt-[10px] ml-[20px] font-light">
          {name}
        </h1>
      </div>
      {cardHover ? (
        <div className="absolute w-full h-full bg-black/20 z-20 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100">
          <BsArrowUpRightSquare
            className="absolute text-white text-[30px] bottom-3 right-3 cursor-pointer ease-in duration-200 hover:text-[35px]"
            onClick={() => handleBoard()}
          />
          {user.id === owner ? (
            <HiDotsHorizontal
              className="absolute top-2 right-2 cursor-pointer text-white hover:text-black w-[20px] h-[20px] rounded-[20px] hover:bg-gray-200/60 z-60 "
              onClick={() => setModalBoard(id)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default BoardCard;
