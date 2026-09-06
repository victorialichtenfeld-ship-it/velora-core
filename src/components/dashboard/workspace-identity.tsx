"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { useDemo } from "@/components/demo-store";
import { demoUser } from "@/lib/data/demo";
import type { SessionUser } from "@/lib/types";

export function WorkspaceIdentity() {
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => {
    void fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: { user?: SessionUser | null }) => setUser(data.user ?? null));
  }, []);
  const { usingYourBooks } = useDemo();
  const shown = user ?? demoUser;
  const initials = shown.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          {initials || "V"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm">{shown.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {usingYourBooks ? "Your books" : shown.company}
            {shown.paid || usingYourBooks ? "" : " walkthrough"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Shield className="size-3.5" />
        {shown.paid
          ? `${shown.plan === "growth" ? "Growth" : "Starter"} · ${shown.plan === "growth" ? "$799" : "$299"}/mo`
          : "Live demo"}
      </div>
    </>
  );
}
