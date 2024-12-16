import React, { ComponentPropsWithRef } from "react";
import ArrowNextIcon from "../../../public/svg/arrow-next.svg";
import ArrowPrevIcon from "../../../public/svg/arrow-prev.svg";

type PropType = ComponentPropsWithRef<"button"> & {
  isPrev?: boolean;
};

export const ControlButton = (props: PropType) => {
  const { children, isPrev, ...restProps } = props;

  return (
    <button
      className="embla__button appearance-none touch-manipulation cursor-pointer shadow-md hover:scale-125 active:scale-100 duration-300"
      type="button"
      {...restProps}
    >
      {isPrev ? (
        <ArrowPrevIcon className="fill-secondary h-8 w-8 first:fill-secondary" />
      ) : (
        <ArrowNextIcon className="fill-secondary h-8 w-8 first:fill-secondary" />
      )}
      {children}
    </button>
  );
};

export type CarouselControlProps = {
  onPrevClick: () => void;
  onNextClick: () => void;
  disableNext?: boolean;
  disablePrev?: boolean;
};
export const CarouselControl = ({
  onPrevClick,
  onNextClick,
  disableNext,
  disablePrev,
}: CarouselControlProps) => {
  return (
    <div className="flex gap-4 items-center mt-6 px-10 xsm:px0 justify-end xsm:justify-start">
      <ControlButton isPrev onClick={onPrevClick} disabled={disablePrev} />
      <ControlButton onClick={onNextClick} disabled={disableNext} />
    </div>
  );
};
