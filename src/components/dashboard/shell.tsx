"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DemoProvider } from "@/components/demo-store";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DemoProvider>
      <div className="flex min-h-screen">
        <div className="hidden w-64 shrink-0 border-r border-white/8 lg:block">
          <DashboardSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-white/8 px-4 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" aria-label="Open navigation" />}
              >
                <Menu />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#0b0e16] p-0">
                <DashboardSidebar onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <p className="text-sm text-muted-foreground">Meridian Supply</p>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </DemoProvider>
  );
}
