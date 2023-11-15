import styled from "styled-components";
import { ReactComponent as Logo } from "../../img/Logo.svg";

export const StyledHeader = styled.header`
  background-color: #1b1b20;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    justify-content: center;
  }
  flex-wrap: wrap;
  position: relative;
  padding: 0 10px;
  line-height: 15px;
  height: 30%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
    gap: 10px;
    li {
      list-style-type: none;
    }
  }
`;

export const StyledLogo = styled(Logo)`
  align-self: center;
  cursor: pointer;
`;

export const StyledMenuButton = styled.button`
  color: white;
  border: none;
  padding: 5px 10px;
  font-family: "Raleway-Bold";
  background-color: transparent;
  border-radius: 15px;
  transition: all 0.2s;
  &:hover {
    color: #e0e0e0;
    cursor: pointer;
  }
  &:active {
    color: #c8c8c8;
  }
`;

export const StyledMenuButtonDiscord = styled(StyledMenuButton)`
  border-radius: 15px;
  background-color: #6d41ea;
  outline: 0px solid #5935bf;
  &:hover {
    background-color: #5935bf;
    outline: 2px solid #5935bf;
  }
  &:active {
    background-color: #5935bf;
    outline: 1px solid #5935bf;
  }
`;

export const StyledMenuButtonVk = styled(StyledMenuButton)`
  border-radius: 15px;
  background-color: #3966b8;
  outline: 0px solid #3966b8;
  &:hover {
    background-color: #32589d;
    outline: 2px solid #32589d;
  }
  &:active {
    background-color: #2b4b87;
    outline: 1px solid #2b4b87;
  }
`;

export const StyledMenuButtonEmail = styled(StyledMenuButton)`
  background-color: transparent;
  outline: 1px solid white;
  &:hover {
    outline: 2px solid white;
  }
  &:active {
    outline: 1px solid white;
  }
`;

export const StyledFooter = styled.div`

  display: flex;
  z-index: 10;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  align-items: center;
  color: rgba(122,122,122,0.86);
  font-family: Raleway;
  padding: 25px 10px;
  font-weight: 600;
  background-color: #1b1b20;
`;
