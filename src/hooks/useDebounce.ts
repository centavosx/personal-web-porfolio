import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const useDebounce = <T extends unknown>(value: T, delay = 100) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setState(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return state;
};

export default useDebounce;
