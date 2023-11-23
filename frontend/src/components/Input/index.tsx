import {useState} from 'react';
import {useStateProps} from '../../hooks/useStateProps';
import {translation} from '../../translations';
import {
  Label,
  InputBase,
  InputBackground,
  ErrorLabel,
  RequiredStar,
} from './styles';
import { IInputProps } from './types';

export const Input = ({
  label,
  value = '',
  error,
  onChange,
  isRequried,
  type,
  viewType,
}: IInputProps) => {
  const [inputValue, setValue] = useState(value);
  const [errorState, setError] = useStateProps(error);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isRequried) {
      if (!event.target.value) {
        setError(translation.t('product.modal.errors.field_isRequired'));
      } else {
        setError('');
      }
    }
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <InputBackground>
      <InputBase
        onChange={(e) => onChangeHandler(e)}
        value={inputValue}
        type={type}
        error={errorState}
      />
      {label && (
        <Label activated={inputValue !== ''}>
          {label} {isRequried && <RequiredStar>*</RequiredStar>}
        </Label>
      )}
      {errorState && <ErrorLabel> {errorState}</ErrorLabel>}
    </InputBackground>
  );
};

