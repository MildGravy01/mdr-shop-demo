import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 100px 15%;
  h1 {
    color: white;
    font-size: 2vw;
    margin: 10px;
    font-family: "Raleway";
  }
`;

export const Image = styled.img`
  position: absolute;
  right: 30px;
  top: -54px;
  width: 70px;
  height: 54px;
  @media screen and (min-width: 700px) {
    right: 60px;
    top: -114px;
    width: 147px;
    height: 114px;
  }
  z-index: 0;
`;
export const ModalBackground = styled.pre`
  border-radius: 10px;
  overflow-y: auto;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
  font-family: Raleway;
  line-height: 1.2;
  max-width: 500px;
  color: white;
  background-color: #1b1b20;
  padding: 20px;
`;

export const Background = styled.div`
  position: relative;
  color: white;
  font-family: "Raleway";
`;
export const Preloader = styled.div`
  position: relative;
  background: linear-gradient(
    -45deg,
    #1b1b20,
    #1b1b20,
    #1b1b20,
    #1b1b20,
    #312f7d,
    #1b1b20,
    #1b1b20,
    #1b1b20
  );
  background-size: 800% 600%;
  animation: gradient 1s infinite;
  border-radius: 10px;
  width: 100%;
  min-height: 350px;
  margin-bottom: 20px;
  @keyframes gradient {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const Chapter = styled.div`
  background-color: #1b1b20;
  padding: 10px 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 16px;
  user-select: none;
  pre {
    word-wrap: break-word;
    color: white;
    font-family: "Raleway";
    user-select: none;  
    white-space: break-spaces;
  }
`;
