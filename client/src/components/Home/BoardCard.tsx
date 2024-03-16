import React, { useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useBoardState } from "../../assets/store/store";

interface BoardCardProps {
  id: string;
  name: string;
  image: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, name, image }) => {
    const navigate = useNavigate();
    const [cardHover, setCardHover] = useState(false);

    const {setBoardFunction} = useBoardState();

  const handleHoverIn = () => {
    setCardHover(true);
  };

  const handleHoverOff = () => {
    setCardHover(false);
  };

  const handleBoard = () => {
    setBoardFunction(id);
    navigate(`/board/${id}`)

  }

  return (
    <div
      className="relative w-full h-full rounded-[10px] cursor-pointer shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200 overflow-hidden"
      onMouseEnter={() => handleHoverIn()}
      onMouseLeave={() => handleHoverOff()}
      style={{ background: `var(--${image})`}}
    >
      <div className="absolute w-full h-full z-10 ">
        <h1 className="text-white text-[22px] mt-[10px] ml-[20px] font-light">
          {name}
        </h1>
      </div>
      {cardHover ? (
        <div className="absolute w-full h-full bg-black/20 z-20 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"
        onClick={()=> handleBoard()}
        >
          <BsArrowUpRightSquare className="absolute text-white text-[30px] bottom-3 right-3" />
        </div>
      ) : null}
    </div>
  );
};

export default BoardCard;
