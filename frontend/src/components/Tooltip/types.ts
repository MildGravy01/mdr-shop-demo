import { ReactNode } from "react";

export interface ITooltipProps {
    position: TTooltipPosition, 
    text: string, 
    children: ReactNode, 
    background?: string
}

export type TTooltipPosition = 'top' | 'bottom' | 'left' | 'right';