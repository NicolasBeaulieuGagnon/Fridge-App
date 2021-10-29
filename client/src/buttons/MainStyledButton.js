import styled from "styled-components";
import NotStyledButton from "./NoStyledButton";

const MainStyledButton = styled(NotStyledButton)`
  background: var(--btn-bg-color);
  font-size: 22px;
  font-weight: bold;
  border-radius: 2px;
  padding: 2px 10px;
  box-shadow: 1px 1px px 0.1px var(--dark-accent);
  border: 2px solid var(--primary-border-color);
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;

export default MainStyledButton;
