import React, { useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";

interface BoardCardProps {
  id: string;
  name: string;
  image: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, name, image }) => {
  const [cardHover, setCardHover] = useState(false);

  const handleHoverIn = () => {
    setCardHover(true);
  };

  const handleHoverOff = () => {
    setCardHover(false);
  };

  return (
    <div
      className="relative w-full h-full rounded-[10px] bg-blue-700 cursor-pointer shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200 overflow-hidden"
      onMouseEnter={() => handleHoverIn()}
      onMouseLeave={() => handleHoverOff()}
    >
      <div className="absolute w-full h-full z-10 ">
        <h1 className="text-white text-[20px] mt-[10px] ml-[20px] font-light ">
          {name}
        </h1>
      </div>
      {cardHover ? (
        <div className="absolute w-full h-full bg-black/20 z-20 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100">
          <BsArrowUpRightSquare className="absolute text-white text-[30px] bottom-3 right-3" />
        </div>
      ) : null}
    </div>
  );
};

export default BoardCard;
