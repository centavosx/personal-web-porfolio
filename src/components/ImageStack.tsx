"use client";

import { extendClassByProp } from "@/utils/extendClassByProp";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type ImageStackProps = {
  srcs: string[];
  height: number;
  width: number;
};
const ImageStack = ({ srcs, height, width }: ImageStackProps) => {
  const intervalIdRef = useRef<NodeJS.Timeout>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const imageEls = useRef<HTMLDivElement[]>([]);
  const orderedEls = useRef<HTMLDivElement[]>([]);

  const handleChangeIndex = useCallback((index: number) => {
    const currentElements = imageEls.current;
    const currentOrderedEls = orderedEls.current;

    const lastIndex = currentElements.length - 1;
    const firstEl = currentOrderedEls[0];

    if (index > lastIndex || !firstEl) return;

    const selectedEl = currentElements[index];

    const selectedElClasses = selectedEl.className;

    const firstElClasses = firstEl.className;
    const lastElClasses = currentOrderedEls[lastIndex].className;

    const currentIndexInOrdered = currentOrderedEls.findIndex((value) =>
      value.isSameNode(selectedEl)
    );

    if (currentIndexInOrdered < 1) return;

    let iterator = currentIndexInOrdered + 1;

    let tempClasses = selectedElClasses;
    let nextEl = currentOrderedEls[iterator];

    while (nextEl) {
      orderedEls.current[iterator - 1] = nextEl;

      const currentClass = nextEl.className;
      nextEl.className = tempClasses;
      tempClasses = currentClass;

      nextEl = currentOrderedEls[++iterator];
    }

    selectedEl.className = firstElClasses;
    orderedEls.current[0] = selectedEl;

    firstEl.className = lastElClasses;
    orderedEls.current[currentElements.length - 1] = firstEl;
  }, []);

  const startImageLoop = useCallback(() => {
    if (intervalIdRef.current !== null) clearInterval(intervalIdRef.current);
    const currentOrderedEls = orderedEls.current;

    if (currentOrderedEls.length < 1) return;

    intervalIdRef.current = setInterval(() => {
      const index = imageEls.current.findIndex((value) =>
        value.isSameNode(currentOrderedEls[1])
      );
      handleChangeIndex(index);
    }, 4000);
  }, [handleChangeIndex]);

  const handleClick = (index: number) => () => {
    startImageLoop();
    handleChangeIndex(index);
  };

  useEffect(() => {
    orderedEls.current = [...imageEls.current];
    startImageLoop();
  }, [srcs, startImageLoop]);

  return (
    <div ref={divRef} className="relative transition-all">
      {srcs.map((src, index) => (
        <div
          ref={(r) => {
            if (!r) return;
            imageEls.current[index] = r;
          }}
          key={`img_container_${index}`}
          {...extendClassByProp(
            {},
            "rounded-md",
            index === 0 ? "relative" : "absolute",
            "transform transition-all top-0 left-0",
            `z-[${srcs.length - 1 - index}]`,
            `translate-x-[${index * 10}px]`,
            `-translate-y-[${index * 10}px]`,
            `hover:-translate-y-[${index * 25}px]`,
            "after:top-0 after:absolute after:rounded-md after:h-full after:w-full transition-all duration-300"
          )}
          onClick={handleClick(index)}
          onMouseEnter={() => {
            if (intervalIdRef.current !== null)
              clearInterval(intervalIdRef.current);
          }}
          onMouseLeave={startImageLoop}
        >
          <Image
            className="rounded-md border-2 border-primary"
            id={`${index}`}
            src={src}
            alt="image"
            height={height}
            width={width}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageStack;
