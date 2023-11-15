/* eslint-disable react-hooks/exhaustive-deps */

import { Background, CategoryHolder, HoverBracket, ActiveBracket, StyledCategoryItem, Preloader } from "./style";
import { useState, useEffect } from "react";
import { useStateProps } from "../../hooks/useStateProps";


export const SegmentedSelector = ({items, onChange, value, isLoading}) =>{
    const [interact,setInteract] = useState(false);
    const [hover,setPosition] = useState({});
    const [activePosition,setActivePosition] = useState({});
    const [elements,setElements] = useState([]);
    const setHoverPositionHandler = (event) =>{
        setPosition({left: event.target.offsetLeft, width: event.target.getBoundingClientRect().width});
    }
    const [selectedValue, setSelection] = useStateProps(value);
    const setElementsHandler = (elem) => {
        if(elem && !elements.includes(elem)){
            setElements([elem,...elements]);
        }
    };


    useEffect(() => {
        const index = elements.findIndex((el) => el.dataset.value === selectedValue);
            if(elements[index]){
                setActivePosition({
                    left: elements[index].offsetLeft,
                    top: elements[index].offsetTop,
                    height: elements[index].getBoundingClientRect().height,
                    width: elements[index].getBoundingClientRect().width,

                });
                if(value !== selectedValue){
                    onChange?.(selectedValue);
                }
             }
      }, [elements,selectedValue]);

      if(!elements && elements.length <= 0){
        return null;
      }
      if(isLoading){
        return(<Preloader></Preloader>);
      }
        return(
            <CategoryHolder>
                <Background onMouseLeave={() => setInteract(false)} onMouseEnter={() => setInteract(true)} >
                    <HoverBracket position={hover.left} width={hover.width} interact={interact}/>
                    <ActiveBracket position={activePosition}/>
                     {items?.map((el) => {
                        const el_value = el.subcat_id ? el.subcat_id: el.Category_id;
                            return (<StyledCategoryItem
                            key={el_value}
                            ref={(elem) => setElementsHandler(elem)}
                            data-value={el_value}
                            className={selectedValue === el_value ? "active" : ""}
                            onMouseOver={(e)=> setHoverPositionHandler(e)}
                            onClick={() => setSelection(el_value)}>
                                {el.name}
                            </StyledCategoryItem>
                            )})}
                </Background>
            </CategoryHolder>
            );
};
