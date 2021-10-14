import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import NotStyledButton from "../buttons/NoStyledButton";
import { CgProfile } from "react-icons/cg";
import { IoIosReturnLeft, IoReturnDownForwardOutline } from "react-icons/io";
import { RiFridgeLine } from "react-icons/ri";

const Footer = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Button onClick={() => history.goBack()}>
        <IoIosReturnLeft />
      </Button>

      <MiddleButton onClick={() => history.push("/profile")}>
        <CgProfile />
      </MiddleButton>

      <Button onClick={() => history.push("/fridge")}>
        <RiFridgeLine />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 0px;
  background: var(--app-bg-color-theme);
  width: 100%;
  height: 70px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled(NotStyledButton)`
  color: white;
  font-size: 35px;
  padding-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
`;

const MiddleButton = styled(NotStyledButton)`
  color: white;
  font-size: 35px;
  padding-top: 15px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  background: var(--app-bg-color-theme);
  border-radius: 50%;
  width: 200px;
  margin-bottom: 7px;
`;

export default Footer;
