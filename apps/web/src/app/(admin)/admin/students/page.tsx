"use client";

import * as React from "react";
import {
  Badge,
  Breadcrumbs,
  Button,
  DataTable,
  DataTableColumnHeader,
  PageContainer,
  PageHeader,
  toast,
  type ColumnDef,
  type DataTableFilterableColumn,
} from "@softtech/ui";
import { CheckCircle2, Clock, GraduationCap, Home, Plus, Users } from "lucide-react";

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  course: string;
  batch: string;
  status: "Active" | "Pending" | "Graduated";
  score: number;
}

const mockStudents: StudentRecord[] = [
  {
    id: "STU-001",
    name: "Alice Johnson",
    email: "alice.j@softtech.edu",
    course: "Fullstack Architecture",
    batch: "2026-Q1",
    status: "Active",
    score: 96,
  },
  {
    id: "STU-002",
    name: "Bob Smith",
    email: "bob.smith@softtech.edu",
    course: "Cloud Engineering",
    batch: "2026-Q1",
    status: "Pending",
    score: 81,
  },
  {
    id: "STU-003",
    name: "Charlie Davis",
    email: "charlie.d@softtech.edu",
    course: "UI / UX Systems",
    batch: "2025-Q4",
    status: "Graduated",
    score: 88,
  },
  {
    id: "STU-004",
    name: "Diana Prince",
    email: "diana.p@softtech.edu",
    course: "Security Architecture",
    batch: "2026-Q2",
    status: "Active",
    score: 94,
  },
  {
    id: "STU-005",
    name: "Evan Wright",
    email: "evan.w@softtech.edu",
    course: "DevOps & Infrastructure",
    batch: "2026-Q1",
    status: "Active",
    score: 89,
  },
  {
    id: "STU-006",
    name: "Fiona Gallagher",
    email: "fiona.g@softtech.edu",
    course: "Fullstack Architecture",
    batch: "2025-Q3",
    status: "Graduated",
    score: 91,
  },
];

export default function AdminStudentsPage(): React.JSX.Element {
  const [data] = React.useState<StudentRecord[]>(mockStudents);

  const columns: ColumnDef<StudentRecord>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</span>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Student Name" />,
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-foreground text-xs">{row.getValue("name")}</span>
            <span className="text-[11px] text-muted-foreground">{row.original.email}</span>
          </div>
        ),
      },
      {
        accessorKey: "course",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Curriculum Track" />,
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">{row.getValue("course")}</span>
        ),
      },
      {
        accessorKey: "batch",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Batch" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">{row.getValue("batch")}</span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              variant={
                status === "Active" ? "default" : status === "Pending" ? "outline" : "secondary"
              }
              className="text-[10px] h-5"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "score",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Grade" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-foreground">
            {row.getValue("score")}%
          </span>
        ),
      },
    ],
    [],
  );

  const filterableColumns: DataTableFilterableColumn[] = React.useMemo(
    () => [
      {
        id: "status",
        title: "Status",
        options: [
          { label: "Active", value: "Active", icon: CheckCircle2 },
          { label: "Pending", value: "Pending", icon: Clock },
          { label: "Graduated", value: "Graduated", icon: GraduationCap },
        ],
      },
    ],
    [],
  );

  return (
    <PageContainer maxWidth="7xl" className="space-y-6">
      <PageHeader
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/", icon: Home },
              { label: "Admin", href: "/admin" },
              { label: "Students", current: true, icon: Users },
            ]}
          />
        }
        title="Student Directory"
        description="Search, filter, and manage enrolled academy students across curriculum tracks."
        badge={
          <Badge variant="outline" className="text-xs font-mono">
            {data.length} Enrolled
          </Badge>
        }
        actions={
          <Button
            variant="default"
            size="sm"
            onClick={() =>
              toast.info("Registration", {
                description: "New enrollment form modal will open here.",
              })
            }
            className="text-xs h-9"
          >
            <Plus className="size-3.5 mr-1.5" aria-hidden="true" />
            Add Student
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Filter students by name..."
        filterableColumns={filterableColumns}
      />
    </PageContainer>
  );
}
