export interface IOnlineStatusProps {
    children?: JSX.Element | string;
    online?: boolean;
    showOnlineText?: boolean;
    showStatus?: boolean;
    showPlayers?: boolean;
    showPlayersIcon?: boolean;
    align?: TOnlineStatusAlign;
    players?: number;
    maxplayers?: number;
}

export type TOnlineStatusAlign = 'center' | 'start' | 'end' | 'flex-start';