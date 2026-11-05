"use client";

import { signIn } from "@/actions/auth";
import FormField from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

const LoginForm = () => {
  const [state, action, isPending] = useActionState(signIn, {});

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Site admin</CardTitle>
        <CardDescription>Sign in to manage your site.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <FormField label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </FormField>
          <FormField label="Password" htmlFor="password" error={state.error}>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </FormField>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
