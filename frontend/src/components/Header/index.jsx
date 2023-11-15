import {
  StyledFooter,
  StyledHeader,
  StyledLogo,
  StyledMenuButton,
  StyledMenuButtonDiscord,
  StyledMenuButtonEmail,
  StyledMenuButtonVk,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translation } from "../../translations";
import { NavLink as Link } from "react-router-dom";
import { Clipboard } from "../Clipboard";
import HTMLReactParser from "html-react-parser";
import { sanitize } from "dompurify";
export const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo width={182} height={40} />
      <nav>
        <ul>
          <li>
            <Link to="/about">
              <StyledMenuButton>
                {translation.t("menu.server").toUpperCase()}
              </StyledMenuButton>{" "}
            </Link>
          </li>
          <li>
            <Link to="/">
              <StyledMenuButton>
                {translation.t("menu.shop").toUpperCase()}
              </StyledMenuButton>
            </Link>
          </li>
          <li>
            <Link to="/rules">
              <StyledMenuButton>
                {translation.t("menu.rules").toUpperCase()}
              </StyledMenuButton>
            </Link>
          </li>
          <li>
            <StyledMenuButton
              onClick={() => redirect("https://pun.md-resorts.ru")}
            >
              {translation.t("menu.bans").toUpperCase()}
            </StyledMenuButton>
          </li>
          <li>
            <StyledMenuButtonDiscord
              onClick={() => redirect("https://discord.com/invite/vVbYGcNMj8")}
            >
              <FontAwesomeIcon icon="fa-brands fa-discord" />{" "}
              {translation.t("menu.discord").toUpperCase()}
            </StyledMenuButtonDiscord>
          </li>
          <li>
            <StyledMenuButtonVk
              onClick={() => redirect("https://vk.com/mdrserver")}
            >
              <FontAwesomeIcon icon="fa-brands fa-vk" />{" "}
              {translation.t("menu.vk").toUpperCase()}
            </StyledMenuButtonVk>
          </li>
          <li>
            {HTMLReactParser(sanitize(`
            <a
              href="https://mineserv.top/mdrserver"
              target="_blank"
              rel="noopener noreferrer"
              data-project="1362"
              class="mn-srv-btn mn-srv-btn--online"
            >
              <span class="mn-srv-btn__icon">
                <span>
                  <svg viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#fff"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-dasharray="3, 100"
                    ></path>
                  </svg>
                  <span>3</span>
                </span>
              </span>
              <span class="mn-srv-btn__text">
                <span>MDR</span> <p>Игроков 3 из 100</p>
              </span>
            </a>
            <script src="https://mineserv.top/widgets.js"></script>`))}
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};
const redirect = (url) => {
  window.location.href = url;
};
export const Footer = () => {
  return (
    <StyledFooter>
      {`© ${new Date().getFullYear()} ${translation.t("footer.rights")} mg0`}
    </StyledFooter>
  );
};
