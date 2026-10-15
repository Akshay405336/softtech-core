"use client";

import Link from "next/link";
import { ThemeToggle } from "@softtech/ui";
import { ArrowLeft, Shield } from "lucide-react";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20 text-foreground transition-colors">
      {/* Minimal Auth Top Bar */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border/40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          <span>Back to Customer Website</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground hidden sm:flex">
            <Shield className="size-3.5 text-primary" aria-hidden="true" />
            <span>Secure Admin Zone</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border/40">
        <span>© 2026 Softtech Core Administration • Demonstration Environment</span>
      </footer>
    </div>
  );
}
