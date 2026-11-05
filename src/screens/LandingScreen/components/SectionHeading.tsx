export type SectionHeadingProps = {
  title: string;
  description: string;
};

const SectionHeading = ({ title, description }: SectionHeadingProps) => (
  <div className="flex max-w-2xl flex-col gap-2">
    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    <p className="text-lg text-muted-foreground">{description}</p>
  </div>
);

export default SectionHeading;
