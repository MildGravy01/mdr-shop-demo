export interface IInputProps {
    label?: string;
    value?: string;
    error?: string;
    onChange: (value: string) => void;
    isRequried?: boolean;
    type?: string,
    viewType?: string,
  }