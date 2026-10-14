"use client";

import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { PlusCircle, X } from "lucide-react";
import { Badge } from "../badge";
import { Button } from "../button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import type { DataTableFacetedFilterOption } from "./types";

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: DataTableFacetedFilterOption[];
  multiple?: boolean;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  multiple = true,
}: DataTableFacetedFilterProps<TData, TValue>): React.JSX.Element | null {
  if (!column) return null;

  const rawFilterValue = column.getFilterValue();
  const selectedValues = new Set<string>(
    Array.isArray(rawFilterValue)
      ? (rawFilterValue as string[])
      : typeof rawFilterValue === "string"
        ? [rawFilterValue]
        : [],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed gap-1 text-xs">
          <PlusCircle className="size-3.5" />
          <span>{title}</span>
          {selectedValues.size > 0 && (
            <>
              <div className="h-4 w-px bg-border mx-1" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuLabel className="text-xs">{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={isSelected}
              onCheckedChange={(checked) => {
                if (multiple) {
                  if (checked) {
                    selectedValues.add(option.value);
                  } else {
                    selectedValues.delete(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column.setFilterValue(filterValues.length ? filterValues : undefined);
                } else {
                  column.setFilterValue(checked ? option.value : undefined);
                }
              }}
              className="text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-1">
                {option.icon && <option.icon className="size-3.5 text-muted-foreground" />}
                <span>{option.label}</span>
              </div>
              {option.count !== undefined && (
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {option.count}
                </span>
              )}
            </DropdownMenuCheckboxItem>
          );
        })}
        {selectedValues.size > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className="justify-center text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="mr-1 size-3.5" /> Clear filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
