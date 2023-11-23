import styled from 'styled-components';


export const Image = styled.img`
position: absolute;
bottom: 0;
right: 0;
border-radius: 8px;
max-height: 250px;
`;

export const Wrapper = styled.div`
width: 50%;
`;

export const Header = styled.div`
font-family: Raleway-Bold;
color: white;
font-size: 33px;
padding: 0px 25px 0px 0px;
line-height: 40px;

`;
export const SubHeader = styled.div`
margin-top: 20px;
font-family: Raleway-Bold;
font-size: 13px;
color: rgba(255, 255, 255, 0.34);
.discord {
    color: rgba(141, 52, 255, 0.72);
    :hover{
        color: rgba(141, 52, 255, 0.32);
    }
    :focus{
        color: rgba(141, 52, 255, 0.22);
    }
}
.vk {
    color: rgba(36, 150, 255, 0.77);
    :hover{
        color: rgba(36, 150, 255, 0.57);
    }
    :focus{
        color: rgba(36, 150, 255, 0.27);
    }
}
`;

export const Footer = styled.div`
font-family: Raleway-Bold;
font-weight: 700;
font-size: 20px;
width: 150px;
color: white;
position: absolute;
bottom: 20px;
left: 30px;
`;

export const Background = styled.div`
border-radius: 8px;
background: #1B1B20;
max-width: 700px;
min-height: 500px;
display: flex;
flex-direction: column;
position: relative;
padding: 20px 30px;
@media screen and (min-width: 1000px){
    ${Image}{
        max-height: 350px;
    }
    ${Header}{
        font-size: 53px;
        line-height: 50px;
    }
    ${SubHeader}{
        font-size: 18px;
    }
    ${Footer}{
        font-size: 32px;
        width: 270px;
    }
}
`;

