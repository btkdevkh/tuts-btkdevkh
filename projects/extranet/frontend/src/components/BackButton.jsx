import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#338344] px-7 py-2 rounded-sm font-[500] text-white cursor-pointer"
      onClick={() => {
        navigate(-1);
      }}
    >
      Retour
    </button>
  );
};

export default BackButton;
