import { useEffect, useRef } from "react";

export const useOnMouseMoveFollow = (
  movementSpeed: number,
  callback: (movementX: number, movementY: number) => void,
  maxOffset = 20
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let currentX = 0,
      currentY = 0;

    const listener = (e: globalThis.MouseEvent) => {
      if (currentX === 0) currentX = e.clientX;
      if (currentY === 0) currentY = e.clientY;

      let xDiff = e.clientX - currentX;
      currentX = e.clientX;
      let yDiff = e.clientY - currentY;
      currentY = e.clientY;

      if (Math.abs(xDiff) > maxOffset) {
        xDiff = xDiff < 0 ? -maxOffset : maxOffset;
      }

      if (Math.abs(yDiff) > maxOffset) {
        yDiff = yDiff < 0 ? -maxOffset : maxOffset;
      }

      const movementX = xDiff * movementSpeed;
      const movementY = yDiff * movementSpeed;

      callbackRef.current(movementX, movementY);
    };

    window.addEventListener("mousemove", listener);
    return () => {
      window.removeEventListener("mousemove", listener);
    };
  }, [movementSpeed, maxOffset]);
};
