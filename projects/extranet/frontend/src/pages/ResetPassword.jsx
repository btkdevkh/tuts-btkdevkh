import { useParams } from "react-router";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const { id: id_user } = useParams();

  return (
    <>
      <ResetPasswordForm id_user={id_user} />
    </>
  );
};

export default ResetPasswordPage;
