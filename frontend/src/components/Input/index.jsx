import { useState } from "react";
import { useStateProps } from "../../hooks/useStateProps";
import { translation } from "../../translations";
import { Label, InputBase, InputBackground, ErrorLabel, RequiredStar } from "./style";

export const Input = ({label, value = "", error, onChange, isRequried, type, viewType}) => {
    const [inputValue, setValue] = useState(value);
    const [errorState, setError] = useStateProps(error);
    const onChangeHandler = (event) => {
        if(isRequried){
            if(!event.target.value){
                setError(translation.t("product.modal.errors.field_isRequired"));
            } else {
                setError("");
            }
        }
        setValue(event.target.value);
        onChange?.(event);
    }

    return <InputBackground > 
    <InputBase onChange={(e) => onChangeHandler(e)} value={inputValue} type={type} error={errorState}/>
    {label && <Label activated={inputValue !== ""}>
            {label} {isRequried && <RequiredStar>*</RequiredStar>}
        </Label>}
     {errorState && <ErrorLabel> {errorState}</ErrorLabel>}
    </InputBackground>
};