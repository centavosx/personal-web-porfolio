"use client";

import FormField from "@/components/admin/FormField";
import ImageField from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContentFormValues } from "@/schemas/admin";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

type StackGroupEditorProps = {
  sectionIndex: number;
  groupIndex: number;
  onRemove: () => void;
};

const StackGroupEditor = ({ sectionIndex, groupIndex, onRemove }: StackGroupEditorProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ContentFormValues>();
  const name = `sections.${sectionIndex}.stack.${groupIndex}` as const;
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.items` });
  const groupErrors = errors.sections?.[sectionIndex]?.stack?.[groupIndex];

  return (
    <div className="flex flex-col gap-3 rounded-md bg-muted/40 p-3">
      <FormField label="Group name" htmlFor={`${name}-group`} error={groupErrors?.group?.message} hint="For example, Frontend">
        <Input id={`${name}-group`} {...register(`${name}.group`)} />
      </FormField>

      {!!groupErrors?.items?.message && <p className="text-sm text-destructive">{groupErrors.items.message}</p>}

      {fields.map((field, index) => (
        <div key={field.id} className="grid items-start gap-2 sm:grid-cols-[1fr_1.5fr_1fr_auto]">
          <FormField label="Name" htmlFor={`${name}-${index}-name`} error={groupErrors?.items?.[index]?.name?.message}>
            <Input id={`${name}-${index}-name`} {...register(`${name}.items.${index}.name`)} />
          </FormField>
          <FormField label="Icon" htmlFor={`${name}-${index}-icon`} error={groupErrors?.items?.[index]?.icon?.message}>
            <Controller
              control={control}
              name={`${name}.items.${index}.icon`}
              render={({ field: icon }) => (
                <ImageField id={`${name}-${index}-icon`} value={icon.value} onChange={icon.onChange} />
              )}
            />
          </FormField>
          <FormField label="Link" htmlFor={`${name}-${index}-href`} error={groupErrors?.items?.[index]?.href?.message}>
            <Input id={`${name}-${index}-href`} placeholder="https://..." {...register(`${name}.items.${index}.href`)} />
          </FormField>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-6"
            aria-label={`Remove technology ${index + 1}`}
            onClick={() => remove(index)}
          >
            <Trash2 />
          </Button>
        </div>
      ))}

      <div className="flex items-center justify-between gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", icon: "", href: "" })}>
          <Plus />
          Add technology
        </Button>
        <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={onRemove}>
          <Trash2 />
          Remove group
        </Button>
      </div>
    </div>
  );
};

export type StackEditorProps = {
  sectionIndex: number;
};

const StackEditor = ({ sectionIndex }: StackEditorProps) => {
  const { control } = useFormContext<ContentFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: `sections.${sectionIndex}.stack` });

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">Technology groups</h3>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ group: "", items: [] })}>
          <Plus />
          Add group
        </Button>
      </div>

      {fields.map((field, index) => (
        <StackGroupEditor key={field.id} sectionIndex={sectionIndex} groupIndex={index} onRemove={() => remove(index)} />
      ))}
    </div>
  );
};

export default StackEditor;
