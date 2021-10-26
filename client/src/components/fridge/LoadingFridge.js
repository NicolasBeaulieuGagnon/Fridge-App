import React from "react";
import styled, { keyframes } from "styled-components";
import { BiFridge } from "react-icons/bi";

const LoadingFridge = () => {
  const text = "The Fridge is Running ...";

  const changeIndexToArray = (index) => {
    if (index > 9) {
      return index.toString().split("");
    } else {
      return index;
    }
  };

  return (
    <Wrapper>
      <Content>
        <FridgeWrapper>
          <BiFridge size={40} />
        </FridgeWrapper>
        <TextWrapper>
          {text.split("").map((letter, index) => {
            return <Text i={changeIndexToArray(index)}>{letter}</Text>;
          })}
        </TextWrapper>
      </Content>
    </Wrapper>
  );
};

const travel = keyframes`
0%{     
    left: 0%;
    opacity: 0;
    transform: rotate(10deg);

}
10%{
    opacity: 1;
    transform: rotate(-15deg);

}
20%{
    transform: rotate(15deg);

}
30%{
    transform: rotate(-15deg);

}
40%{
    transform: rotate(15deg);

}
50%{
    transform: rotate(-15deg);

}
60%{
    transform: rotate(15deg);

}
70%{
    transform: rotate(-15deg);

}
80%{
    transform: rotate(15deg);

}
90%{
    transform: rotate(-15deg);
    opacity: 1;
}
100%{ 
    left:calc(100% - 50px);
    opacity: 0;
    transform: rotate(15deg);

}

`;

const fadeInOut = keyframes`
0%{
    opacity:.3;
}
50%{
    opacity:1;

}
100%{
    opacity:.3;
}
`;
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  font-size: 22px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FridgeWrapper = styled.div`
  position: absolute;
  left: 0%;
  top: -5px;
  transform: rotate(10deg);
  animation: ${travel} 2s linear infinite;
  opacity: 0;
`;

const Text = styled.span`
  opacity: 0.3;
  animation: ${fadeInOut} 3s linear infinite;
  animation-delay: ${({ i }) => {
    return i.length > 1 ? `${i[0]}.${i[1]}s` : `0.${i}s`;
  }};
`;

const TextWrapper = styled.div`
  margin-top: 50px;
`;

export default LoadingFridge;
