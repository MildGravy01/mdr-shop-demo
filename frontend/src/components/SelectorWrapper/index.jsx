import React, { useEffect } from "react";
import { useState } from "react";
import { Wrapper } from "./style";

export const SelectorWrapper = ({value,onSelect,children}) => {
    const [selectedValue,setSelection] = useState();
    useEffect(()=> {
        setSelection(value);
    },[value]);
    return <Wrapper>
        {children.map((child) => {
            const cloned = React.cloneElement(child,{ 
                onClick: () => {
                    if(selectedValue !== child?.props['data-value']) {
                        onSelect(child?.props['data-value']);
                        setSelection(child?.props['data-value']);
                    } 
                    }, 
                className: (selectedValue === child?.props['data-value'] ? "active" : ""),
                // disabled: true
            });
            return cloned;
        })}
    </Wrapper>
};