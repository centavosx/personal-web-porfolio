import { useCallback, useEffect, useRef } from "react";

export const useThrottle = <Params extends unknown[]>(
  callbackArg: (...params: Params) => void,
  msArg = 60
) => {
  const waitRef = useRef(false);
  const argumentsRef = useRef<Parameters<typeof useThrottle<Params>>>([
    callbackArg,
    msArg,
  ]);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const callbackRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    argumentsRef.current = [callbackArg, msArg];
  }, [callbackArg, msArg]);

  const throttleCallback = useCallback((...params: Params) => {
    const [callback, ms] = argumentsRef.current;
    if (callbackRef.current) {
      clearTimeout(callbackRef.current);
    }

    if (!waitRef.current) {
      callback(...params);
      waitRef.current = true;
      timeoutRef.current = setTimeout(() => {
        waitRef.current = false;
      }, ms);
      return;
    }

    callbackRef.current = setTimeout(() => {
      callback(...params);
    }, ms);
  }, []);

  // Cleans up when the component is destroyed.
  useEffect(() => {
    // Removes the timeout on cleanup
    return () => {
      waitRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (callbackRef.current) {
        clearTimeout(callbackRef.current);
      }
    };
  }, []);

  return throttleCallback;
};
