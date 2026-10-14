"use client";

import * as React from "react";
import {
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "../../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { DataTableEmptyState } from "./data-table-empty-state";
import { DataTableLoading } from "./data-table-loading";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import type { DataTableProps } from "./types";

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  filterableColumns,
  toolbarActions,
  showToolbar = true,
  showPagination = true,
  showColumnVisibility = true,
  pageSizeOptions = [10, 20, 50, 100],
  defaultPageSize = 10,
  isLoading = false,
  loadingRowCount = 5,
  emptyTitle,
  emptyMessage,
  error,
  enableRowSelection = false,
  onRowSelectionChange,
  manualPagination = false,
  pageCount,
  rowCount,
  pagination: controlledPagination,
  onPaginationChange,
  manualSorting = false,
  sorting: controlledSorting,
  onSortingChange,
  manualFiltering = false,
  searchQuery,
  onSearchChange,
  onColumnFiltersChange,
  className,
}: DataTableProps<TData, TValue>): React.JSX.Element {
  // Internal states for uncontrolled mode
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>(
    {},
  );
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({});
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const sorting = controlledSorting !== undefined ? controlledSorting : internalSorting;
  const pagination = controlledPagination !== undefined ? controlledPagination : internalPagination;

  const handleSortingChange = React.useCallback(
    (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
      const nextSorting =
        typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue;
      setInternalSorting(nextSorting);
      onSortingChange?.(nextSorting);
    },
    [sorting, onSortingChange],
  );

  const handlePaginationChange = React.useCallback(
    (updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const nextPagination =
        typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;
      setInternalPagination(nextPagination);
      onPaginationChange?.(nextPagination);
    },
    [pagination, onPaginationChange],
  );

  const handleColumnFiltersChange = React.useCallback(
    (updaterOrValue: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
      const nextFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(internalColumnFilters)
          : updaterOrValue;
      setInternalColumnFilters(nextFilters);
      onColumnFiltersChange?.(nextFilters);
    },
    [internalColumnFilters, onColumnFiltersChange],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility: internalColumnVisibility,
      rowSelection: internalRowSelection,
      columnFilters: internalColumnFilters,
      pagination,
    },
    enableRowSelection,
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    rowCount: manualPagination ? rowCount : undefined,
    manualSorting,
    manualFiltering,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setInternalColumnVisibility,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: setInternalRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
  });

  // Notify parent on row selection changes
  React.useEffect(() => {
    if (onRowSelectionChange && enableRowSelection) {
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [internalRowSelection, onRowSelectionChange, enableRowSelection, table]);

  return (
    <div className={cn("w-full space-y-3", className)}>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Data Table Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showToolbar && (
        <DataTableToolbar
          table={table}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filterableColumns={filterableColumns}
          toolbarActions={toolbarActions}
          showColumnVisibility={showColumnVisibility}
        />
      )}

      <div className="rounded-md border border-border bg-card shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableLoading columnCount={columns.length} rowCount={loadingRowCount} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <DataTableEmptyState
                    title={emptyTitle}
                    description={emptyMessage}
                    onAction={() => {
                      table.resetColumnFilters();
                      table.resetGlobalFilter();
                      onSearchChange?.("");
                    }}
                    actionLabel="Reset Filters"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {showPagination && (
          <DataTablePagination
            table={table}
            pageSizeOptions={pageSizeOptions}
            showSelectedCount={enableRowSelection}
          />
        )}
      </div>
    </div>
  );
}
