"use client";

import FormField from "@/components/admin/FormField";
import ImageField from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContentFormValues } from "@/schemas/admin";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export type GalleryEditorProps = {
  sectionIndex: number;
};

const GalleryEditor = ({ sectionIndex }: GalleryEditorProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ContentFormValues>();
  const name = `sections.${sectionIndex}.gallery` as const;
  const { fields, append, remove } = useFieldArray({ control, name });
  const galleryErrors = errors.sections?.[sectionIndex]?.gallery;

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">Image galleries</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", body: "", images: [""], orientation: "landscape" })}
        >
          <Plus />
          Add gallery
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 rounded-md bg-muted/40 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField label="Title" htmlFor={`${name}-${index}-title`}>
              <Input id={`${name}-${index}-title`} {...register(`${name}.${index}.title`)} />
            </FormField>
            <FormField label="Image shape">
              <Controller
                control={control}
                name={`${name}.${index}.orientation`}
                render={({ field: orientation }) => (
                  <Select value={orientation.value} onValueChange={orientation.onChange}>
                    <SelectTrigger className="w-full" aria-label="Image shape">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landscape">Wide (web screenshots)</SelectItem>
                      <SelectItem value="portrait">Tall (phone screenshots)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>
          <FormField label="Caption" htmlFor={`${name}-${index}-body`}>
            <Textarea id={`${name}-${index}-body`} rows={2} {...register(`${name}.${index}.body`)} />
          </FormField>
          <Controller
            control={control}
            name={`${name}.${index}.images`}
            render={({ field: images }) => (
              <FormField
                label="Images"
                error={
                  galleryErrors?.[index]?.images?.message ??
                  galleryErrors?.[index]?.images?.find?.((item) => item?.message)?.message
                }
              >
                <div className="flex flex-col gap-2">
                  {images.value.map((image, imageIndex) => (
                    <div key={imageIndex} className="flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <ImageField
                          value={image}
                          onChange={(value) =>
                            images.onChange(images.value.map((item, i) => (i === imageIndex ? value : item)))
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove image ${imageIndex + 1}`}
                        onClick={() => images.onChange(images.value.filter((_, i) => i !== imageIndex))}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="self-start"
                    onClick={() => images.onChange([...images.value, ""])}
                  >
                    <Plus />
                    Add image
                  </Button>
                </div>
              </FormField>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="self-end text-destructive"
            onClick={() => remove(index)}
          >
            <Trash2 />
            Remove gallery
          </Button>
        </div>
      ))}
    </div>
  );
};

export default GalleryEditor;
