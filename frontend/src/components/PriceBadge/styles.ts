import styled, {css} from 'styled-components';
import { IPriceBadgeProps } from './types';

export const PriceHolder = styled.div`
  display: flex;
`;
export const Background = styled.div<Pick<IPriceBadgeProps, 'promo'>>`
  border: 1px dashed #2f2f36;
  ${({promo}) =>
    promo &&
    css`
      border: 1.5px dashed #4d1c36;
    `}
  border-radius: 6px;
  display: flex;
  cursor: default;
`;
export const CurrentPrice = styled.div<Pick<IPriceBadgeProps, 'promo'>>`
  border: 1.5px solid #4541ea;
  ${({promo}) =>
    promo &&
    css`
      border: 1.5px solid #f0158b;
    `}
  font-family: "Raleway";
  padding: 2px 5px;
  margin: 1px;
  color: #fff;
  border-radius: 4px;
`;

export const OldPrice = styled.div`
  padding: 4px 5px;
  font-family: "Raleway";
  color: white;
  opacity: 0.4;
  text-decoration-line: line-through;
`;
