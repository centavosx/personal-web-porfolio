import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

export type FormFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

const FormField = ({ label, htmlFor, error, hint, children }: FormFieldProps) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {!!hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
    {!!error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

export default FormField;
