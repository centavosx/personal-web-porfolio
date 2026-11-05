"use client";

import { saveLink } from "@/actions/profile";
import FormField from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAdminAction from "@/hooks/useAdminAction";
import { LinkFormValues, linkSchema, linkTypes } from "@/schemas/admin";
import { Link } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export type LinkDialogProps = {
  link?: Link;
};

const LinkDialog = ({ link }: LinkDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, run } = useAdminAction();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      type: (link?.type as LinkFormValues["type"]) ?? "github",
      link: link?.link ?? "",
    },
  });

  const onSubmit = (values: LinkFormValues) =>
    run(() => saveLink(link?.id ?? null, values), "Link saved", () => {
      setIsOpen(false);
      if (!link) reset();
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {link ? (
          <Button variant="ghost" size="icon" aria-label={`Edit ${link.type}`}>
            <Pencil />
          </Button>
        ) : (
          <Button>
            <Plus />
            Add link
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{link ? "Edit link" : "Add link"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Type" error={errors.type?.message}>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full capitalize" aria-label="Type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {linkTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField label="URL" htmlFor="link-url" error={errors.link?.message}>
            <Input id="link-url" placeholder="https://... or mailto:..." {...register("link")} />
          </FormField>
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

export default LinkDialog;
