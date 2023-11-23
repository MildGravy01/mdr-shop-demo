import styled, {css} from 'styled-components';
import { IButtonProps } from './types';

export const StyledButton = styled.button<Pick<IButtonProps, 'type' | 'isDisabled'>>`
  ${({type, isDisabled}) => {
    switch (type) {
      default:
        return css`
          background-color: #4541ea;
          color: white;
          font-family: "Raleway";
          font-size: 14px;
          padding: 4px 10px;
          transition: all 0.2s;
          outline: #4541ea solid 0px;

          ${() => isDisabled &&
            css`
              &:hover {
                outline: #4541ea solid 2px;
                color: #e0e0e0;
                cursor: pointer;
              }
              &:active {
                background-color: ;
                outline: #4541ea solid 1px;
                color: #e0e0e4;
              }
            `}

          &:disabled {
            cursor: not-allowed;
            background-color: #242424;
            color: #6b6b6c;
          }
        `;
      case 'secondary':
        return css`
          background-color: #212126;
          color: white;
          font-family: "Raleway";
          font-size: 14px;
          padding: 4px 10px;
          transition: all 0.2s;
          outline: #212126 solid 0px;
          ${!isDisabled &&
            css`
              &:hover {
                outline: #212126 solid 2px;
                color: #e0e0e0;
                cursor: pointer;
              }
              &:active {
                background-color: ;
                outline: #212126 solid 1px;
                color: #e0e0e4;
              }
            `}

          &:disabled {
            cursor: not-allowed;
            background-color: #242424;
            color: #6b6b6c;
          }
        `;
    }
  }}

  border: none;
  border-radius: 5px;
`;