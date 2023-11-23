import { StyledButton } from "./style";
import { IButtonProps } from "./types";

export const Button = ({
  type = 'primary',
  children,
  onClick,
  className,
  isDisabled,
}: IButtonProps) => (
    <StyledButton type={type} 
     onClick={onClick}
     className={className} 
     isDisabled={isDisabled}>
      {children}
    </StyledButton>
  );

