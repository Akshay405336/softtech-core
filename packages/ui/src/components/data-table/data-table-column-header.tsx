"use client";

import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";

export interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>): React.JSX.Element {
  if (!column.getCanSort()) {
    return (
      <div className={cn("text-xs font-semibold text-muted-foreground", className)}>{title}</div>
    );
  }

  const isSorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(isSorted === "asc")}
        className="-ml-3 h-8 text-xs font-semibold hover:bg-muted/60"
        aria-label={`Sort by ${title}. Current sort: ${
          isSorted === "desc" ? "descending" : isSorted === "asc" ? "ascending" : "none"
        }`}
      >
        <span>{title}</span>
        {isSorted === "desc" ? (
          <ArrowDown className="ml-2 size-3.5 text-foreground" />
        ) : isSorted === "asc" ? (
          <ArrowUp className="ml-2 size-3.5 text-foreground" />
        ) : (
          <ArrowUpDown className="ml-2 size-3.5 opacity-60" />
        )}
      </Button>
    </div>
  );
}
