import { BiSolidDislike } from "react-icons/bi";
import { BASE_API_URL } from "../utils/config";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";

const DisikeButton = ({ id_user, id_acteur, setSubmit }) => {
  const handleClickDislike = async () => {
    setSubmit(true);

    try {
      const response = await fetch(`${BASE_API_URL}?api=dislike`, {
        method: "DELETE",
        credentials: "include", // Httponly
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
        },
        body: JSON.stringify({ id_user, id_acteur }),
      });

      const data = await response.json();

      if (data && data.success) {
        console.log("Dislike button has been clicked");
        setSubmit(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <button onClick={handleClickDislike} className="cursor-pointer">
        <BiSolidDislike />
      </button>
    </>
  );
};

export default DisikeButton;
