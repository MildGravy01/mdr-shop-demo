import styled, {css} from 'styled-components';

interface IInputProps {
   success?: boolean;
   error?: boolean;
}

export const Label = styled.div<{activated: boolean;}>`
align-self: center;
border-radius: 4px;
background-color: transparent;
font-family: Raleway-Bold;
font-size: 13px;
padding: 2px 10px;
display: flex;
align-items: center;
color: #838383;
text-align: center;



${({ activated }) => !activated ? css`
  transform: translate(0px,0px);` :
  css`
  transform: translate(+5px,-25px);
  background-color: #33323F;
  color: #ffffff;
`}
transition: transform 0.2s ease-in-out;
pointer-events: none;
`;

export const InputBase = styled.input<IInputProps>`
  position: absolute;
  background-color: #212126;
  border-radius: 5px;
  border: none;
  font-family: "Raleway";
  min-height: 30px;
  padding: 2px 10px;
  font-size: 14px;
  color: white;
  transition: all 0.5s;
  &:focus{
    ${({error}) => error ? 'outline: none;' : 'outline: solid #272732;'}
  }
  ${({success}) => {
    if (success) {
      return 'outline:1px solid #4eff0b;';
    }
  }}
  ${({error}) => error && 'box-shadow: 0px 0px 3px red;'}
`;
export const ErrorLabel = styled.div`
position: absolute;
bottom: -15px;
color: red;
font-size: 10px;
font-family: Raleway-Bold;
align-items: center;
`;
export const RequiredStar = styled.a`
color: red;
font-size: 15px;
font-family: Raleway-Bold;
box-sizing: border-box;

`;
export const InputBackground = styled.div`
position: relative;
background-color: transparent;
align-items: center;
display: flex;
height: 35px;
&:focus-within{
    ${Label}{
        transform: translate(+5px,-25px);
        background-color: #33323F;
        color: #ffffff;
    }
}
`;
