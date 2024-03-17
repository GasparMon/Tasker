interface WorkinOn {
  email: string;
}

const CardWorkingOn: React.FC<WorkinOn> = ({ email }) => {
  return (
    <div className="h-[50px] w-[50px] rounded-[100px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20 bg-gradient-to-r from-cyan-500 to-blue-500">
      {`${email[0].toUpperCase() + email[1].toUpperCase()}`}
    </div>
  );
};

export default CardWorkingOn;
