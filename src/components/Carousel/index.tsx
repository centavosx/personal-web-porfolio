"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import "./embla.css";
import { useControls } from "./hooks/useControls";
import { CarouselControl } from "./CarouselControls";
import Text from "../Text";

const TWEEN_SCALE_FACTOR_BASE = 0.4;
const TWEEN_OVERLAY_OPACITY_FACTOR_BASE = 0.7;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useControls(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    let tweenFactor = {
      scale: 0,
      overlayOpacity: 0,
    };
    let tweenNodes: {
      scale: HTMLElement[];
      overlay: HTMLElement[];
    } = {
      scale: [],
      overlay: [],
    };

    const initializeTweenNodes = (emblaApi: EmblaCarouselType): void => {
      const scaleElements: HTMLElement[] = [];
      const parallaxElements: HTMLElement[] = [];
      const overlayElements: HTMLElement[] = [];

      emblaApi.slideNodes().forEach((slideNode) => {
        scaleElements.push(
          slideNode.querySelector(".embla__slide__number") as HTMLElement
        );
        parallaxElements.push(
          slideNode.querySelector(".embla__parallax__layer") as HTMLElement
        );
        overlayElements.push(
          slideNode.querySelector(".embla__slide__overlay") as HTMLElement
        );
      });

      tweenNodes = {
        scale: scaleElements,
        overlay: overlayElements,
      };
    };

    const calculateTweenFactors = (emblaApi: EmblaCarouselType) => {
      const size = emblaApi.scrollSnapList().length;
      tweenFactor = {
        scale: TWEEN_SCALE_FACTOR_BASE * size,
        overlayOpacity: TWEEN_OVERLAY_OPACITY_FACTOR_BASE * size,
      };
    };

    const updateTweens = (
      emblaApi: EmblaCarouselType,
      eventName?: EmblaEventType
    ) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenScaleValue =
            1 - Math.abs(diffToTarget * tweenFactor.scale);

          const tweenOverlayOpacityValue = Math.abs(
            diffToTarget * tweenFactor.overlayOpacity
          );

          const scale = numberWithinRange(tweenScaleValue, 0, 1);
          const overlayOpacity = numberWithinRange(
            tweenOverlayOpacityValue,
            0,
            1
          );

          const tweenScaleNode = tweenNodes.scale[slideIndex];
          const tweenOverlayNode = tweenNodes.overlay[slideIndex];

          tweenScaleNode.style.transform = `scale(${scale})`;
          tweenOverlayNode.style.opacity = `${overlayOpacity}`;
        });
      });
    };

    initializeTweenNodes(emblaApi);
    calculateTweenFactors(emblaApi);
    updateTweens(emblaApi);

    emblaApi
      .on("reInit", initializeTweenNodes)
      .on("reInit", calculateTweenFactors)
      .on("reInit", updateTweens)
      .on("scroll", updateTweens)
      .on("slideFocus", updateTweens);
  }, [emblaApi]);

  const handleOnPressToScroll = useCallback(
    (index: number) => () => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="embla relative">
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container flex touch-pan-y touch-pinch-zoom relative">
          {slides.map((value, index) => (
            <div className={`embla__slide relative`} key={index}>
              <div
                className="embla__slide__number embla__parallax flex overflow-hidden rounded-xl h-[var(--slide-height)] items-center justify-center shadow-lg relative cursor-pointer scale-[3] transform group"
                onClick={handleOnPressToScroll(index)}
              >
                <Text
                  className="top-4 absolute z-[99] left-4 font-bold font-montserrat tracking-widest"
                  size="md"
                >
                  MECAPITAL
                </Text>
                <Text
                  className="bottom-4 absolute z-[99] right-4 font-bold font-montserrat tracking-widest transition-all opacity-0 group-hover:opacity-100 duration-1000"
                  size="sm"
                >
                  View
                </Text>
                <div className="embla__parallax__layer h-full w-full rounded-xl relative overflow-hidden">
                  <div className="h-full w-full group-hover:scale-[1.15] transition-all duration-700 after:h-full after:w-full after:[z-99] after:bg-[rgba(0,0,0,0.4)] group-hover:after:bg-[rgba(0,0,0,0.6)] after:absolute after:top-0 after:transition-all after:duration-1000">
                    {value}
                  </div>
                </div>
                <div className="embla__slide__overlay w-full h-full z-10 absolute bg-black top-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselControl
        onNextClick={onNextButtonClick}
        onPrevClick={onPrevButtonClick}
        disableNext={nextBtnDisabled}
        disablePrev={prevBtnDisabled}
      />
    </div>
  );
};

export default EmblaCarousel;
