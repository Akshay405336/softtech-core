import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../components/data-table/data-table";
import { DataTableColumnHeader } from "../components/data-table/data-table-column-header";
import { Checkbox } from "../components/checkbox";
import { Badge } from "../components/badge";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  status: "Active" | "Pending" | "Graduated";
  score: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    course: "Computer Science",
    status: "Active",
    score: 95,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    course: "Data Science",
    status: "Pending",
    score: 82,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    course: "Web Development",
    status: "Graduated",
    score: 88,
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    course: "Computer Science",
    status: "Active",
    score: 99,
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    course: "Cybersecurity",
    status: "Pending",
    score: 76,
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    course: "Data Science",
    status: "Graduated",
    score: 91,
  },
  {
    id: "7",
    name: "George Clark",
    email: "george@example.com",
    course: "Web Development",
    status: "Active",
    score: 84,
  },
  {
    id: "8",
    name: "Hannah Abbott",
    email: "hannah@example.com",
    course: "Computer Science",
    status: "Pending",
    score: 79,
  },
  {
    id: "9",
    name: "Ian Malcolm",
    email: "ian@example.com",
    course: "Data Science",
    status: "Active",
    score: 93,
  },
  {
    id: "10",
    name: "Julia Roberts",
    email: "julia@example.com",
    course: "Cybersecurity",
    status: "Graduated",
    score: 87,
  },
  {
    id: "11",
    name: "Kevin Bacon",
    email: "kevin@example.com",
    course: "Web Development",
    status: "Active",
    score: 85,
  },
  {
    id: "12",
    name: "Laura Croft",
    email: "laura@example.com",
    course: "Computer Science",
    status: "Active",
    score: 97,
  },
];

const testColumns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "course",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Course" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Active" ? "success" : status === "Pending" ? "warning" : "secondary"}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) ? value.includes(row.getValue(id)) : row.getValue(id) === value;
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />,
  },
];

describe("DataTable component", () => {
  it("renders typed rows and column headers correctly", () => {
    render(<DataTable columns={testColumns} data={mockStudents} searchKey="name" />);

    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Email")).toBeDefined();
    expect(screen.getByText("Course")).toBeDefined();
    expect(screen.getByText("Alice Johnson")).toBeDefined();
    expect(screen.getByText("Bob Smith")).toBeDefined();
  });

  it("filters rows when search query is entered and resets pagination", () => {
    render(<DataTable columns={testColumns} data={mockStudents} searchKey="name" />);

    const searchInput = screen.getByPlaceholderText("Filter records...");
    fireEvent.change(searchInput, { target: { value: "Diana" } });

    expect(screen.getByText("Diana Prince")).toBeDefined();
    expect(screen.queryByText("Alice Johnson")).toBeNull();
    expect(screen.queryByText("Bob Smith")).toBeNull();
  });

  it("renders empty state when search finds no matches", () => {
    render(<DataTable columns={testColumns} data={mockStudents} searchKey="name" />);

    const searchInput = screen.getByPlaceholderText("Filter records...");
    fireEvent.change(searchInput, { target: { value: "NonExistentStudentName" } });

    expect(screen.getByText("No results found")).toBeDefined();
    expect(
      screen.getByText("No records match the current search or filter criteria."),
    ).toBeDefined();
  });

  it("renders empty state when dataset is empty", () => {
    render(
      <DataTable
        columns={testColumns}
        data={[]}
        searchKey="name"
        emptyTitle="No students registered"
        emptyMessage="Add students to see them listed here."
      />,
    );

    expect(screen.getByText("No students registered")).toBeDefined();
    expect(screen.getByText("Add students to see them listed here.")).toBeDefined();
  });

  it("renders loading skeleton rows when isLoading is true", () => {
    const { container } = render(
      <DataTable columns={testColumns} data={mockStudents} isLoading={true} loadingRowCount={4} />,
    );

    const pulseElements = container.querySelectorAll(".animate-pulse");
    expect(pulseElements.length).toBeGreaterThan(0);
    expect(screen.queryByText("Alice Johnson")).toBeNull();
  });

  it("supports pagination controls and page-size changes", () => {
    render(<DataTable columns={testColumns} data={mockStudents} defaultPageSize={5} />);

    // First page shows 5 rows
    expect(screen.getByText("Alice Johnson")).toBeDefined();
    expect(screen.getByText("Ethan Hunt")).toBeDefined();
    expect(screen.queryByText("Fiona Gallagher")).toBeNull();

    // Next page
    const nextBtn = screen.getByRole("button", { name: "Go to next page" });
    fireEvent.click(nextBtn);

    expect(screen.getByText("Fiona Gallagher")).toBeDefined();
    expect(screen.queryByText("Alice Johnson")).toBeNull();
  });

  it("handles row selection and computes selected row counts", () => {
    const handleSelectionChange = vi.fn();
    render(
      <DataTable
        columns={testColumns}
        data={mockStudents}
        enableRowSelection={true}
        onRowSelectionChange={handleSelectionChange}
      />,
    );

    const selectRowCheckboxes = screen.getAllByRole("checkbox", { name: "Select row" });
    expect(selectRowCheckboxes.length).toBeGreaterThan(0);

    // Select first row
    const firstCheckbox = selectRowCheckboxes[0];
    expect(firstCheckbox).toBeDefined();
    if (firstCheckbox) {
      fireEvent.click(firstCheckbox);
    }

    expect(handleSelectionChange).toHaveBeenCalled();
    expect(screen.getByText(/1 of 12 row\(s\) selected/i)).toBeDefined();
  });

  it("sorts rows ascending and descending when column sort button is triggered", () => {
    render(<DataTable columns={testColumns} data={mockStudents} defaultPageSize={12} />);

    const sortButton = screen.getByRole("button", { name: /sort by name/i });
    expect(sortButton).toBeDefined();

    // First click: Sorts Ascending (A -> Z)
    fireEvent.click(sortButton);

    let rows = screen.getAllByRole("row");
    const firstDataRow = rows[1];
    expect(firstDataRow).toBeDefined();
    if (firstDataRow) {
      expect(within(firstDataRow).getByText("Alice Johnson")).toBeDefined();
    }

    // Second click: Sorts Descending (Z -> A)
    fireEvent.click(sortButton);

    rows = screen.getAllByRole("row");
    const firstDescRow = rows[1];
    expect(firstDescRow).toBeDefined();
    if (firstDescRow) {
      expect(within(firstDescRow).getByText("Laura Croft")).toBeDefined();
    }
  });

  it("supports server-side controlled pagination and callbacks", () => {
    const handlePaginationChange = vi.fn();
    render(
      <DataTable
        columns={testColumns}
        data={mockStudents.slice(0, 5)}
        manualPagination={true}
        pageCount={3}
        rowCount={12}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={handlePaginationChange}
      />,
    );

    expect(screen.getByText("Page 1 of 3")).toBeDefined();

    const nextBtn = screen.getByRole("button", { name: "Go to next page" });
    fireEvent.click(nextBtn);

    expect(handlePaginationChange).toHaveBeenCalled();
  });

  it("displays error banner when error prop is provided", () => {
    render(
      <DataTable
        columns={testColumns}
        data={mockStudents}
        error="Network error: Failed to fetch records from server."
      />,
    );

    expect(screen.getByText("Data Table Error")).toBeDefined();
    expect(screen.getByText("Network error: Failed to fetch records from server.")).toBeDefined();
  });
});
