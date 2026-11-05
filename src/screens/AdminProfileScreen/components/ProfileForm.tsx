"use client";

import { saveProfile } from "@/actions/profile";
import FormField from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAdminAction from "@/hooks/useAdminAction";
import { ProfileFormValues, profileSchema } from "@/schemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type ProfileFormProps = {
  shortDescription: string;
};

const ProfileForm = ({ shortDescription }: ProfileFormProps) => {
  const { isPending, run } = useAdminAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { short_description: shortDescription },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => run(() => saveProfile(values), "Profile saved"))}
      className="flex flex-col items-start gap-4"
    >
      <div className="w-full">
        <FormField
          label="Intro"
          htmlFor="profile-intro"
          error={errors.short_description?.message}
          hint="One or two sentences works best."
        >
          <Textarea id="profile-intro" rows={3} {...register("short_description")} />
        </FormField>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default ProfileForm;
