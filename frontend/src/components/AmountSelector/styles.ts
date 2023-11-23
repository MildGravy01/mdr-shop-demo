import styled from 'styled-components';

export const QuantityHolder = styled.div`
    display: flex;
`;
export const Background = styled.div`
    border: 1px dashed #2F2F36;
    border-radius: 6px;
    cursor: default;
    box-sizing: border-box;
    padding: 2px 5px;
    margin-left: 10px;
    align-items: center;
    display: flex;
`;

export const SelectorInput = styled.input`
background: transparent;
border: none;
color: white;
caret-color: white;
text-align: center;
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
font-family: "Raleway";
font-size: 16px;
max-width: 27px;
height: 20px;
&:focus{
    outline: none;
}
`;

export const SelectorButton = styled.button`
    outline: 1.5px solid #4541EA;
    border: none;
    font-family: "Raleway";
    background-color: transparent;
    &:hover {
        outline: 1.5px solid #ba41ea;
    }
    &:active{
        outline: 0.5px solid #ba41ea;
    }
    font-family: "Raleway";
    font-size: 17px;
    line-height: 10px;
    transition: all 0.3s;
    padding: 5px 7px;
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
`;
