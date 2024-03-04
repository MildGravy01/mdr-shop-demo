/* eslint-disable max-len */
import {
  StyledFooter,
  StyledHeader,
  StyledLogo,
  StyledMenuButton,
  StyledMenuButtonDiscord,
  StyledMenuButtonVk,
} from './styles';
import { faVk, faDiscord } from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {translation} from '../../translations';
import {NavLink as Link} from 'react-router-dom';
import Logo from 'img/Logo.svg?url';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { PlayerCounter } from '../PlayerCounter';
export const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo width={182} height={40} src={Logo} onClick={() => redirect('/')}/>
      <nav>
        <ul>
          <li>
            <Link to="/about">
              <StyledMenuButton>
                {translation.t('menu.server').toUpperCase()}
              </StyledMenuButton>{' '}
            </Link>
          </li>
          <li>
            <Link to="/">
              <StyledMenuButton>
                {translation.t('menu.shop').toUpperCase()}
              </StyledMenuButton>
            </Link>
          </li>
          <li>
            <Link to="/rules">
              <StyledMenuButton>
                {translation.t('menu.rules').toUpperCase()}
              </StyledMenuButton>
            </Link>
          </li>
          <li>
            <StyledMenuButton
              onClick={() => redirect('https://pun.md-resorts.ru')}
            >
              {translation.t('menu.bans').toUpperCase()}
            </StyledMenuButton>
          </li>
          <li>
            <StyledMenuButtonDiscord
              onClick={() => redirect('https://discord.com/invite/vVbYGcNMj8')}
            >
              <FontAwesomeIcon icon={faDiscord} />{' '}
              {translation.t('menu.discord').toUpperCase()}
            </StyledMenuButtonDiscord>
          </li>
          <li>
            <StyledMenuButtonVk
              onClick={() => redirect('https://vk.com/mdrserver')}
            >
              <FontAwesomeIcon icon={faVk} />{' '}
              {translation.t('menu.vk').toUpperCase()}
            </StyledMenuButtonVk>
          </li>
          <li>
            <PlayerCounter />
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};
const redirect = (url: string) => {
  window.location.href = url;
};
export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <div>{translation.t('footer.rights')}.</div>
        <div>Сайт является частью MDRNetwork.</div>
        <div>Все права защищены.</div>
        <div>©️ MDR {new Date().getFullYear()}.</div>
      </div>
      <div>
        <div className='terms'><a href="/terms">Информация и Политика использования</a></div>
        <div className='terms'><a href="/publicOffer">Договор-оферта</a></div>
        <div><a><FontAwesomeIcon icon={faEnvelope} className='icon'/>{`${translation.t("terms.email")}`}</a></div>
        <div><FontAwesomeIcon icon={faVk} width={15} height={15} className='icon'/><a href="https://vk.com/mdrserver">Группа</a></div>
        <div><FontAwesomeIcon icon={faDiscord} width={15} height={15} className='icon'/><a href="https://discord.com/invite/vVbYGcNMj8">Discord</a></div>
      </div>

    </StyledFooter>
  );
};
