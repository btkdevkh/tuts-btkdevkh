const register = (prevState, formData) => {
  const firstName = formData.get("firstName");
  const email = formData.get("email");
  const password = formData.get("password");

  // Validation
  if (!firstName || !email || !password) {
    return {
      success: false,
      message: "Tous les champs sont obligatoires!",
    };
  }

  console.log(firstName, email, password);

  return {
    success: true,
    message: "Votre compte a bien été crée!",
  };
};

export { register };
