import styled from "styled-components";

export const PlayerCounterWrapper = styled.div<{}>`
.mn-srv-btn {
        height: 40px;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -moz-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #4541EA;
        border-radius: 6px;
        font-family: Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
          Arial, sans-serif;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-decoration: none;
        margin: 0;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        border: 0;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      .mn-srv-btn > .mn-srv-btn__icon {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 48px;
        height: 40px;
      }
      .mn-srv-btn > .mn-srv-btn__text {
        padding: 0 16px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.43;
        color: #fff;
      }
      .mn-srv-btn.mn-srv-btn--uppercase > .mn-srv-btn__text {
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__text > span {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.29;
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__text > p {
        font-size: 12px;
        line-height: 1.33;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__icon {
        background-color: rgba(255, 255, 255, 0.16);
        border-radius: 5px 0px 0px 5px;
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__icon > span {
        border: 5px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        width: 25px;
        height: 25px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        position: relative;
        z-index: 1;
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__icon > span > span {
        width: 16px;
        min-width: 16px;
        height: 16px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        border-radius: 50%;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-transform: translate(0.5px, 0.5px);
        -moz-transform: translate(0.5px, 0.5px);
        -ms-transform: translate(0.5px, 0.5px);
        -o-transform: translate(0.5px, 0.5px);
        transform: translate(0.5px, 0.5px);
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__icon > span > svg {
        width: 33px;
        height: 33px;
        min-width: 33px;
        position: absolute;
        z-index: 1;
        left: -4px;
        top: -4px;
      }
      .mn-srv-btn.mn-srv-btn--online > .mn-srv-btn__icon > span > svg > path {
        -webkit-animation: 1s ease-out forwards progress;
        -moz-animation: 1s ease-out forwards progress;
        animation: 1s ease-out forwards progress;
      }
      .mn-srv-btn.mn-srv-btn--small {
        height: 20px;
      }
      .mn-srv-btn.mn-srv-btn--small > .mn-srv-btn__icon {
        width: 20px;
        height: 20px;
      }
      .mn-srv-btn > .mn-srv-btn__icon > svg {
        width: 24px;
        height: 24px;
      }
      .mn-srv-btn.mn-srv-btn--small > .mn-srv-btn__icon > svg {
        width: 16px;
        height: 16px;
      }
      @-webkit-keyframes progress {
        0% {
          stroke-dasharray: 0 100;
        }
      }
      @-moz-keyframes progress {
        0% {
          stroke-dasharray: 0 100;
        }
      }
      @keyframes progress {
        0% {
          stroke-dasharray: 0 100;
        }
      }
`;