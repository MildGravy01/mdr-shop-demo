export interface ISegmentedControlProps {
    items: ISegmentedControlItem[];
    onChange?: (newValue: string) => void;
    value?: string;
    isLoading?: boolean;
}

export interface ISegmentedControlItem {
    value: string;
    label: string;
}

export interface IPosition{
    left?: number;
    top?: number;
    height?: number;
    width?: number;
  }