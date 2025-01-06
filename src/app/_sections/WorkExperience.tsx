"use client";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Text from "@/components/Text";
import { Content } from "@/types/supabase";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type WorkExperienceProps = {
  data: Content[];
};
const WorkExperience = ({ data }: WorkExperienceProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout>(undefined);
  const intervalIdRef = useRef<NodeJS.Timeout>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    id = "",
    icon_url = "",
    description = "",
    name = "",
  } = data[currentIndex] || {};

  const handleChangeItem = useCallback(
    (isPrev?: boolean) => {
      setIsChanging(true);

      if (timeoutIdRef.current !== undefined)
        clearTimeout(timeoutIdRef.current);

      sectionRef.current?.classList.add("animate-pulse-full");

      timeoutIdRef.current = setTimeout(() => {
        setCurrentIndex((currentIndex) => {
          const lastIndex = data.length - 1;
          if (isPrev) return currentIndex > 0 ? currentIndex - 1 : lastIndex;
          return currentIndex < lastIndex ? currentIndex + 1 : 0;
        });

        timeoutIdRef.current = setTimeout(() => {
          sectionRef.current?.classList.remove("animate-pulse-full");
          setIsChanging(false);
        }, 600);
      }, 400);
    },
    [data.length]
  );

  const handleRestartInterval = useCallback(() => {
    if (timeoutIdRef.current !== undefined)
      clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      handleChangeItem();
    }, 8000);
  }, [handleChangeItem]);

  const handleChangeIndex = (isPrev?: boolean) => () => {
    handleRestartInterval();
    handleChangeItem(isPrev);
  };

  useEffect(() => {
    handleRestartInterval();
    return () => {
      clearInterval(intervalIdRef.current);
      if (timeoutIdRef.current !== undefined)
        clearTimeout(timeoutIdRef.current);
    };
  }, [handleRestartInterval]);

  const shortDescription = (description || [])[0];

  return (
    <Section
      id="work-experience"
      ref={sectionRef}
      withPadding={false}
      isDark
      className={`px-10 relative overflow-hidden animate-once animate-ease-in-out`}
      title={name}
      titleContainerProps={{
        className: "pt-10",
      }}
    >
      {!!icon_url && (
        <Image
          className="scale-[4.5] absolute md:right-[8rem] top-[35%] opacity-20 -z-10 self-center"
          src={getImageUrlFromExternal(icon_url)}
          width={65}
          height={51}
          alt="company-logo"
        />
      )}
      <div className="pb-10 md:pr-[24rem] gap-6 flex flex-col">
        <Text className="font-light">{shortDescription}</Text>
        <div className="flex flex-col justify-between sm:flex-row gap-8">
          <Button
            className="w-20"
            variant="outlined"
            href={`/work-experience/${id}`}
          >
            More
          </Button>
          <div className="flex flex-row gap-2 sm:gap-4">
            <Button
              variant="transparent"
              onClick={handleChangeIndex(true)}
              disabled={isChanging}
            >
              Prev
            </Button>
            <Button
              variant="transparent"
              onClick={handleChangeIndex(false)}
              disabled={isChanging}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
