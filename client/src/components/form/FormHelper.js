import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormHelper = ({ label, input, formSubErrors }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (formSubErrors.length > 0) {
      let piledErrors = formSubErrors.filter((err) => {
        return input.name.includes(err.type);
      });
      if (piledErrors.length > 0) {
        setError(true);
      } else {
        setError(false);
      }
      setFormErrors(piledErrors);
    } else {
      setFormErrors([]);
    }
  }, [formSubErrors]);
  const handleChange = (ev) => {
    if (input.required && ev.target.value.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleOpenAvatarModal = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const modal = document.getElementById("avatarModalBg");
    if (modal) {
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    }
  };
  console.log(formErrors);
  return (
    <>
      {input.name === "avatar" ? (
        <>
          <Label htmlFor={input.name}>
            {label}
            {input.required && "*"}
          </Label>
          {formErrors.length > 0 && <ErrorDiv>{formErrors[0].error}</ErrorDiv>}
          <InputButton onClick={handleOpenAvatarModal}>Avatars</InputButton>
        </>
      ) : (
        <>
          <Label htmlFor={input.name}>
            {label}
            {input.required && "*"}
          </Label>
          <div style={{ position: "relative" }}>
            {formErrors.length > 0 && (
              <ErrorDiv>{formErrors[0].error}</ErrorDiv>
            )}
            <Input
              error={error}
              onChange={handleChange}
              type={input.type}
              name={input.name}
              placeholder={`${input.required ? " " : "optional"}`}
              required={input.required}
            />
          </div>
        </>
      )}
    </>
  );
};

const ErrorDiv = styled.div`
  position: absolute;
  right: 5%;
  top: -12px;
  background: white;
  padding: 5px;
  font-size: 10px;
  color: red;
`;

const Label = styled.label`
  font-size: 12px;
  margin-top: 7px;
  padding: 2px;
  padding-left: 3%;
`;

const InputButton = styled.button`
  cursor: pointer;
  margin-left: 5%;
  height: 40px;
  outline: none;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid rgb(124, 122, 125,0.5)"};
  border-radius: 2px;
  width: 91%;
  transition: background 0.4s ease-in-out, transform 0.1s ease-in-out,
    color 0.4s ease-in-out;
  &:hover {
    color: white;
    background: rgb(0, 58, 150);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Input = styled.input`
  margin-left: 5%;
  height: 35px;
  width: 90%;
  outline: none;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid rgb(124, 122, 125,0.5)"};
  border-radius: 2px;
`;

export default FormHelper;
