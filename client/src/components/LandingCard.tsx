interface LandingCardProps {
    img: string;
    body: string;
  }
  
  const LandingCard: React.FC<LandingCardProps> = ({ img, body }) => {
    return (
      <div className="w-full h-full grid grid-cols-2 bg-white ease-in duration-200">
        <div className="w-full h-full flex items-center justify-center">
          <div className="shadow-lg shadow-black/20 w-[600px] h-[450px] flex items-center justify-center text-[25px] px-[30px] bg-gradient-to-r from-sky-200 via-in-200 to-indigo-200 rounded-[20px]">
            {body}
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[700px] h-[600px] flex items-center justify-center rounded-[20px]">
            <img src={img} alt={img} />
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingCard;
  