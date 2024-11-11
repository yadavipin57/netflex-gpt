export const checkValidData = (name, email, password) => {
  const isNameValid = /^[A-ZÀ-ÿ0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i.test(
    name
  );

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  ); // Using test() it checks if email follows the same format as of the regex email, and passes true of false value accordingly.

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (name === null) {
    return null; // For Sign in page because name is not required there.
  } else if (!isNameValid) return "Name is not valid";

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
