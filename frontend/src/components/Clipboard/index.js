import React from "react";
import { useState } from "react";
import { translation } from "../../translations";
import { copyToClipboard } from "../../utils/Clipboard";
import { Tooltip } from "../Tooltip";

export const Clipboard = ({ children, textToCopy, tooltipPosition }) => {
  const [state, setCopy] = useState(false);
  const CopyHandler = (copy) => {
    setCopy(true);
    copyToClipboard(copy);
    if (!state) {
      setTimeout(() => {
        setCopy(false);
      }, 5000);
    }
  };
  const childrenArr = Array.isArray(children) ? children : new Array(children);
  return (
    <Tooltip
      text={
        state
          ? translation.t("copyTooltip.copied")
          : translation.t("copyTooltip.pressToCopy")
      }
      position={tooltipPosition}
    >
      {childrenArr.map((child, index) => {
        const cloned = React.cloneElement(child, {
          onClick: () => {
            CopyHandler(textToCopy);
          },
          key: index,
        });
        return cloned;
      })}
    </Tooltip>
  );
};
