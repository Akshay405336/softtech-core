"use client";

import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeToggle,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  DataTable,
  DataTableColumnHeader,
  type ColumnDef,
  type DataTableFilterableColumn,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormActions,
  FormErrorSummary,
  RadioGroup,
  RadioGroupItem,
  PasswordInput,
  useForm,
  zodResolver,
} from "@softtech/ui";
import { z } from "zod";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit,
  Eye,
  GraduationCap,
  Info,
  Mail,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Send,
  Trash2,
} from "lucide-react";

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
    score: 89,
  },
  {
    id: "STU-004",
    name: "Diana Prince",
    email: "diana.p@softtech.edu",
    course: "Fullstack Architecture",
    batch: "2026-Q1",
    status: "Active",
    score: 99,
  },
  {
    id: "STU-005",
    name: "Ethan Hunt",
    email: "ethan.h@softtech.edu",
    course: "DevOps & SRE",
    batch: "2026-Q2",
    status: "Pending",
    score: 74,
  },
  {
    id: "STU-006",
    name: "Fiona Gallagher",
    email: "fiona.g@softtech.edu",
    course: "Data Engineering",
    batch: "2025-Q4",
    status: "Graduated",
    score: 92,
  },
  {
    id: "STU-007",
    name: "George Clark",
    email: "george.c@softtech.edu",
    course: "Cloud Engineering",
    batch: "2026-Q2",
    status: "Active",
    score: 87,
  },
  {
    id: "STU-008",
    name: "Hannah Abbott",
    email: "hannah.a@softtech.edu",
    course: "UI / UX Systems",
    batch: "2026-Q1",
    status: "Pending",
    score: 78,
  },
  {
    id: "STU-009",
    name: "Ian Malcolm",
    email: "ian.m@softtech.edu",
    course: "Data Engineering",
    batch: "2026-Q1",
    status: "Active",
    score: 94,
  },
  {
    id: "STU-010",
    name: "Julia Roberts",
    email: "julia.r@softtech.edu",
    course: "Fullstack Architecture",
    batch: "2025-Q4",
    status: "Graduated",
    score: 90,
  },
  {
    id: "STU-011",
    name: "Kevin Bacon",
    email: "kevin.b@softtech.edu",
    course: "DevOps & SRE",
    batch: "2026-Q2",
    status: "Active",
    score: 85,
  },
  {
    id: "STU-012",
    name: "Laura Croft",
    email: "laura.c@softtech.edu",
    course: "Fullstack Architecture",
    batch: "2026-Q1",
    status: "Active",
    score: 98,
  },
];

const showcaseFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email address"),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.string().min(1, "Please select an account role"),
  notificationChannel: z.enum(["email", "slack", "sms"], {
    message: "Please select a notification channel",
  }),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional(),
  enable2FA: z.boolean(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed",
  }),
});

type ShowcaseFormValues = z.infer<typeof showcaseFormSchema>;

export default function DesignSystemShowcase(): React.JSX.Element {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [switched, setSwitched] = React.useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = React.useState<boolean>(false);
  const [isEmptyData, setIsEmptyData] = React.useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = React.useState<StudentRecord[]>([]);

  // Form showcase state
  const [formSubmittedData, setFormSubmittedData] = React.useState<ShowcaseFormValues | null>(null);
  const [formServerError, setFormServerError] = React.useState<string | null>(null);
  const [simulateServerError, setSimulateServerError] = React.useState<boolean>(false);

  const form = useForm<ShowcaseFormValues>({
    resolver: zodResolver(showcaseFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "developer",
      notificationChannel: "email",
      bio: "",
      enable2FA: true,
      acceptTerms: false,
    },
  });

  const onFormSubmit = async (values: ShowcaseFormValues) => {
    setFormSubmittedData(null);
    setFormServerError(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (simulateServerError) {
      setFormServerError(
        "Account registration failed: email address is already claimed by an enterprise SSO organization.",
      );
      return;
    }

    setFormSubmittedData(values);
  };

  const studentColumns: ColumnDef<StudentRecord>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
            aria-label="Select all rows on page"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label={`Select student ${row.original.name}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
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
          <span className="font-medium text-foreground">{row.getValue("name")}</span>
        ),
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
        accessorKey: "batch",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Batch" />,
        cell: ({ row }) => (
          <Badge variant="outline" className="font-normal text-[11px]">
            {row.getValue("batch")}
          </Badge>
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
                status === "Active" ? "success" : status === "Pending" ? "warning" : "secondary"
              }
            >
              {status}
            </Badge>
          );
        },
        filterFn: (row, id, value) => {
          return Array.isArray(value)
            ? value.includes(row.getValue(id))
            : row.getValue(id) === value;
        },
      },
      {
        accessorKey: "score",
        header: ({ column }) => <DataTableColumnHeader column={column} title="GPA / Score" />,
        cell: ({ row }) => (
          <span className="font-mono font-semibold">{row.getValue("score")}%</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const student = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label={`Actions for ${student.name}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-xs">
                  <Eye className="size-3.5 text-muted-foreground" /> View Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-xs">
                  <Edit className="size-3.5 text-muted-foreground" /> Edit Enrollment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-xs text-destructive focus:text-destructive">
                  <Trash2 className="size-3.5" /> Remove Student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        enableSorting: false,
        enableHiding: false,
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
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        {/* Top Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight">Softtech Core</h1>
                <Badge variant="outline">v0.1.0 Design System</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Component library, token architecture, and accessibility demonstration
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10 space-y-12">
          {/* Section 1: Design Tokens */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">1. Centralized Design Tokens</h2>
              <p className="text-sm text-muted-foreground">
                Semantic CSS variables mapping light and dark color schemes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {[
                {
                  name: "Primary",
                  bg: "bg-primary",
                  text: "text-primary-foreground",
                  border: "border-transparent",
                },
                {
                  name: "Secondary",
                  bg: "bg-secondary",
                  text: "text-secondary-foreground",
                  border: "border-border",
                },
                {
                  name: "Accent",
                  bg: "bg-accent",
                  text: "text-accent-foreground",
                  border: "border-border",
                },
                {
                  name: "Muted",
                  bg: "bg-muted",
                  text: "text-muted-foreground",
                  border: "border-border",
                },
                {
                  name: "Destructive",
                  bg: "bg-destructive",
                  text: "text-destructive-foreground",
                  border: "border-transparent",
                },
                {
                  name: "Success",
                  bg: "bg-success",
                  text: "text-success-foreground",
                  border: "border-transparent",
                },
                {
                  name: "Warning",
                  bg: "bg-warning",
                  text: "text-warning-foreground",
                  border: "border-transparent",
                },
                {
                  name: "Info",
                  bg: "bg-info",
                  text: "text-info-foreground",
                  border: "border-transparent",
                },
              ].map((token) => (
                <div
                  key={token.name}
                  className={`flex flex-col justify-end p-3 rounded-lg border ${token.border} ${token.bg} ${token.text} h-20 shadow-xs`}
                >
                  <span className="text-xs font-semibold">{token.name}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Section 2: Typography */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">2. Typography Scale</h2>
              <p className="text-sm text-muted-foreground">
                Font families, weights, and text hierarchies.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    Heading 1 (3xl / Extrabold)
                  </h1>
                  <h2 className="text-2xl font-bold tracking-tight mt-1">Heading 2 (2xl / Bold)</h2>
                  <h3 className="text-xl font-semibold tracking-tight mt-1">
                    Heading 3 (xl / Semibold)
                  </h3>
                  <h4 className="text-base font-medium mt-1">Heading 4 (base / Medium)</h4>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-base text-foreground">
                    Body text: Clean, legible typography engineered for enterprise SaaS interfaces
                    and web platforms.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Muted text: Secondary information, annotations, and metadata descriptions.
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    Monospace text: Code snippets, IDs, and tabular alignment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Section 3: Buttons & Spinner */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">3. Buttons & Spinner</h2>
              <p className="text-sm text-muted-foreground">
                Interactive buttons with variants, sizes, focus rings, loading states, and
                accessible icons.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                    Variants
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Primary Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link Button</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small (sm)</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large (lg)</Button>
                    <Button size="icon" aria-label="Add item">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                    States & Spinners
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      loading={buttonLoading}
                      onClick={() => {
                        setButtonLoading(true);
                        setTimeout(() => setButtonLoading(false), 2000);
                      }}
                    >
                      {buttonLoading ? "Saving..." : "Click for Loading"}
                    </Button>
                    <Button disabled>Disabled Button</Button>
                    <div className="flex items-center gap-3 pl-4 border-l border-border">
                      <span className="text-xs text-muted-foreground">Standalone Spinners:</span>
                      <Spinner size="sm" />
                      <Spinner size="default" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Section 4: Form Controls */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">4. Form Controls & Inputs</h2>
              <p className="text-sm text-muted-foreground">
                Accessible inputs, labels, textareas, checkboxes, switches, and selects.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs & Textarea */}
              <Card>
                <CardHeader>
                  <CardTitle>Text Fields</CardTitle>
                  <CardDescription>
                    Input and Textarea components with label association
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-name">Full Name</Label>
                    <Input id="demo-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-email">Email (with error state)</Label>
                    <Input
                      id="demo-email"
                      type="email"
                      placeholder="john@example.com"
                      error
                      defaultValue="invalid-email"
                    />
                    <p className="text-xs text-destructive">Please enter a valid email address.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-disabled">Disabled Input</Label>
                    <Input id="demo-disabled" disabled placeholder="Readonly input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-bio">Bio / Notes</Label>
                    <Textarea id="demo-bio" placeholder="Write a short summary..." />
                  </div>
                </CardContent>
              </Card>

              {/* Toggles, Checkbox, Select */}
              <Card>
                <CardHeader>
                  <CardTitle>Selection & Toggles</CardTitle>
                  <CardDescription>
                    Accessible primitives for boolean and option choices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Select */}
                  <div className="space-y-2">
                    <Label htmlFor="role-select">Select Role</Label>
                    <Select defaultValue="architect">
                      <SelectTrigger id="role-select" className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Engineering</SelectLabel>
                          <SelectItem value="architect">Software Architect</SelectItem>
                          <SelectItem value="frontend">Frontend Engineer</SelectItem>
                          <SelectItem value="backend">Backend Engineer</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Design</SelectLabel>
                          <SelectItem value="ui-ux">UI / UX Designer</SelectItem>
                          <SelectItem value="system">Design Technologist</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Checkbox */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={checked}
                        onCheckedChange={(val) => setChecked(Boolean(val))}
                      />
                      <Label htmlFor="terms" className="cursor-pointer">
                        Accept terms and conditions ({checked ? "Checked" : "Unchecked"})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms-disabled" disabled checked />
                      <Label htmlFor="terms-disabled" className="cursor-not-allowed opacity-50">
                        Disabled checked checkbox
                      </Label>
                    </div>
                  </div>

                  <Separator />

                  {/* Switch */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications-toggle" className="cursor-pointer">
                          Push Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Receive real-time system alerts
                        </p>
                      </div>
                      <Switch
                        id="notifications-toggle"
                        checked={switched}
                        onCheckedChange={setSwitched}
                      />
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                      <div className="space-y-0.5">
                        <Label htmlFor="disabled-toggle">Disabled Toggle</Label>
                        <p className="text-xs text-muted-foreground">Cannot be edited</p>
                      </div>
                      <Switch id="disabled-toggle" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Section 5: Feedback & Status */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">5. Feedback & Badges</h2>
              <p className="text-sm text-muted-foreground">
                Alert banners, status badges, and loading skeleton placeholders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alerts */}
              <div className="space-y-3">
                <Alert variant="default">
                  <Info className="size-4" />
                  <AlertTitle>Information Alert</AlertTitle>
                  <AlertDescription>
                    All shared packages compile through unified TypeScript and Tailwind 4 tokens.
                  </AlertDescription>
                </Alert>

                <Alert variant="success">
                  <CheckCircle2 className="size-4" />
                  <AlertTitle>Success State</AlertTitle>
                  <AlertDescription>
                    Production build completed with Turbopack in 420ms.
                  </AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Warning State</AlertTitle>
                  <AlertDescription>
                    Workspace packages must be listed in pnpm-workspace.yaml.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Destructive Alert</AlertTitle>
                  <AlertDescription>
                    Unresolved tsconfig extends cause build failures.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Badges & Skeleton */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Skeletons</CardTitle>
                  <CardDescription>
                    Small status indicators and content loading placeholders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                      Badge Variants
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="info">Informational</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                      Skeleton Placeholders
                    </h4>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="size-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Section 6: Navigation, Tabs, Dialog & Overlays */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                6. Navigation, Overlays & Popovers
              </h2>
              <p className="text-sm text-muted-foreground">
                Accessible tabs, dialog modals, dropdown menus, and tooltips.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle>Accessible Tabs</CardTitle>
                  <CardDescription>Keyboard navigation with Left/Right arrow keys</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="overview"
                      className="p-4 border rounded-md mt-3 border-border"
                    >
                      <h4 className="font-semibold text-sm">System Overview</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Softtech Core foundation packages: typescript-config, ui, and web.
                      </p>
                    </TabsContent>
                    <TabsContent
                      value="analytics"
                      className="p-4 border rounded-md mt-3 border-border"
                    >
                      <h4 className="font-semibold text-sm">Build Performance</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Zero hydration mismatch, fast Turbopack compilation.
                      </p>
                    </TabsContent>
                    <TabsContent
                      value="settings"
                      className="p-4 border rounded-md mt-3 border-border"
                    >
                      <h4 className="font-semibold text-sm">Theme Settings</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Configurable through next-themes with persistent client storage.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Overlays (Dialog, Dropdown, Tooltip) */}
              <Card>
                <CardHeader>
                  <CardTitle>Modals, Dropdowns & Tooltips</CardTitle>
                  <CardDescription>
                    WAI-ARIA compliant interactive overlay primitives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default">Open Modal Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Softtech Core Architecture</DialogTitle>
                          <DialogDescription>
                            This accessible modal uses focus trapping, backdrop blur, and handles
                            the Escape key.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-2 text-sm text-foreground">
                          Reusable UI components are packaged in{" "}
                          <code className="font-mono bg-muted px-1.5 py-0.5 rounded">
                            @softtech/ui
                          </code>{" "}
                          and imported cleanly into apps.
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button>Confirm</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          Actions Menu <ChevronRight className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel>Workspace Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Mail className="size-4" /> Email Notification
                          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Bell className="size-4" /> Set Reminder
                          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="size-4" /> Delete Resource
                          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon" aria-label="Information">
                          <Info className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Accessible Tooltip with auto-positioning</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground border-t border-border pt-4">
                  Full keyboard navigation supported: Tab, Enter, Space, Escape, and Arrow keys.
                </CardFooter>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Section 7: Reusable Data Table System */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">
                    7. Reusable Data Table System
                  </h2>
                  <Badge variant="outline">Enterprise Ready</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Production-grade TanStack Table foundation with typed columns, sorting, global
                  search, faceted status filters, pagination, and row selection.
                </p>
              </div>

              {/* State Toggles for Showcase */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTableLoading((prev) => !prev)}
                  className="text-xs h-8"
                >
                  <RefreshCw className={`mr-1 size-3.5 ${isTableLoading ? "animate-spin" : ""}`} />
                  {isTableLoading ? "Loading State: ON" : "Simulate Loading"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEmptyData((prev) => !prev)}
                  className="text-xs h-8"
                >
                  {isEmptyData ? "Show Mock Records" : "Simulate Empty"}
                </Button>
              </div>
            </div>

            {selectedStudents.length > 0 && (
              <Alert variant="default" className="bg-muted/50 border-primary/20 py-2.5">
                <Info className="size-4 text-primary" />
                <AlertTitle className="text-xs font-semibold">Active Row Selection</AlertTitle>
                <AlertDescription className="text-xs">
                  {selectedStudents.length} student(s) selected:{" "}
                  {selectedStudents.map((s) => s.name).join(", ")}
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardContent className="p-4 sm:p-6">
                <DataTable
                  columns={studentColumns}
                  data={isEmptyData ? [] : mockStudents}
                  searchKey="name"
                  searchPlaceholder="Search student name..."
                  filterableColumns={filterableColumns}
                  isLoading={isTableLoading}
                  enableRowSelection={true}
                  onRowSelectionChange={setSelectedStudents}
                  defaultPageSize={5}
                  pageSizeOptions={[5, 10, 20]}
                  emptyTitle="No student records found"
                  emptyMessage="Try adjusting your search query or clear the status filter."
                  toolbarActions={
                    <Button size="sm" className="h-8 text-xs gap-1">
                      <Plus className="size-3.5" />
                      <span>Add Student</span>
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Section 8: Reusable Form & Validation System */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">
                    8. Reusable Form &amp; Validation System
                  </h2>
                  <Badge variant="outline">Zod &amp; Radix</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Type-safe form foundation powered by react-hook-form, Zod schema validation,
                  server error alerts, and accessible controls.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSimulateServerError((prev) => !prev);
                    setFormServerError(null);
                  }}
                  className="text-xs h-8"
                >
                  {simulateServerError ? "Simulate Server Error: ON" : "Simulate Server Error"}
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                    <FormErrorSummary message={formServerError} errors={form.formState.errors} />

                    {formSubmittedData && (
                      <Alert
                        variant="default"
                        className="bg-success/10 border-success/30 text-success-foreground py-3"
                      >
                        <CheckCircle2 className="size-4 text-success" />
                        <AlertTitle className="text-sm font-semibold">
                          Form Validated &amp; Submitted
                        </AlertTitle>
                        <AlertDescription className="text-xs space-y-2 mt-1">
                          <p>Payload successfully verified against Zod schema:</p>
                          <pre className="p-3 rounded-md bg-muted font-mono text-[11px] overflow-x-auto text-foreground">
                            {JSON.stringify(formSubmittedData, null, 2)}
                          </pre>
                        </AlertDescription>
                      </Alert>
                    )}

                    <FormSection
                      title="Personal Information"
                      description="Primary user identity details and contact credentials"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                              </FormControl>
                              <FormDescription>
                                Official legal or professional name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Business Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="jane.doe@company.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                Used for account login and notifications.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel optional>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+1 (555) 012-3456" {...field} />
                              </FormControl>
                              <FormDescription>
                                For SMS verification and urgent alerts.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Password</FormLabel>
                              <FormControl>
                                <PasswordInput placeholder="Create secure password" {...field} />
                              </FormControl>
                              <FormDescription>
                                At least 8 chars with an uppercase letter and a number.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormSection>

                    <Separator />

                    <FormSection
                      title="Role &amp; Communication Preferences"
                      description="Workspace permissions and notification channels"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel required>Account Role</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="developer">Developer</SelectItem>
                                  <SelectItem value="manager">Project Manager</SelectItem>
                                  <SelectItem value="designer">UI / UX Designer</SelectItem>
                                  <SelectItem value="admin">System Administrator</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Controls accessible modules and actions.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notificationChannel"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel required>Notification Channel</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1.5"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="email" id="nc-email" />
                                    <Label
                                      htmlFor="nc-email"
                                      className="font-normal text-xs cursor-pointer"
                                    >
                                      Email Digest (Daily summary)
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="slack" id="nc-slack" />
                                    <Label
                                      htmlFor="nc-slack"
                                      className="font-normal text-xs cursor-pointer"
                                    >
                                      Slack Channel (Real-time updates)
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sms" id="nc-sms" />
                                    <Label
                                      htmlFor="nc-sms"
                                      className="font-normal text-xs cursor-pointer"
                                    >
                                      SMS (Security alerts only)
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel optional>Biography &amp; Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell your team about your background, projects, or responsibilities..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Max 200 characters displayed on team directory.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormSection>

                    <Separator />

                    <FormSection
                      title="Security Safeguards &amp; Terms"
                      description="Multi-factor authentication and platform policy consent"
                    >
                      <FormField
                        control={form.control}
                        name="enable2FA"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3 shadow-xs">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm font-medium">
                                Two-Factor Authentication (2FA)
                              </FormLabel>
                              <FormDescription className="text-xs">
                                Require an authenticator app confirmation code on every login.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-3 shadow-xs">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel required className="text-xs font-medium cursor-pointer">
                                I agree to the Softtech Core Master Services Agreement and Privacy
                                Policy
                              </FormLabel>
                              <FormDescription className="text-xs">
                                Consent is required before workspace access is provisioned.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </FormSection>

                    <FormActions align="end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          form.reset();
                          setFormSubmittedData(null);
                          setFormServerError(null);
                        }}
                        disabled={form.formState.isSubmitting}
                      >
                        Reset
                      </Button>
                      <Button type="submit" loading={form.formState.isSubmitting} className="gap-2">
                        <Send className="size-3.5" />
                        Submit Registration
                      </Button>
                    </FormActions>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}
