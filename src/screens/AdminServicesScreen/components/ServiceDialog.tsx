"use client";

import { saveService } from "@/actions/services";
import FormField from "@/components/admin/FormField";
import ImageField from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAdminAction from "@/hooks/useAdminAction";
import { ServiceFormValues, serviceSchema } from "@/schemas/admin";
import { Service } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export type ServiceDialogProps = {
  service?: Service;
};

const ServiceDialog = ({ service }: ServiceDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, run } = useAdminAction();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name ?? "",
      description: service?.description ?? "",
      icon_url: service?.icon_url ?? "",
    },
  });

  const onSubmit = (values: ServiceFormValues) =>
    run(() => saveService(service?.id ?? null, values), "Service saved", () => {
      setIsOpen(false);
      if (!service) reset();
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {service ? (
          <Button variant="ghost" size="icon" aria-label={`Edit ${service.name}`}>
            <Pencil />
          </Button>
        ) : (
          <Button>
            <Plus />
            Add service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service ? "Edit service" : "Add service"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Name" htmlFor="service-name" error={errors.name?.message}>
            <Input id="service-name" {...register("name")} />
          </FormField>
          <FormField label="Description" htmlFor="service-description" error={errors.description?.message}>
            <Textarea id="service-description" rows={5} {...register("description")} />
          </FormField>
          <FormField label="Icon" htmlFor="service-icon" error={errors.icon_url?.message}>
            <Controller
              control={control}
              name="icon_url"
              render={({ field }) => <ImageField id="service-icon" value={field.value} onChange={field.onChange} />}
            />
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

export default ServiceDialog;
