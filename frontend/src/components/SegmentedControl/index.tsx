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
import { useWindowResize } from '../../hooks/useWindowResize';
import { IPosition, ISegmentedControlProps } from './types';


export const SegmentedControl = ({items, onChange, value, isLoading, className} : ISegmentedControlProps ) => {
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
  const [selectedValue, setSelection] = useStateProps(value??items[0]?.value);
  const size = useWindowResize();
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

  useEffect(() => {
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
  }
}, [size]);

  if (!elements) {
    return null;
  }
  if (isLoading) {
    return <Preloader/>;
  }
  return (
    <CategoryHolder className={className}>
      <Background
        onMouseLeave={() => setInteract(false)}
        onMouseEnter={() => setInteract(true)}
        className='segmentedControlBackground'
      >
        <HoverBracket
          position={hover}
          width={hover?.width}
        />
        <ActiveBracket position={activePosition} className='activeBracket'/>
        {items?.map((el) => {
          return (
            <StyledCategoryItem
              key={el.label}
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
