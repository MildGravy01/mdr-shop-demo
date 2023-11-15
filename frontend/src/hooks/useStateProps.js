import { useState,useEffect } from "react";

export function useStateProps(arg) {
    const [value, setValue] = useState(arg);
  
    useEffect(() => {
      setValue(arg);
    }, [arg]);
  
    return [value, setValue];
  }
  