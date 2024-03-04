import { usePollingEffect } from "../../hooks/usePollingEffect";
import { PlayerCounterWrapper } from "./styles";
import API from "../../api";
import { useState } from "react";

export const PlayerCounter = () => {
  const [serverData, setData] = useState<any>();
  usePollingEffect(() =>
    API.get("/api/server/status", (response) => {
      setData(response.data?.bungee);
    }),[],{interval: 50000}
  );

  return (
    <PlayerCounterWrapper>
      <a
        href="https://mineserv.top/mdrserver"
        className="mn-srv-btn mn-srv-btn--online"
      >
        <span className="mn-srv-btn__icon">
          <span>
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-dasharray={`${serverData?.players?.online}, ${serverData?.players?.max}`}
              ></path>
            </svg>
            <span>{serverData?.players?.online}</span>
          </span>
        </span>
        <span className="mn-srv-btn__text">
          <span>MDR</span>{" "}
          <p>
            Игроков {serverData?.players?.online} из {serverData?.players?.max}
          </p>
        </span>
      </a>
    </PlayerCounterWrapper>
  );
};
