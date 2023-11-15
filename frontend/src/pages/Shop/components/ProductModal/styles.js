import styled, { css } from "styled-components";
import { SelectorWrapper } from "../../../../components/SelectorWrapper";

export const Description = styled.div`
  overflow-y: auto;
  padding: 10px 0px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-family: Raleway;
  inline-size: 150px;
  overflow-x: hidden;
  font-size: 14px;
  max-width: 100%;
  color: white;
  border-radius: 5px;
  
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 20px;
    border: none;
    outline: none;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
    width: 5px;
    border: none;
    outline: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
    border: none;
    outline: none;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  transition: all 0.3s;
  padding: 0;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

export const ImageHolder = styled.div`
  max-width: 40%;
  min-width: 30%;
  margin-left: 10%;
  align-self: center;
`;
export const ProductImage = styled.img`
  ${({ countable }) => {
    if (countable) {
      return css`
        width: 100%;
      `;
    } else {
      return css`
        position: absolute;
        width: 200px;
        height: 200px;
        @media screen and (min-width: 1200px) {
          width: 320px;
          height: 320px;
        }
        @media screen and (min-width: 700px) {
          width: 200px;
          height: 200px;
        }
        border-radius: 0px 0px 10px 0px;
        right: 0;
        bottom: 0;
      `;
    }
  }};

  border: none;
`;

export const InfoHolder = styled.div`
  position: inherit;
  display: flex;
  flex-wrap: nowrap;
  font-size: 18px;
  box-sizing: border-box;
  color: white;
  padding: 0px 35px;
  margin-bottom: 0px;
  gap: 30px;
  grid-gap: 30px;
  overflow-x: hidden;
  .commands {
    position: inherit;
    font-family: "Raleway-Bold";
    width: 75%;
    div {
      position: inherit;
      font-family: "Raleway";
      width: 100%;
      margin: 10px 0px;
      line-height: 20px;
      font-size: 12.5px;
      background-color: #212126;
      padding: 10px 10px;
      height: ${({height}) => height};
      width: 100%;
    }
  }
  .possibilities {
    position: inherit;
    font-family: "Raleway-Bold";
    div {
      padding: 10px 5px;
      font-family: "Raleway";
      position: inherit;
      width: 100%;
      line-height: 15px;
      font-size: 12px;
      margin: 10px 0px;
      max-height: 150px;
      @media screen and (max-width: 1500px) {
        max-height: 110px;
      }
    }
  }
  span {
    font-family: "Raleway-Bold";
  }
`;

export const ModalBody = styled.div`
  border-radius: 10px;
  background-color: #1b1b20;
  min-height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  min-width: 400px;
  max-width: 600px;
  position: relative;
  .price-holder {
    padding: 20px 35px;
    display: flex;
  }
`;
ModalBody.defaultProps = {
  height: "450px",
  margin: "0px",
};
export const InputHolder = styled.div`
  width: 50%;
  input {
    width: 90%;
  }
  label {
    font-family: Raleway-Bold;
    font-size: 13px;
    border-radius: 4px;
    padding: 2px 10px;
    color: #fff;
  }
`;
export const FormHolder = styled.div`
  display: flex;
  color: white;
  padding: 20px 35px;
  font-family: "Raleway";
  justify-content: left;
  flex-wrap: nowrap;
  gap: 10px;
`;

export const Holder = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
`;


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    vertical-align: middle;
    gap: 20px;
    margin-right: 10px;
  }
  color: white;
  font-family: "Raleway-Bold";
  font-size: 24px;
  padding: 20px 30px;
`;
export const PaymentHolder = styled.div`
  padding: 10px 35px;
  color: gray;
  font-family: "Raleway";
  font-size: 12px;
  button {
    height: 30px;
    width: 30%;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const StyledSelector = styled(SelectorWrapper)`
  height: 50px;
  button {
    flex: 0 0 3.5em;
  }
`;
export const PaymentImage = styled.img`
  height: 100%;
  width: 100%;
  font-size: 14px;
`;

export const Status = styled.div`
  ${({ success }) => (success ? "color: #4eff0b;" : "color:red;")}
  font-size: 12px;
  width: 100%;
  display: flex;
  font-family: "Raleway";
  padding: 5px;
`;
