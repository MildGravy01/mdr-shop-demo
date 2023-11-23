export interface IButtonProps {
    type?: TButtonType,
    children?: JSX.Element | string | number,
    onClick?: () => React.MouseEventHandler<HTMLButtonElement> | void,
    className?: string,
    isDisabled?: boolean,
}

export type TButtonType = 'primary' | 'secondary' | 'ghost' | 'link';