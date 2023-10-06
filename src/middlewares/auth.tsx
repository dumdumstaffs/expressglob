"use client";

import { trpc } from "@web/api/trpc";
import { Loader } from "@web/components/Loader";
import Redirect from "@web/components/Redirect";
import { ReactNode } from "react";

export function AuthMiddleware({ children }: { children: ReactNode }) {
  const profile = trpc.auth.profile.useQuery();

  if (profile.isLoading) return <Loader />;

  return profile.data ? <>{children}</> : <Redirect to="/secure/login" />;
}

export function GuestMiddleware({ children }: { children: ReactNode }) {
  const profile = trpc.auth.profile.useQuery();

  if (profile.isLoading) return <Loader />;

  return profile.data ? <Redirect to="/manager" /> : <>{children}</>;
}

export function useAuth() {
  const profile = trpc.auth.profile.useQuery();
  if (!profile.data)
    throw new Error("Cannot use `useAuth` outside `AuthMiddleware`");
  return profile.data;
}

export function useOptionalAuth() {
  const profile = trpc.auth.profile.useQuery();
  return profile.data;
}
