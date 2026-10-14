"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import type { DataTableFilterableColumn } from "./types";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  filterableColumns?: DataTableFilterableColumn[];
  toolbarActions?: React.ReactNode;
  showColumnVisibility?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Filter records...",
  searchQuery,
  onSearchChange,
  filterableColumns = [],
  toolbarActions,
  showColumnVisibility = true,
}: DataTableToolbarProps<TData>): React.JSX.Element {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    Boolean(
      searchKey ? table.getColumn(searchKey)?.getFilterValue() : table.getState().globalFilter,
    ) ||
    Boolean(searchQuery);

  const handleSearchInput = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue(value);
    } else {
      table.setGlobalFilter(value);
    }
  };

  const currentSearchValue =
    searchQuery ??
    (searchKey
      ? ((table.getColumn(searchKey)?.getFilterValue() as string) ?? "")
      : ((table.getState().globalFilter as string) ?? ""));

  const handleResetFilters = () => {
    table.resetColumnFilters();
    table.resetGlobalFilter();
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative w-full max-w-xs sm:w-64">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={searchPlaceholder}
            value={currentSearchValue}
            onChange={(event) => handleSearchInput(event.target.value)}
            className="h-8 pl-8 pr-7 text-xs bg-background"
            aria-label={searchPlaceholder}
          />
          {currentSearchValue.length > 0 && (
            <button
              type="button"
              onClick={() => handleSearchInput("")}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {filterableColumns.map((col) => {
          const column = table.getColumn(col.id);
          if (!column) return null;
          return (
            <DataTableFacetedFilter
              key={col.id}
              column={column}
              title={col.title}
              options={col.options}
              multiple={col.multiple}
            />
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 text-xs font-normal text-muted-foreground hover:text-foreground gap-1"
          >
            <X className="size-3.5" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {toolbarActions}
        {showColumnVisibility && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
