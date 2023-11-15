import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translation } from "../../translations";
import { Holder, Status, StatusDot } from "./style";

export const OnlineStatus = ({
  children,
  online,
  showOnlineText = true,
  showStatus,
  showPlayers,
  showPlayersIcon = true,
  align = "center",
  players = 0,
  maxplayers = 0,
}) => {
  return (
    <Holder align={align}>
      {showOnlineText ? (
        showStatus && (
          <Status>
            <StatusDot online={online} />
            {showOnlineText &&
              (online
                ? translation.t("server.online")
                : translation.t("server.offline"))}
          </Status>
        )
      ) : (
        <StatusDot online={online} />
      )}
      {showPlayers && (
        <b>
          {showPlayersIcon && (
            <FontAwesomeIcon icon="fa-regular fa-user" width={12} height={12} />
          )}{" "}
          {`${players}/${maxplayers}`}
        </b>
        
      )}
      {children}
    </Holder>
  );
};
