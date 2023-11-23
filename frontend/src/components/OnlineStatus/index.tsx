import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {translation} from '../../translations';
import {Holder, Status, StatusDot} from './styles';
import { IOnlineStatusProps } from './types';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export const OnlineStatus = ({
  children,
  online,
  showOnlineText = true,
  showStatus,
  showPlayers,
  showPlayersIcon = true,
  align = 'center',
  players = 0,
  maxplayers = 0,
}: IOnlineStatusProps) => {
  return (
    <Holder align={align}>
      {showOnlineText ? (
        showStatus && (
          <Status>
            <StatusDot online={online} />
            {showOnlineText &&
              (online ?
                translation.t('server.online') :
                translation.t('server.offline'))}
          </Status>
        )
      ) : (
        <StatusDot online={online} />
      )}
      {showPlayers && (
        <b>
          {showPlayersIcon && (
            <FontAwesomeIcon icon={faUser} width={12} height={12} />
          )}{' '}
          {`${players}/${maxplayers}`}
        </b>

      )}
      {children}
    </Holder>
  );
};
