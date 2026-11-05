"use client";

import FormField from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentFormValues } from "@/schemas/admin";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import GalleryEditor from "./GalleryEditor";
import StackEditor from "./StackEditor";

const SectionsEditor = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ContentFormValues>();
  const { fields, append, remove, move } = useFieldArray({ control, name: "sections" });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Sections</h2>
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ title: "", body: "", gallery: [], stack: [] })}
        >
          <Plus />
          Add section
        </Button>
      </div>

      {!fields.length && <p className="text-muted-foreground">No sections yet. Add one to build out this page.</p>}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">Section {index + 1}</CardTitle>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Move section ${index + 1} up`}
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Move section ${index + 1} down`}
                disabled={index === fields.length - 1}
                onClick={() => move(index, index + 1)}
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove section ${index + 1}`}
                onClick={() => remove(index)}
              >
                <Trash2 />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              label="Title"
              htmlFor={`section-${index}-title`}
              error={errors.sections?.[index]?.title?.message}
            >
              <Input id={`section-${index}-title`} {...register(`sections.${index}.title`)} />
            </FormField>
            <FormField
              label="Text"
              htmlFor={`section-${index}-body`}
              hint="Markdown: **bold**, - lists, 1. numbered lists."
            >
              <Textarea id={`section-${index}-body`} rows={6} {...register(`sections.${index}.body`)} />
            </FormField>
            <GalleryEditor sectionIndex={index} />
            <StackEditor sectionIndex={index} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SectionsEditor;
