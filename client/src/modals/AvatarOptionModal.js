import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MainStyledButton from "../buttons/MainStyledButton";
import NotStyledButton from "../buttons/NoStyledButton";

// AvatarOptionModal when you are creating your account, from the LoginIn.js
//
const AvatarOptionModal = ({ userAvatar, setUserAvatar }) => {
  const [defaultAvatarChoices, setDefaultAvatarChoices] = useState([]);

  // fetches all the avatar choices from the s3 bucket where they are stored
  useEffect(() => {
    fetch("/avatarChoice").then((res) => {
      res.json().then((data) => {
        setDefaultAvatarChoices(data.data);
      });
    });
  }, []);

  // a useEffect to change the background of the chosen Avatar
  useEffect(() => {
    if (defaultAvatarChoices) {
      defaultAvatarChoices.forEach((avatar) => {
        if (avatar === userAvatar) {
          const avatarChoice = document.getElementById(avatar);
          avatarChoice.style.background = "gray";
        } else {
          const avatarChoice = document.getElementById(avatar);
          avatarChoice.style.background = "white";
        }
      });
    }
  }, [userAvatar, defaultAvatarChoices]);

  // when you click on an avatar adds it as your chosen avatar
  // then calls handleClose to close the modal.
  const handleChoice = (ev) => {
    setUserAvatar(ev.target.id);
    setTimeout(() => {
      handleClose();
    }, 400);
  };
  const handleClose = () => {
    const modal = document.getElementById("avatarModalBg");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };

  return (
    <ModalBgWrapper id="avatarModalBg">
      <Modal>
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <AvatarWrapper>
          {defaultAvatarChoices.length > 0 &&
            defaultAvatarChoices.map((avatar, index) => {
              return (
                <ChoiceButton
                  id={avatar}
                  onClick={handleChoice}
                  key={`index-${index}`}
                >
                  <ModalImage
                    id={avatar}
                    src={avatar}
                    alt={`avatar-${index}`}
                  />
                </ChoiceButton>
              );
            })}
        </AvatarWrapper>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </Modal>
    </ModalBgWrapper>
  );
};

const ModalImage = styled.img`
  border-radius: 5px;
  margin: 2px 2px;
  width: 45px;
  transition: 0.2 ease-in-out;
`;
const HiddenButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: 0px;
  right: 2px;
`;
const ChoiceButton = styled(NotStyledButton)`
  border-radius: 5px;
  margin: 2px 2px;
  transition: 0.5s ease-in-out;
`;

const CloseButton = styled(MainStyledButton)`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const Modal = styled.div`
  border-radius: 5px;
  padding: 10px;
  padding-bottom: 60px;
  padding-top: 22px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const AvatarWrapper = styled.div`
  min-width: 200px;
  height: 300px;
  overflow-y: scroll;
`;

const ModalBgWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s;
`;

export default AvatarOptionModal;
