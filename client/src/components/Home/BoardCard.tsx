
import React from 'react';
import { BsArrowUpRightSquare } from "react-icons/bs";

interface BoardCardProps {
  id: string;
  name: string;
  image: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, name, image }) => {
  return (
    <div className="w-full h-full rounded-[10px] bg-blue-700 cursor-pointer shadow-lg shadow-black/20 hover:shadow-black/30 ease-in duration-200">
      <h1 className='text-white text-[18px] mt-[10px] ml-[10px] '>{name}</h1>
    </div>
  );
};

export default BoardCard;
