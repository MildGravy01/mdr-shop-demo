import styled from "styled-components";

export const SaleBadge = ({fontSize,children}) => {
  return(
    <StyledBadge fontSize={fontSize}>-{children}%</StyledBadge>
  );
};

const StyledBadge = styled.div`
color: #F0158B;
border: 1px dashed #F0158B;
padding: 0px 5px;
border-radius: 4px;
font-size: ${props => props.fontSize}px;
line-height: 150%;
vertical-align: middle;
text-align: center;
font-family: "Raleway";
cursor: default;
`
StyledBadge.defaultProps = {
  fontSize: 16
}