"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useAdminAction from "@/hooks/useAdminAction";
import { ActionResult } from "@/utils/admin-rows";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { ReactNode } from "react";

export type RowActionsProps = {
  name: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMove: (direction: "up" | "down") => Promise<ActionResult>;
  onDelete: () => Promise<ActionResult>;
  children?: ReactNode;
};

const RowActions = ({ name, canMoveUp, canMoveDown, onMove, onDelete, children }: RowActionsProps) => {
  const { isPending, run } = useAdminAction();

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Move ${name} up`}
        disabled={!canMoveUp || isPending}
        onClick={() => run(() => onMove("up"))}
      >
        <ArrowUp />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Move ${name} down`}
        disabled={!canMoveDown || isPending}
        onClick={() => run(() => onMove("down"))}
      >
        <ArrowDown />
      </Button>
      {children}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={`Delete ${name}`} disabled={isPending}>
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from your site right away and can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => run(onDelete, `Deleted ${name}`)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RowActions;
