import { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

const historyReplaceState = (
  ...args: Parameters<typeof history.replaceState>
) => {
  // It returns an error when replacing a state when manually inputting it in a location bar
  // ERROR: Cannot read properties of null (reading '__PRIVATE_NEXTJS_INTERNALS_TREE')
  try {
    const origin = window.location.origin;
    const href = window.location.href.replace(origin, "");
    let url = args[2];
    if (typeof url === "string") {
      url = url.replace(origin, "");
    }

    if (href === url) return;

    history.replaceState(...args);
  } catch {}
};

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
  noDeadHashZonePercentage = 0,
}: DetectActiveHashOptions) => {
  const [currentHash, setCurrentHash] = useState<string | null>(null);
  const debouncedHistoryReplaceState = useThrottle(historyReplaceState, 60);

  const handleScrollEventListener = useThrottle(() => {
    // syncs the current hash with the current visible section
    const updateHashState = () => {
      for (const targetHash of linkHashes) {
        if (checkIdElementIsVisible(targetHash)) {
          const [url] = window.location.toString().split("#");
          debouncedHistoryReplaceState(null, "", url + targetHash);
          setCurrentHash(targetHash);
          return;
        }
      }
    };

    const NO_HASH_DEADZONE = window.innerHeight * noDeadHashZonePercentage;

    if (window.scrollY < NO_HASH_DEADZONE) {
      if (!location.hash) {
        return;
      }
      setCurrentHash(null);
      debouncedHistoryReplaceState(null, "", pageUrl);
      return;
    } else {
      updateHashState();
    }
  });

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
