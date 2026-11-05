import { ActionResult } from "@/utils/admin-rows";
import { useTransition } from "react";
import { toast } from "sonner";

/** Runs a server action with a pending state, and shows the result as a toast. */
const useAdminAction = () => {
  const [isPending, startTransition] = useTransition();

  const run = (action: () => Promise<ActionResult>, successMessage?: string, onSuccess?: () => void) => {
    startTransition(async () => {
      const result = await action();
      if (result.error) {
        toast.error(result.error);
        return;
      }
      if (successMessage) toast.success(successMessage);
      onSuccess?.();
    });
  };

  return { isPending, run };
};

export default useAdminAction;
