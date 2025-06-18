import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#338344] px-10 py-3 rounded-sm font-[500] text-white cursor-pointer"
      onClick={() => {
        navigate(-1);
      }}
    >
      Retour
    </button>
  );
};

export default BackButton;
