export interface IModalProps {
    isOpen?: boolean;
    closeHandler?: (isOpen?: boolean) => void;
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}