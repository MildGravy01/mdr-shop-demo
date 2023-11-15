import React from 'react';
import styled, { css } from 'styled-components';

export const Button = ({type="primary",children,onClick,className,disabled}) => {
    return(<StyledButton type={type} onClick={onClick} className={className} disabled={disabled}>{children}</StyledButton>);

};
export const StyledButton = styled.button`
    ${({type}) => { switch(type){
        default:
            return css`
                background-color: #4541EA;
                color: white;
                font-family: "Raleway";
                font-size: 14px;
                padding: 4px 10px;
                transition: all 0.2s;
                outline: #4541EA solid 0px;
                
                ${({disabled}) => !disabled && css`
                &:hover{
                    outline: #4541EA solid 2px;
                    color: #e0e0e0;
                    cursor: pointer;
                }
                &:active{
                    background-color: ;
                    outline: #4541EA solid 1px;
                    color: #e0e0e4;
                }`}

                &:disabled{
                    cursor: not-allowed;
                    background-color: #242424;
                    color: #6b6b6c;
                }`
        case "secondary":
            return css`
                background-color: #212126;
                color: white;
                font-family: "Raleway";
                font-size: 14px;
                padding: 4px 10px;
                transition: all 0.2s;
                outline: #212126 solid 0px;
                ${({disabled}) => !disabled && css`
                &:hover{
                    outline: #212126 solid 2px;
                    color: #e0e0e0;
                    cursor: pointer;
                }
                &:active{
                    background-color: ;
                    outline: #212126 solid 1px;
                    color: #e0e0e4;
                }`}
                
                &:disabled{
                    cursor: not-allowed;
                    background-color: #242424;
                    color: #6b6b6c; 
                }`
    } }}


border: none;
border-radius: 5px;
`




