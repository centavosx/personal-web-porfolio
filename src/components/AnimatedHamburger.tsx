import { extendClassByProp } from "@/utils/extendClassByProp";

const lineClasses = {
  0: "rotate-45 block top-[50%] left-2 absolute w-[calc(100%-0.55em)]",
  1: "hidden",
  2: "-rotate-45 block top-[50%] left-2 absolute w-[calc(100%-0.55em)]",
} as Record<number, string>;

export type AnimatedHamburgerProps = {
  className?: string;
  isOpen: boolean;
  onClick?: () => void;
  variant?: "left" | "right";
};
export const AnimatedHamburger = ({
  isOpen,
  variant = "right",
  onClick,
  ...rest
}: AnimatedHamburgerProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="nav hamburger button"
      {...extendClassByProp(
        rest || {},
        "border-0 bg-transparent h-10 w-10 p-1 gap-2 flex md:hidden flex-col relative left-4 justify-center items-center transition-all duration-100 cursor-pointer z-[99]",
        isOpen ? (variant === "right" ? "-rotate-180" : "rotate-180") : ""
      )}
    >
      <Lines multiply={3} isOpen={isOpen} />
    </button>
  );
};

const Lines = ({
  isOpen,
  multiply = 1,
}: {
  isOpen?: boolean;
  multiply?: number;
}) =>
  Array(multiply)
    .fill(null)
    .map((_, index) => {
      return (
        <div
          key={`line_${index}`}
          className={`h-[2px] bg-primary dark:bg-secondary transition-transform duration-300 ${
            isOpen ? lineClasses[index] : "w-full"
          } `}
        />
      );
    });
