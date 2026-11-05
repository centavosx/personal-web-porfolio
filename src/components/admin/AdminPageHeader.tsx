import { ReactNode } from "react";

export type AdminPageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

const AdminPageHeader = ({ title, description, action }: AdminPageHeaderProps) => (
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
    {action}
  </div>
);

export default AdminPageHeader;
