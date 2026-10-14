import * as React from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";

export type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
};

export interface DataTableFacetedFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

export interface DataTableFilterableColumn {
  id: string;
  title: string;
  options: DataTableFacetedFilterOption[];
  multiple?: boolean;
}

export interface DataTableProps<TData, TValue = unknown> {
  /** Column definitions conforming to TanStack Table */
  columns: ColumnDef<TData, TValue>[];
  /** Array of row data */
  data: TData[];
  /** Key of column to use for text search. If omitted and onSearchChange is provided, global search is used. */
  searchKey?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Optional faceted filters to display in the toolbar */
  filterableColumns?: DataTableFilterableColumn[];
  /** Custom extra actions to render on the right side of the toolbar (e.g. Export, Add New) */
  toolbarActions?: React.ReactNode;
  /** Whether to render the toolbar with search, filters, and column toggle (default: true) */
  showToolbar?: boolean;
  /** Whether to render pagination controls (default: true) */
  showPagination?: boolean;
  /** Whether to show the column visibility toggle menu (default: true) */
  showColumnVisibility?: boolean;
  /** Available page size choices (default: [10, 20, 50, 100]) */
  pageSizeOptions?: number[];
  /** Default rows per page (default: 10) */
  defaultPageSize?: number;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Number of skeleton rows to render during loading (default: 5) */
  loadingRowCount?: number;
  /** Custom title for empty state */
  emptyTitle?: string;
  /** Custom description for empty state */
  emptyMessage?: string;
  /** Error message or node to display */
  error?: React.ReactNode;
  /** Enable row selection checkboxes */
  enableRowSelection?: boolean;
  /** Callback fired when selected rows change */
  onRowSelectionChange?: (selectedRows: TData[]) => void;

  // Server-side / Manual Control Props
  /** Enable manual/server-side pagination */
  manualPagination?: boolean;
  /** Total number of pages for server-side pagination */
  pageCount?: number;
  /** Total number of rows for server-side pagination */
  rowCount?: number;
  /** Controlled pagination state */
  pagination?: PaginationState;
  /** Callback fired when pagination changes */
  onPaginationChange?: (pagination: PaginationState) => void;

  /** Enable manual/server-side sorting */
  manualSorting?: boolean;
  /** Controlled sorting state */
  sorting?: SortingState;
  /** Callback fired when sorting changes */
  onSortingChange?: (sorting: SortingState) => void;

  /** Enable manual/server-side filtering */
  manualFiltering?: boolean;
  /** Controlled search query string */
  searchQuery?: string;
  /** Callback fired when search query changes */
  onSearchChange?: (query: string) => void;
  /** Callback fired when column filters change */
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;

  /** Custom class name for table container */
  className?: string;
}
