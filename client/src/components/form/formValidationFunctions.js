export const checkPassword = (password, confirmPassword) => {
  let errors = [];
  if (password?.length < 8) {
    errors.push({
      error: "Must be greater than 8 characters",
      type: "password",
    });
  }

  if (!/\d/.test(password)) {
    errors.push({
      error: "Password needs at least 1 number",
      type: "password",
    });
  }

  if (password?.includes(" ")) {
    errors.push({ error: "Password cannot contain spaces", type: "password" });
  }

  if (confirmPassword) {
    if (password !== confirmPassword) {
      errors.push({
        error: "Password and Confirm must match",
        type: "confirmPassword",
      });
    }
  } else {
    errors.push({
      error: "Confirm Password needed",
      type: "confirmPassword",
    });
  }
  return errors;
};

export const checkUserName = (users, newUserName) => {
  let errors = [];

  if (newUserName === null) {
    errors.push({ error: "userName needed", type: "userName" });
  } else {
    const answer = users.filter((user) => {
      return user.userName.toLowerCase() === newUserName?.toLowerCase();
    });
    if (answer.length > 0) {
      errors.push({ error: "User name already taken", type: "userName" });
    }
  }

  return errors;
};

export const checkRequired = (form, formInfoNeeded) => {
  let errors = [];

  formInfoNeeded.forEach((info) => {
    if (info.input.required && form[info.input.name] === null) {
      errors.push({ error: "Required field missing", type: info.input.name });
    }
  });

  return errors;
};

export const checkIfValidEmail = (email) => {
  let errors = [];
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email) {
    let test = re.test(email.toLowerCase());
    if (!test) {
      errors.push({ error: "Invalid email", type: "email" });
    }
  }
  return errors;
};
