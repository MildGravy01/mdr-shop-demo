import {Link} from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import styled, {css} from 'styled-components';
import {Button} from '../../components/Button';
import Image from 'img/image.png';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const BackgroundHolder = styled.div`
  background: url(${Image});
  background-size: cover;
  width: 100%;
  min-height: 650px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: reverse;
  justify-content: center;
  flex-direction: row;

  -webkit-box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.2);
`;

export const LeftHolder = styled.div`
  margin: 50px;
  margin-top: px;
  color: white;
  align-self: center;
  font-family: Raleway;
  h1 {
    font-size: 40px;
    margin: 0;
  }
  h2 {
    margin-top: 10px;
    font-size: 30px;
  }
`;
export const RightHolder = styled.div`
  height: 100%;
  color: white;
  padding: 40px 0px;
  font-family: Raleway;
  .leftAlign {
    text-align: left;
  }
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
  h3 {
    text-align: center;
  }
`;

export const Preloader = styled.div`
  position: relative;
  background: linear-gradient(
    -45deg,
    rgba(29, 29, 29, 0.692),
    rgba(29, 29, 29, 0.692),
    rgba(29, 29, 29, 0.692),
    rgba(29, 29, 29, 0.692),
    #312f7d,
    rgba(29, 29, 29, 0.692),
    rgba(29, 29, 29, 0.692),
    rgba(29, 29, 29, 0.692)
  );
  background-size: 800% 600%;
  animation: gradient 1s infinite;
  border-radius: 10px;
  padding: 20px 20px;
  width: 240px;
  min-height: 50px;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  h4 {
    margin-top: 5px;
    font-size: 16px;
  }
  @keyframes gradient {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
export const InfoHolder = styled.div`
  background-color: rgba(29, 29, 29, 0.692);
  padding: 20px 20px;
  align-items: center;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 10px;
  h3 {
    font-weight: 700;
    font-size: 22px;
    margin: 0;
  }
  h4 {
    margin-top: 5px;
    font-size: 16px;
  }
`;
export const StyledLink = styled(Link)`
  color: #4541ea;
  font-size: 16px;
`;
export const StyledTabs = styled(Tabs)`
  color: white;
  width: 70%;
  min-height: 400px;
  margin-top: 50px;
  margin-bottom: 50px;
  align-self: center;
  font-family: Raleway;
  display: flex;
  justify-content: center;
`;
export const StyledTabList = styled(TabList)`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;
export const StyledTab = styled(Tab)`
  background-size: 200%;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
  transition: all 0.4s;
  padding: 10px 25px;
  position: relative;
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: #7d7d8b1c;
  }
  &:focus {
    outline: none;
  }
  .child {
    z-index: 6;
  }
  h3 {
    background-color: #31313ebf;
    -webkit-box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.05);
    padding: 4px 10px;
    margin: 7px 0px;
  }
`;
export const TabImage = styled.div<{src: string}>`
  ${({src}) =>
    src &&
    css`
      background: url(${src});
    `}
  width: 600px;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: 50%;
  border-radius: 10px;
  @media screen and (min-width: 1450px) {
    width: 1000px;
    height: 500px;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
  }
`;
export const StyledTabPanel = styled(TabPanel)`
  position: relative;
`;
export const AboutServer = styled.div`
  background-color: #212126ab;
  padding: 10px 20px;
  width: 100%;
  min-height: 50px;
  z-index: 4;
  position: absolute;
  align-items: center;
  box-sizing: border-box;
  justify-content: flex-start;
  bottom: 0;
  h3 {
    margin-top: 0px;
    margin-bottom: 10px;
  }
`;
export const ProsHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
export const TabContent = styled.div`
  position: relative;
  padding: 20px 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const ServerProsItem = styled.div`
  border: 1px solid #6d41ea;
  box-shadow: 5px 1px 14px 4px rgba(82, 0, 255, 0.2);
  border-radius: 7px;
  padding: 5px 10px;
  height: 20px;
  font-family: Raleway;
  font-size: 16px;
  margin-right: 5px;
  margin-bottom: 5px;
  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  font-weight: 600;
  align-items: center;
  display: flex;
`;

export const StyledButton = styled(Button)`
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  padding: 12px 40px;
`;
