import TechBadge from "@/components/TechBadge";
import { ContentStackGroup } from "@/types/content";

export type ContentStackProps = {
  groups: ContentStackGroup[];
};

const ContentStack = ({ groups }: ContentStackProps) => (
  <dl className="flex flex-col gap-6">
    {groups.map((group) => (
      <div key={group.group} className="grid gap-3 sm:grid-cols-[10rem_1fr]">
        <dt className="pt-1 text-sm font-medium">{group.group}</dt>
        <dd className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <TechBadge key={item.icon} {...item} />
          ))}
        </dd>
      </div>
    ))}
  </dl>
);

export default ContentStack;
