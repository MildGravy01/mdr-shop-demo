import styled from 'styled-components';

export const SaleBadge = ({fontSize = 16, children}: ISaleBadgeProps) => {
  return (
    <StyledBadge fontSize={fontSize}>-{children}%</StyledBadge>
  );
};

interface ISaleBadgeProps {
  fontSize?: number;
  children?: number | string;
}

const StyledBadge = styled.div<Pick<ISaleBadgeProps, 'fontSize'>>`
color: #F0158B;
border: 1px dashed #F0158B;
padding: 2.5px 10px;
border-radius: 4px;
font-size: ${({fontSize}) => fontSize}px;
line-height: 140%;
vertical-align: middle;
text-align: center;
font-family: Minecraft;
font-size: 14px;
cursor: default;
`;