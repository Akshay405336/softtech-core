"use client";

import * as React from "react";
import Link from "next/link";
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageContainer,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@softtech/ui";
import {
  ArrowUpRight,
  Download,
  FolderKanban,
  HardDrive,
  Home,
  Plus,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const recentRecords = [
  {
    id: "STU-001",
    name: "Alice Johnson",
    course: "Fullstack Architecture",
    batch: "2026-Q1",
    status: "Active",
    date: "Today, 14:20",
  },
  {
    id: "STU-002",
    name: "Bob Smith",
    course: "Cloud Engineering",
    batch: "2026-Q1",
    status: "Pending",
    date: "Yesterday",
  },
  {
    id: "STU-003",
    name: "Charlie Davis",
    course: "UI / UX Systems",
    batch: "2025-Q4",
    status: "Graduated",
    date: "Oct 11, 2026",
  },
  {
    id: "STU-004",
    name: "Diana Prince",
    course: "Security Architecture",
    batch: "2026-Q2",
    status: "Active",
    date: "Oct 10, 2026",
  },
  {
    id: "STU-005",
    name: "Evan Wright",
    course: "DevOps & Infrastructure",
    batch: "2026-Q1",
    status: "Active",
    date: "Oct 09, 2026",
  },
];

export default function AdminDashboardPage(): React.JSX.Element {
  return (
    <PageContainer maxWidth="7xl" className="space-y-8">
      {/* Page Header with Breadcrumbs and Actions */}
      <PageHeader
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/", icon: Home },
              { label: "Admin", href: "/admin" },
              { label: "Dashboard", current: true },
            ]}
          />
        }
        title="Administration Overview"
        description="Monitor system operations, enrolled students, batches, and asset storage capacity across your workspace."
        badge={
          <Badge variant="outline" className="text-xs font-mono">
            Live Preview
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.success("Metrics Exported", {
                  description: "Dashboard analytical summary generated as CSV.",
                })
              }
              className="text-xs h-9"
            >
              <Download className="size-3.5 mr-1.5" aria-hidden="true" />
              Export Report
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                toast.info("Create Record", {
                  description: "Use the Form System or Student Directory to add new records.",
                })
              }
              className="text-xs h-9"
            >
              <Plus className="size-3.5 mr-1.5" aria-hidden="true" />
              New Student
            </Button>
          </div>
        }
      />

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Enrolled Students
            </CardTitle>
            <Users className="size-4 text-primary" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,420</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <TrendingUp className="size-3 mr-0.5" /> +12%
              </span>
              <span>vs previous month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Active Batches
            </CardTitle>
            <FolderKanban className="size-4 text-purple-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">38</div>
            <p className="text-xs text-muted-foreground mt-1">Across 4 curriculum tracks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Storage Utilization
            </CardTitle>
            <HardDrive className="size-4 text-blue-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.4 GB</div>
            <p className="text-xs text-muted-foreground mt-1">74% of 3.2 GB allocated quota</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              System Health
            </CardTitle>
            <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">99.98%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              All microservices operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Recent Enrolled Records Table + Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Records Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Recent Student Records</CardTitle>
              <CardDescription className="text-xs">
                Recently updated registrations from the directory.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs h-8">
              <Link href="/admin/students">
                View All <ArrowUpRight className="size-3.5 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs">Student Name</TableHead>
                    <TableHead className="text-xs">Course</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs text-right">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {record.id}
                      </TableCell>
                      <TableCell className="text-xs font-medium text-foreground">
                        {record.name}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {record.course}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Active"
                              ? "default"
                              : record.status === "Pending"
                                ? "outline"
                                : "secondary"
                          }
                          className="text-[10px] h-5"
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right font-mono">
                        {record.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Workspace Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
              <CardDescription className="text-xs">
                Common administrative workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-9"
              >
                <Link href="/admin/students">
                  <Users className="size-4 mr-2 text-primary" />
                  Manage Student Directory
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-9"
              >
                <Link href="/#section-form">
                  <Plus className="size-4 mr-2 text-emerald-500" />
                  Open Registration Form
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-9"
              >
                <Link href="/#section-file-upload">
                  <HardDrive className="size-4 mr-2 text-blue-500" />
                  Manage Media Uploads
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/40 border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Architecture Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between items-center py-1 border-b border-border/60">
                <span>Next.js Framework</span>
                <span className="font-mono text-foreground font-medium">16.4.0 (Turbopack)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border/60">
                <span>UI Design System</span>
                <span className="font-mono text-foreground font-medium">@softtech/ui 0.1.0</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Security Adapter</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  Cookie Mock (Demo)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
