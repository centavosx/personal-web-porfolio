import ReactMarkdown from "react-markdown";

export type MarkdownProps = {
  children: string;
};

const Markdown = ({ children }: MarkdownProps) => (
  <div className="flex flex-col gap-4 leading-7 text-muted-foreground">
    <ReactMarkdown
      components={{
        strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
        ul: (props) => <ul className="ml-5 flex list-disc flex-col gap-2" {...props} />,
        ol: (props) => <ol className="ml-5 flex list-decimal flex-col gap-2" {...props} />,
        a: (props) => <a className="text-foreground underline underline-offset-4" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);

export default Markdown;
