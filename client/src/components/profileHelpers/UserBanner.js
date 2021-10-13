import React from "react";
import styled, { keyframes } from "styled-components";

const UserBanner = ({ user }) => {
  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar
          img={!!user.avatarSrc}
          src={user.avatarSrc}
          alt={`${user.userName}'s avatar`}
        />
      </AvatarWrapper>
      <UserName>{user.userName}</UserName>
    </Wrapper>
  );
};

const fadeIn = keyframes`
0% {
  opacity:0;
  left:300px;
  
}
65%{
  left:100px;
}
100%{
  opacity:1;
  left:150px;
}
`;

const stretchAcross = keyframes`
0%{
  width:1%
}
80%{
  
}
100%{
  width:100%
}
`;

const grow = keyframes`
0%{

}
80%{
  
}
100%{
  width:100px;
  height:100px;
  opacity:1;
  top: -30px;
}
`;

const UserName = styled.div`
  position: absolute;
  left: 150px;
  top: 27px;
  color: white;
  font-size: 22px;
  opacity: 0;
  animation: ${fadeIn} 0.4s linear forwards;
  animation-delay: 0.7s;
`;

const Wrapper = styled.div`
  position: relative;
  width: 0%;
  height: 80px;
  background: var(--app-bg-color-theme);
  margin-top: 50px;
  animation: ${stretchAcross} 1s ease-in-out forwards;
`;

const Avatar = styled.img`
  width: 100%;
  opacity: ${({ img }) => (img ? "1" : "0")};
  transition: 0.3s ease-in-out;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  top: 0px;
  background: var(--app-bg-color-theme);
  padding: 20px;
  left: 10px;
  border-radius: 100px;
  width: 0px;
  height: 0px;
  opacity: 0;
  animation: ${grow} 0.3s ease-in-out forwards;
  animation-delay: 0.3s;
`;

export default UserBanner;
