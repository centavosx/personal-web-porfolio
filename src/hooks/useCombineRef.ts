import { Ref, useRef, RefObject } from "react";

const useCombineRef = <T extends unknown>(
  ...refs: (Ref<T> | RefObject<T> | undefined | null)[]
) => {
  const targetRef = useRef<T>(null);

  for (const ref of refs) {
    if (!ref) continue;
    if (typeof ref === "function") {
      ref(targetRef.current);
      continue;
    }
    ref.current = targetRef.current;
  }

  return targetRef;
};

export default useCombineRef;
