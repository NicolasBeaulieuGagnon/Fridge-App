export const formInfoNeeded = [
  {
    label: "First Name",
    input: { type: "text", required: true, name: "firstName" },
  },
  {
    label: "Last Name",
    input: { type: "text", required: true, name: "lastName" },
  },
  {
    label: "User Name",
    input: { type: "text", required: true, name: "userName" },
  },
  {
    label: "Email",
    input: { type: "email", required: true, name: "email" },
  },
  {
    label: "Password",
    input: { type: "password", required: true, name: "password" },
  },
  {
    label: "Confirm Password",
    input: {
      type: "password",
      required: true,
      name: "confirmPassword",
    },
  },
  {
    label: "Pick Avatar",
    input: { type: "media", name: "avatar" },
  },
];
