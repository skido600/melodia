export const validate = (email, password, name, setError) => {
  let isValid = true;
  let newError = { email: "", password: "", name: "" };

  if (!name || name.length < 2) {
    newError.name = "Please enter a valid name (at least 2 characters)";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    newError.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!password || password.length < 6) {
    newError.password = "Password must be at least 6 characters long";
    isValid = false;
  }

  setError(newError);

  return isValid;
};

//login
export const validateLogin = (email, password, setError) => {
  let isValid = true;
  let newError = { email: "", password: "" };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    newError.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!password || password.length < 6) {
    newError.password = "Password must be at least 6 characters long";
    isValid = false;
  }

  setError(newError);
  return isValid;
};
