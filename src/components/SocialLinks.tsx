import { Button } from "@/components/ui/button";
import { Link } from "@/types/supabase";
import { Mail } from "lucide-react";
import Image from "next/image";

const brandIcons: Record<string, string> = {
  github: "/svg/github.svg",
  linkedin: "/svg/linkedin.svg",
  codewars: "/svg/codewars.svg",
};

const labels: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  codewars: "Codewars",
  email: "Email",
};

export type SocialLinksProps = {
  links: Link[];
};

const SocialLinks = ({ links }: SocialLinksProps) => (
  <div className="flex flex-wrap items-center gap-2">
    {links.map((link) => {
      const icon = brandIcons[link.type];
      if (!icon && link.type !== "email") return null;
      const label = labels[link.type];

      return (
        <Button key={link.id} variant="outline" size="icon" aria-label={label} title={label} asChild>
          <a href={link.link} target={link.type === "email" ? undefined : "_blank"} rel="noreferrer">
            {icon ? <Image src={icon} width={16} height={16} alt="" className="dark:invert" /> : <Mail />}
          </a>
        </Button>
      );
    })}
  </div>
);

export default SocialLinks;
