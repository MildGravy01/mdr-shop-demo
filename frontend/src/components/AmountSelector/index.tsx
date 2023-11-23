import {useState} from 'react';
import {Background, SelectorButton, SelectorInput} from './styles';

export const AmountSelector = ({onChange} : {onChange: (value: number) => void}) => {
  const [value, setValue] = useState(1);

  const changeHandler = (value: number) => {
    if (Number(value)) {
      if (value >= 1) {
        setValue(value);
      } else {
        setValue(1);
      }
    } else {
      setValue(1);
    }
    onChange?.(value);
  };

  return (
    <Background>
      <SelectorButton onClick={() => value > 1 && changeHandler(+value - 1)}>
        -
      </SelectorButton>
      <SelectorInput
        value={value}
        type={'number'}
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={(e) => changeHandler(Number(e.target.value))}
      ></SelectorInput>
      <SelectorButton onClick={() => changeHandler(+value + 1)}>
        +
      </SelectorButton>
    </Background>
  );
};
