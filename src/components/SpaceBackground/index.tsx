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

    let timeoutId: NodeJS.Timeout;

    const debouncedCreateStars = () => {
      space.pause();
      createStars();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        space.resume();
      }, 300);
    };

    const render = () => {
      space.moveAndDrawStars();
      animationFrameId = requestAnimationFrame(render);
    };

    createStars();
    render();

    window.addEventListener("resize", debouncedCreateStars);
    return () => {
      window.removeEventListener("resize", debouncedCreateStars);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return <div ref={ref} className="fixed h-full w-full m-0 p-0 xl"></div>;
};

export default SpaceBackground;
