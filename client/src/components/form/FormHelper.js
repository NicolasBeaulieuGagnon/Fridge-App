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
  return (
    <Wrapper>
      {input.name === "avatar" ? (
        <>
          <Label error={error} htmlFor={input.name}>
            {label}
            {input.required && "*"}
          </Label>
          {formErrors.length > 0 && <ErrorDiv>{formErrors[0].error}</ErrorDiv>}
          <InputButton onClick={handleOpenAvatarModal}>Avatars</InputButton>
        </>
      ) : (
        <>
          <Label error={error} htmlFor={input.name}>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const ErrorDiv = styled.div`
  position: absolute;
  right: 5%;
  top: -5px;
  background: white;
  padding: 5px;
  font-size: 10px;
  color: red;
`;

const Label = styled.label`
  color: ${({ error }) => (error ? "red" : "black")};
  position: absolute;
  z-index: 5;
  top: -5px;
  padding: 2px 4px;
  background: white;
  font-size: 12px;
  margin-left: calc(5% + 10px);
`;

const InputButton = styled.button`
  cursor: pointer;
  margin-left: calc(5% - 15px);
  padding-right: 20px;
  height: 40px;
  outline: none;
  background: white;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid rgb(124, 122, 125,0.5)"};
  border-radius: 2px;
  width: calc(90% + 19px);
  transition: font-size 0.2s ease-in-out, color 0.2s ease-in-out,
    transform 0.1s ease-in-out, color 0.4s ease-in-out;
  &:hover {
    color: rgb(0, 58, 150);
    font-size: 16px;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Input = styled.input`
  margin: 7px 0;
  padding-left: 15px;
  margin-left: calc(5% - 15px);
  height: 35px;
  width: 90%;
  outline: none;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid rgb(124, 122, 125,0.5)"};
  border-radius: 2px;
`;

export default FormHelper;
