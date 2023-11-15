import styled from "styled-components";

export const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;

.active{
    background-color: #4441ea;
    &:hover{
        outline: #4541EA solid 1px;
        color: #e0e0e0;
        cursor: pointer;
        }
}
button {
    flex: 0 0 5em;
    margin-bottom: 10px;
    height: 100%;
    margin-right: 10px;
}
`;