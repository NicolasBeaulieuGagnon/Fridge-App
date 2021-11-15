import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import NotStyledButton from "../buttons/NoStyledButton";
import { CgProfile } from "react-icons/cg";
import { IoIosReturnLeft, IoIosReturnRight } from "react-icons/io";
import { RiFridgeLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { UserContext } from "../components/contexts/UserContext";

const Footer = ({ openNav, setOpenNav }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  return (
    <Wrapper close={openNav}>
      {openNav ? (
        <Button
          onClick={(ev) => {
            ev.stopPropagation();
            setOpenNav(false);
          }}
        >
          <AiOutlinePlusCircle />
        </Button>
      ) : (
        <>
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
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  box-shadow: 0 0 20px 1px rgb(0, 0, 0, 0.3);
  bottom: ${({ close }) => (close ? "10px" : "0px")};
  background: var(--app-bg-color-theme);
  width: ${({ close }) => (close ? "50px" : "100%")};
  right: ${({ close }) => (close ? "10px" : "0")};
  border-radius: ${({ close }) => close && "150px"};
  z-index: 10;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  transition: 0.3s ease-in-out;
  z-index: 5000;
`;

const Button = styled(NotStyledButton)`
  cursor: ${({ grey }) => (grey ? `default` : `pointer`)};
  color: white;
  font-size: 35px;
  padding-top: 9px;
  opacity: ${({ grey }) => (grey ? `0.3` : `1`)};
`;

export default Footer;
