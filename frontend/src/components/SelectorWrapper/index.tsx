import React, {useEffect} from 'react';
import {useState} from 'react';
import {Wrapper} from './styles';
import { ISelectorWrapperProps } from './types';

export const SelectorWrapper = ({value, onSelect, children}: ISelectorWrapperProps) => {
  const [selectedValue, setSelection] = useState<string>();
  useEffect(() => {
    setSelection(value);
  }, [value]);
  return (
    <Wrapper>
      {children?.map((child: React.ReactElement) => {
        const cloned = React.cloneElement(child, {
          onClick: () => {
            if (selectedValue !== child?.props['data-value']) {
              onSelect(child?.props['data-value']);
              setSelection(child?.props['data-value']);
            }
          },
          className:
            selectedValue === child?.props['data-value'] ? 'active' : '',
          // disabled: true
        });
        return cloned;
      })}
    </Wrapper>
  );
};
