import { useActionState, useEffect } from "react";
import { register } from "../actions/user.actions";

const BasicForm = () => {
  const [state, formAction] = useActionState(register, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      alert(state.message);
    } else if (!state.success && state.message) {
      alert(state.message);
    }
  }, []);

  return (
    <>
      <form action={formAction}>
        <h3>S'enregistrer </h3>

        <input type="text" name="firstName" placeholder="Prénom" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="password" name="password" placeholder="Mot de passe" />
        <br />
        <br />

        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default BasicForm;
