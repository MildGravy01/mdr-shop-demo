import styled from 'styled-components';
import {Button as StyledButton} from '../Button';
import {PriceBadge} from '../PriceBadge';

export const ProductImage = styled.img`
  width: 190.48px;
  height: 190.54px;
  border-radius: 0px 0px 10px 0px;
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
  transition: all 0.3s;
`;

export const Background = styled.div`
  background-color: #1b1b20;
  transition: all 0.2s ease-in-out;
  position: relative;
  color: white;
  border-radius: 10px;
  width: 350px;
  min-height: 250px;
  margin: 5px 5px;
  &:hover{
    cursor: pointer;
    transform: scale(1.02);
  }
`;
export const Wrapper = styled.div`
  margin: 10px 15px;
`;

export const ProductShortDescription = styled.pre`
  text-align: left;
  width: 220px;
  height: 64px;
  font-size: 10px;
  line-height: 13px;
  overflow: hidden;
  margin: 20px 0px;
  font-size: 12px;
  font-family: 'Raleway';
  font-size: 11px;
  word-spacing: 1px;
  letter-spacing: 0.5px;
  white-space: pre-line;
  flex-direction: column;
`;
export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-family: 'Raleway';
  h2 {
    font-family: Minecraft;
    font-size: 16px;
    padding: 0;
    margin: 0;
    max-width: 80%;
  }
`;
export const Button = styled(StyledButton)`
  position: absolute;
  left: 15px;
  bottom: 20px;
`;

export const StyledPriceBadge = styled(PriceBadge)`
  position: absolute;
  left: 15px;
  bottom: 30px;
`;

export const Preloader = styled.div`
  position: relative;
  background: linear-gradient(
    -45deg,
    #1b1b20,
    #1b1b20,
    #1b1b20,
    #1b1b20,
    #312f7d,
    #1b1b20,
    #1b1b20,
    #1b1b20
  );
  background-size: 800% 600%;
  animation: gradient 1s infinite;
  border-radius: 10px;
  min-width: 350px;
  min-height: 250px;
  margin: 5px 5px;
  @keyframes gradient {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
