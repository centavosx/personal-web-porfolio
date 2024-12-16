"use client";

import { useEffect, useRef } from "react";
import { Space } from "./space";

const SpaceBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let animationFrameId: number;

    const canvas = document.createElement("canvas");
    ref.current.appendChild(canvas);

    const context = canvas.getContext("2d");

    if (!context) return;

    const space = new Space(context);

    const createStars = () => {
      if (!ref.current) return;

      const currentWidth = ref.current.clientWidth;
      const currentHeight = ref.current.clientHeight;

      canvas.width = currentWidth;
      canvas.height = currentHeight;

      space.generateStars(currentHeight, currentWidth);
    };

    const updateCursor = (e: MouseEvent) => {
      space.updateCursor(e.clientX, e.clientY);
    };

    let intervalId: NodeJS.Timeout;

    const updateDistance = (isIncrease?: boolean) => () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        if (isIncrease) {
          if (space.blackHoleRadiusMultiplier >= 2) {
            clearTimeout(intervalId);
            return;
          }
          space.increaseBlackHoleRadius();
          return;
        }

        if (space.blackHoleRadiusMultiplier <= 1) {
          clearTimeout(intervalId);
          return;
        }

        space.decreaseBlackHoleRadius();
      }, 300);
    };

    const render = () => {
      space.moveAndDrawStars();
      animationFrameId = requestAnimationFrame(render);
    };

    createStars();
    render();

    window.addEventListener("resize", createStars);
    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", updateDistance(true));
    window.addEventListener("mouseup", updateDistance(false));
    return () => {
      window.removeEventListener("resize", createStars);
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", updateDistance(true));
      window.removeEventListener("mouseup", updateDistance(false));
      cancelAnimationFrame(animationFrameId);
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return <div ref={ref} className="fixed h-full w-full m-0 p-0 xl"></div>;
};

export default SpaceBackground;
