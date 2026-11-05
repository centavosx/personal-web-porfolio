"use client";

import { saveTechnology } from "@/actions/technologies";
import FormField from "@/components/admin/FormField";
import ImageField from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useAdminAction from "@/hooks/useAdminAction";
import { TechnologyFormValues, technologyCategories, technologySchema } from "@/schemas/admin";
import { Technology } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export type TechnologyDialogProps = {
  technology?: Technology;
};

const TechnologyDialog = ({ technology }: TechnologyDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, run } = useAdminAction();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      name: technology?.name ?? "",
      icon_url: technology?.icon_url ?? "",
      link: technology?.link ?? "",
      category: technology?.category ?? "language",
      is_core: technology?.is_core ?? true,
    },
  });

  const onSubmit = (values: TechnologyFormValues) =>
    run(() => saveTechnology(technology?.id ?? null, values), "Technology saved", () => {
      setIsOpen(false);
      if (!technology) reset();
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {technology ? (
          <Button variant="ghost" size="icon" aria-label={`Edit ${technology.name}`}>
            <Pencil />
          </Button>
        ) : (
          <Button>
            <Plus />
            Add technology
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{technology ? "Edit technology" : "Add technology"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Name" htmlFor="tech-name" error={errors.name?.message}>
            <Input id="tech-name" {...register("name")} />
          </FormField>
          <FormField label="Category" error={errors.category?.message}>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full capitalize" aria-label="Category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {technologyCategories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField label="Icon" htmlFor="tech-icon" error={errors.icon_url?.message}>
            <Controller
              control={control}
              name="icon_url"
              render={({ field }) => <ImageField id="tech-icon" value={field.value} onChange={field.onChange} />}
            />
          </FormField>
          <FormField label="Link (optional)" htmlFor="tech-link" error={errors.link?.message}>
            <Input id="tech-link" placeholder="https://..." {...register("link")} />
          </FormField>
          <Controller
            control={control}
            name="is_core"
            render={({ field }) => (
              <label className="flex items-center gap-2 text-sm font-medium">
                <Switch checked={field.value} onCheckedChange={field.onChange} />
                Show on the home page
              </label>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TechnologyDialog;
