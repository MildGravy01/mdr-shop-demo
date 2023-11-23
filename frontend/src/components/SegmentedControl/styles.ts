import styled, {css} from 'styled-components';
import { IPosition } from './types';

interface IStyledProps {
  position: IPosition;
  width?: number;
  interact?: boolean;
}

export const CategoryHolder = styled.div`
  display: flex;
  padding: 5px 0px;
`;

export const HoverBracket = styled.div<IStyledProps>`
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
  height: 100%;
  margin: 0;
  border-radius: 8px;
  left: ${({position}) => {
    return position.left;
  }}px;
  width: ${({width}) => {
    return width;
  }}px;
  position: absolute;
  display: flex;
  @media screen and (max-width: 600px) {
    display: none;
  }
  cursor: pointer;
  ${({interact}) => {
    if (interact) {
      return css`
        opacity: 0.3;
      `;
    } else {
      return css`
        opacity: 0;
      `;
    }
  }}
`;
export const ActiveBracket = styled.div<IStyledProps>`
  border: 1px solid #4541ea;
  background-color: #181818;
  ${({position}) => {
    return css`
      left: ${position.left}px;
      top: ${position.top}px;
      height: ${position.height}px;
      width: ${position.width}px;
    `;
  }}
  z-index: 2;
  border-radius: 8px;
  position: absolute;
  transition: all 0.3s;
`;
export const Background = styled.div`
  position: relative;
  vertical-align: middle;
  display: flex;
  flex-wrap: wrap;
  background-color: #0f0f0f;
  border-radius: 8px;
  height: max-content;
  .active {
    opacity: 0.9;
  }
  :last-of-type() {
  }
`;

export const StyledCategoryItem = styled.button`
  z-index: 3;
  background-color: transparent;
  color: white;
  flex: 1 1 auto;
  padding: 0px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  font-family: "Raleway";
  cursor: pointer;
  margin: 0px 0px;
  @media screen and (max-width: 600px) {
    margin: 0px 0px;
  }
  height: 35px;
  font-size: 16px;
  opacity: 0.4;
  transition: all 0.4s;
`;

export const Preloader = styled.div`
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
  background-size: 400% 400%;
  animation: gradient 1s infinite;
  width: 450px;
  height: 35px;
  border-radius: 8px;
  margin-bottom: 10px;
  @keyframes gradient {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
