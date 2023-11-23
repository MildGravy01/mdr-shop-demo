import React from 'react';
import {useState} from 'react';
import {translation} from '../../translations';
import {copyToClipboard} from '../../utils/Clipboard';
import {Tooltip} from '../Tooltip';
import { IClipboardProps } from './types';


export const Clipboard = ({children, textToCopy, tooltipPosition} : IClipboardProps) => {
  const [state, setCopy] = useState(false);
  const CopyHandler = (copy: string) => {
    setCopy(true);
    copyToClipboard(copy);
    if (!state) {
      setTimeout(() => {
        setCopy(false);
      }, 5000);
    }
  };
  const childrenArr = Array.isArray(children) ? children : [children];
  return (
    <Tooltip
      text={
        state ?
          translation.t('copyTooltip.copied') :
          translation.t('copyTooltip.pressToCopy')
      }
      position={tooltipPosition}
    >
      {childrenArr.map((child) => {
        const cloned = React.cloneElement(child as React.ReactElement, {
          onClick: () => {
            CopyHandler(textToCopy);
          },
          key: child.name,
        });
        return cloned;
      })}
    </Tooltip>
  );
};
