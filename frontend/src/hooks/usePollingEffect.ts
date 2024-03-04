import {useEffect, useRef} from 'react';

export const  usePollingEffect = (
    asyncCallback: () => void,
    dependencies = [], {
       interval = 10000,
       onCleanUp = () => {}
    } = {}
 ) =>  {
    const timeoutIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
 
    useEffect(() => {
       let _stopped = false;
 
       const pollingCallback = async () => {
          try {
             await asyncCallback();
          } finally {
             timeoutIdRef.current = !_stopped ? setTimeout(pollingCallback, interval) : undefined;
          }
       };
 
       pollingCallback();
 
       // Clean up if dependencies change
       return () => {
          _stopped = true;
          clearTimeout(timeoutIdRef.current);
          onCleanUp();
       };
    }, [...dependencies, interval]);
 }

