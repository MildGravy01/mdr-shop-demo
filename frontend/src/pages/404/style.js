import styled from "styled-components";

export const Background = styled.div`
position: relative;
  font-family: Raleway;
  font-weight: 700;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  overflow: hidden;
  width: 100%;
  height: 85vh;
  color: white;
  z-index: 10;
  h1 {
    font-size: 50px;
    z-index: 10;
  }
  h2{
    z-index: 10;
  }
  button{
    align-self: center;
    width: 150px;
    z-index: 10;
  }
`;
export const StyledImage = styled.img`
position: absolute;
z-index: 0;
max-height: 1000px;
max-width: 1000px;
min-width: 500px;
left: 15%;
top: -5%;
`;
