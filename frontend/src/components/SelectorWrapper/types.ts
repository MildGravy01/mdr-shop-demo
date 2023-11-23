import { ReactNode } from "react";

export interface ISelectorWrapperProps {
    value: string,
    onSelect: (value: string) => void,
    children: JSX.Element[]
}