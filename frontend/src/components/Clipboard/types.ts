import { ReactNode } from "react";
import { TTooltipPosition } from "../Tooltip/types";

export interface IClipboardProps {
    children: JSX.Element,
    textToCopy: string,
    tooltipPosition: TTooltipPosition
}
