"use client";

import { saveContent } from "@/actions/content";
import FormField from "@/components/admin/FormField";
import ImageField from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useAdminAction from "@/hooks/useAdminAction";
import { ContentFormValues, contentSchema, toContentFormValues } from "@/schemas/admin";
import { Content } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import SectionsEditor from "./SectionsEditor";

const NO_STATUS = "none";

const statusOptions = [
  { value: NO_STATUS, label: "Not shown" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "In progress" },
  { value: "hold", label: "On hold" },
  { value: "dropped", label: "Dropped" },
];

const paths = {
  project: { admin: "/admin/projects", label: "project" },
  "work-experience": { admin: "/admin/experience", label: "experience" },
};

export type ContentEditorProps = {
  type: NonNullable<Content["type"]>;
  content?: Content;
};

const ContentEditor = ({ type, content }: ContentEditorProps) => {
  const router = useRouter();
  const { isPending, run } = useAdminAction();
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: toContentFormValues(content),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { admin, label } = paths[type];

  const onSubmit = (values: ContentFormValues) =>
    run(async () => {
      const result = await saveContent(content?.id ?? null, type, values);
      if (!result.error && !content && result.id) router.push(`${admin}/${result.id}`);
      return result;
    }, "Saved. Your site is updated.");

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, () => toast.error("Some fields need attention."))}
        className="flex flex-col gap-6"
      >
        <div className="sticky top-[6.75rem] z-30 flex items-center justify-between gap-2 rounded-lg border bg-background/90 p-2 backdrop-blur">
          <Button variant="ghost" size="sm" asChild>
            <Link href={admin}>
              <ArrowLeft />
              Back
            </Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : content ? "Save changes" : `Create ${label}`}
          </Button>
        </div>

        <Card>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" htmlFor="content-name" error={errors.name?.message}>
              <Input id="content-name" {...register("name")} />
            </FormField>
            <FormField label="Role" htmlFor="content-role" error={errors.role?.message}>
              <Input id="content-role" {...register("role")} />
            </FormField>
            <FormField label="Date" htmlFor="content-date" error={errors.date?.message} hint="For example, 2023 - 2024">
              <Input id="content-date" {...register("date")} />
            </FormField>
            {type === "project" && (
              <FormField label="Status" error={errors.status?.message}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      value={field.value || NO_STATUS}
                      onValueChange={(value) => field.onChange(value === NO_STATUS ? "" : value)}
                    >
                      <SelectTrigger className="w-full" aria-label="Status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            )}
            {type === "project" ? (
              <FormField
                label="Preview image"
                htmlFor="content-featured"
                error={errors.featured_image_url?.message}
                hint="Needed for the project to appear on the home page."
              >
                <Controller
                  control={control}
                  name="featured_image_url"
                  render={({ field }) => (
                    <ImageField id="content-featured" value={field.value} onChange={field.onChange} />
                  )}
                />
              </FormField>
            ) : (
              <FormField label="Logo" htmlFor="content-logo" error={errors.icon_url?.message}>
                <Controller
                  control={control}
                  name="icon_url"
                  render={({ field }) => <ImageField id="content-logo" value={field.value} onChange={field.onChange} />}
                />
              </FormField>
            )}
            <div className="sm:col-span-2">
              <FormField
                label="Overview"
                htmlFor="content-description"
                error={errors.description?.message}
                hint="Separate paragraphs with a blank line. The first paragraph appears on project cards."
              >
                <Textarea id="content-description" rows={6} {...register("description")} />
              </FormField>
            </div>
            <Controller
              control={control}
              name="is_featured"
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  Show on the home page
                </label>
              )}
            />
          </CardContent>
        </Card>

        <SectionsEditor />
      </form>
    </FormProvider>
  );
};

export default ContentEditor;
