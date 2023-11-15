import { useState } from "react";
import { Background, SelectorButton, SelectorInput } from "./style";

export const QuantitySelector = ({onChange}) => {

    const [value,setValue] = useState(1);

    const changeHandler = (value) => {
        if(Number(value)) {
            if(value >= 1){
                setValue(value);
            } else{
                setValue(1);
            }
        }
        else{
            setValue(1);
        }
        onChange?.(value);
    }

return (
        <Background>
            <SelectorButton onClick={() => value > 1 && changeHandler(+value-1)}>-</SelectorButton>
                <SelectorInput value={value} type={"number"} onChange={(e) => setValue(e.target.value)} onBlur={(e) => changeHandler(e.target.value)}></SelectorInput>
            <SelectorButton onClick={() => changeHandler(+value+1)}>+</SelectorButton>
        </Background>
);
};