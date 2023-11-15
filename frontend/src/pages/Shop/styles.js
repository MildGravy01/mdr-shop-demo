import styled from "styled-components";

export const Wrapper = styled.div`
  justify-content: center;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1140px;
  display: flex;
`;
export const StyledBody = styled.div`
  width: 100%;

  .shopHeader {
    padding: 20px 20px;
    margin: 0px auto;
    h1 {
      font-family: "Raleway";
      font-size: 36px;
      color: white;
    }
  }
`;
export const ShopImageHolder = styled.div`
  margin-top: 50px;
  width: 100%;
`;
export const ShopImg = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const StyledBonus = styled.div`
    padding: 10px 10px 0px 10px;
    display: flex;
    @media (max-width: 900px) {
        justify-content: center;
        &>h4{
       margin-right: 5px;
       text-align: center;
    }
    }
    @media (min-width: 900px) {
        &>h4{
       margin-right: 20px;
    }
    }

`;

export const StyledBonusHeader = styled.h4`
   color: white;
   font-family: Raleway;
   svg{
    margin-right: 5px;
   }
`;

export const ProductHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  min-height: 700px;
  box-sizing: border-box;

  justify-content: center;
  transition: all 0.3s;
  margin-top: 0px;
  margin-bottom: 50px;
`;