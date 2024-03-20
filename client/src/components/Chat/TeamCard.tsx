interface User {
  email: string;
  connection: boolean;
  index: number;
  IdRoom: string;
  chatRoom: string
}

const TeamCard: React.FC<User> = ({ email, connection, index, IdRoom, chatRoom }) => {
  return (
    <>
      {connection && IdRoom === chatRoom ? (
        <div className="w-full h-[70px] flex items-center">
          <div
            className=" h-[40px] w-[40px] ml-[20px] rounded-[50px] flex items-center justify-center text-[18px] font-normal text-white shadow-md shadow-black/20"
            style={{ background: `var(--gradiante-${index + 1})` }}
          >
            {`${email[0].toUpperCase() + email[1].toUpperCase()}`}
          </div>
          <h1 className="ml-[10px] text-slate-800">{email}</h1>
        </div>
      ) : null}
    </>
  );
};

export default TeamCard;
