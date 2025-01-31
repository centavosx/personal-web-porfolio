import { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

const checkIdElementIsVisible = (id: string) => {
  const anchorId = id.replace("#", "");
  const element = document.getElementById(anchorId);
  if (!element) {
    return false;
  }

  const elementBox = element.getBoundingClientRect();

  const PERCENT_VISIBLE = 0.3;

  const calculatedVisible =
    (window.innerHeight || document.documentElement.clientHeight) *
    PERCENT_VISIBLE;

  const elementBottom = elementBox.bottom - calculatedVisible;
  const elementTop = elementBox.top - calculatedVisible;
  return (
    elementTop < 0 && elementBottom < elementBox.height && elementBottom > 0
  );
};

export type DetectActiveHashOptions = {
  pageUrl: string;
  linkHashes: string[];
  noDeadHashZonePercentage?: number;
};
export const useDetectActiveHash = ({
  pageUrl,
  linkHashes,
  noDeadHashZonePercentage = 0.2,
}: DetectActiveHashOptions) => {
  const [currentHash, setCurrentHash] = useState<string | null>(null);

  const handleScrollEventListener = useThrottle(() => {
    // syncs the current hash with the current visible section
    const updateHashState = () => {
      for (const targetHash of linkHashes) {
        if (checkIdElementIsVisible(targetHash)) {
          setCurrentHash(targetHash);
          return;
        }
      }
    };

    const NO_HASH_DEADZONE = window.innerHeight * noDeadHashZonePercentage;

    if (window.scrollY < NO_HASH_DEADZONE) {
      setCurrentHash(null);
      return;
    } else {
      updateHashState();
    }
  }, 30);

  useEffect(() => {
    setCurrentHash(window.location.hash);
    window.addEventListener?.("scroll", handleScrollEventListener);
    return () =>
      window.removeEventListener?.("scroll", handleScrollEventListener);
  }, [
    pageUrl,
    linkHashes,
    noDeadHashZonePercentage,
    handleScrollEventListener,
  ]);

  return currentHash;
};
