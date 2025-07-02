import { BiSolidLike } from "react-icons/bi";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";

const LikeButton = ({ id_user, id_acteur, setSubmit }) => {
  const handleClickLike = async () => {
    setSubmit(true);

    try {
      const response = await fetch(`${BASE_API_URL}?api=like`, {
        method: "POST",
        credentials: "include", // Httponly
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
        },
        body: JSON.stringify({ id_user, id_acteur }),
      });

      const data = await response.json();

      if (data && data.success) {
        console.log("Like button has been clicked");
        setSubmit(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <button onClick={handleClickLike} className="cursor-pointer">
        <BiSolidLike />
      </button>
    </>
  );
};

export default LikeButton;
