import {
  Background,
  CategoryHolder,
  HoverBracket,
  ActiveBracket,
  StyledCategoryItem,
  Preloader,
} from './styles';
import {useState, useEffect} from 'react';
import {useStateProps} from '../../hooks/useStateProps';
import { IPosition, ISegmentedControlProps } from './types';

export const SegmentedControl = ({items, onChange, value, isLoading} : ISegmentedControlProps) => {
  const [interact, setInteract] = useState(false);
  const [hover, setPosition] = useState<IPosition>({});
  const [activePosition, setActivePosition] = useState<IPosition>({});
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const setHoverPositionHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPosition({
      left: event.currentTarget.offsetLeft,
      width: event.currentTarget.getBoundingClientRect().width,
    } as IPosition);
  };
  const [selectedValue, setSelection] = useStateProps(value);
  const setElementsHandler = (elem: HTMLButtonElement | null) => {
    if (elements && elem && !elements?.includes(elem)) {
      setElements([elem, ...elements]);
    }
  };

  useEffect(() => {
    if(!elements){
      return;
    }
    const index = elements.findIndex(
        (el) => el.dataset.value === selectedValue,
    );
    if (elements[index]) {
      setActivePosition({
        left: elements[index].offsetLeft,
        top: elements[index].offsetTop,
        height: elements[index].getBoundingClientRect().height,
        width: elements[index].getBoundingClientRect().width,
      });
      if (value !== selectedValue) {
        onChange?.(selectedValue);
      }
    }
  }, [elements, selectedValue]);

  if (!elements) {
    return null;
  }
  if (isLoading) {
    return <Preloader></Preloader>;
  }
  return (
    <CategoryHolder>
      <Background
        onMouseLeave={() => setInteract(false)}
        onMouseEnter={() => setInteract(true)}
      >
        <HoverBracket
          position={hover}
          width={hover?.width}
          interact={interact}
        />
        <ActiveBracket position={activePosition} />
        {items?.map((el) => {
          return (
            <StyledCategoryItem
              key={el.value}
              ref={(elem) => setElementsHandler(elem)}
              data-value={el.value}
              className={selectedValue === el.value ? 'active' : ''}
              onMouseOver={(e) => setHoverPositionHandler(e)}
              onClick={() => setSelection(el.value)}
            >
              {el.label}
            </StyledCategoryItem>
          );
        })}
      </Background>
    </CategoryHolder>
  );
};
