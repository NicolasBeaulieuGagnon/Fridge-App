import React from "react";
import styled from "styled-components";

const RadioButtonComponent = ({ choice, setChoice }) => {
  return (
    <Wrapper>
      <div>
        <Radio
          onClick={() => setChoice(1)}
          type="radio"
          id="minimize"
          name="ranking"
          value="minimize"
        />
        <Label htmlFor="minimize">Try using all my ingredients</Label>
      </div>
      <div>
        <Radio
          onClick={() => setChoice(2)}
          type="radio"
          id="maximize"
          name="ranking"
          value="maximize"
        />
        <Label htmlFor="maximize">Try not needing to buy ingredients</Label>
      </div>
      <div>
        <Radio
          onClick={() => setChoice(null)}
          type="radio"
          id="neither"
          name="ranking"
          value="neither"
        />
        <Label htmlFor="neither">Neither</Label>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  user-select: none;
`;

const Label = styled.label`
  cursor: pointer;
  width: 100%;
  &:hover {
    background: rgb(235, 235, 235);
  }
`;

const Radio = styled.input`
  cursor: pointer;
`;

export default RadioButtonComponent;
