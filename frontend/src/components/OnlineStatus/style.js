import styled from "styled-components";

export const Holder = styled.div`
display: flex;
justify-content: ${({align}) => align};
flex-wrap: wrap;
color: white;
font-family: Raleway;
font-weight: 700;
font-size: 16px;
padding: 0px 5px;
b {
    margin-right: 5px;
}
`
export const Status = styled.div`
display: flex;
align-items: center;
margin-right: 10px;
`
export const StatusDot = styled.div`
margin-right: 10px;
align-self: center;
width: 12px;
height: 12px;
background-color: ${({online}) => online ? "#23D405": "#FFB800"};
box-shadow: 0px 0px 3px 1px ${({online}) => online ? "rgba(35, 212, 5, 0.58);" : "rgba(133, 0, 0, 0.58);"};
border-radius: 50%;
${({online}) => online && "animation: heartbeat 1.5s infinite;"}
@keyframes heartbeat {
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100%{
        opacity: 0.5;
    }
    
}
`