import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import NotStyledButton from "../buttons/NoStyledButton";
import { CgProfile } from "react-icons/cg";
import { IoIosReturnLeft, IoIosReturnRight } from "react-icons/io";
import { RiFridgeLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { UserContext } from "../components/contexts/UserContext";

const Footer = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  return (
    <Wrapper>
      <Button onClick={() => history.goBack()}>
        <IoIosReturnLeft />
      </Button>
      <Button
        grey={!user._id}
        disabled={!user._id}
        onClick={() => history.push("/profile")}
      >
        <CgProfile />
      </Button>
      <Button onClick={() => history.push("/")}>
        <AiOutlineHome />
      </Button>
      <Button
        grey={!user._id}
        disabled={!user._id}
        onClick={() => history.push("/fridge")}
      >
        <RiFridgeLine />
      </Button>

      <Button onClick={() => history.goForward()}>
        <IoIosReturnRight />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 0px;
  background: var(--app-bg-color-theme);
  width: 100%;
  min-height: 70px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Button = styled(NotStyledButton)`
  cursor: ${({ grey }) => (grey ? `default` : `pointer`)};
  color: white;
  font-size: 35px;
  padding-top: 15px;
  opacity: ${({ grey }) => (grey ? `0.3` : `1`)};
`;

export default Footer;
