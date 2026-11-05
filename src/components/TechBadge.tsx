import { Badge } from "@/components/ui/badge";
import { getContentImageUrl } from "@/utils/getImageFromExternal";
import Image from "next/image";

export type TechBadgeProps = {
  name: string;
  icon: string;
  href?: string | null;
};

const TechBadge = ({ name, icon, href }: TechBadgeProps) => {
  const content = (
    <>
      <span className="flex size-5 items-center justify-center rounded-sm bg-white p-0.5">
        <Image
          src={getContentImageUrl(icon)}
          width={16}
          height={16}
          alt=""
          className="size-4 object-contain"
        />
      </span>
      {name}
    </>
  );
  const className = "h-8 gap-2 px-2.5 text-sm font-normal";

  if (!href) {
    return (
      <Badge variant="outline" className={className}>
        {content}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={className} asChild>
      <a href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    </Badge>
  );
};

export default TechBadge;
