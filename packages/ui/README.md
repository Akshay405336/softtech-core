# @softtech/ui

Production-grade, accessible React component library and centralized design token system for **Softtech Core**.

Engineered for multiple Next.js applications, admin dashboards, marketing websites, and customer portals.

---

## 1. Package Purpose

`@softtech/ui` provides:

- **Centralized Design Tokens**: Semantic CSS variables for light and dark themes using Tailwind CSS 4 `@theme inline` mappings.
- **Accessible Primitives**: WAI-ARIA compliant components built on top of Radix UI primitives with full keyboard navigation, screen reader announcements, and focus ring management.
- **Theme Foundation**: Zero-flash theme switching (`light`, `dark`, `system`) with Next.js App Router support via `ThemeProvider` and `ThemeToggle`.
- **Zero-Build Consumption**: Directly imported and transpiled by Next.js Turbopack across the monorepo workspace without complex bundling overhead.

---

## 2. Workspace Installation & Consumption

To add `@softtech/ui` to any application in the monorepo:

In `apps/<app-name>/package.json`:

```json
{
  "dependencies": {
    "@softtech/ui": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

Then run from repository root:

```bash
pnpm install
```

---

## 3. Tailwind CSS 4 Integration Requirements

In Tailwind CSS 4, configure your application's CSS entry point (e.g. `apps/web/src/app/globals.css`):

```css
@import "tailwindcss";
@import "@softtech/ui/styles.css";

/* Tell Tailwind CSS 4 to scan @softtech/ui source files for classes */
@source "../../../packages/ui/src/**/*.{ts,tsx}";

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
```

---

## 4. Theme System Usage

In your root layout (`app/layout.tsx`):

```tsx
import { ThemeProvider } from "@softtech/ui";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

To render the accessible theme switcher:

```tsx
import { ThemeToggle } from "@softtech/ui";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Dashboard</h1>
      <ThemeToggle />
    </header>
  );
}
```

---

## 5. Public Components

All components are exported directly from `@softtech/ui`:

```tsx
import {
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Separator,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Skeleton,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  cn,
} from "@softtech/ui";
```

### Component Summary

| Component        | Primitives / Standard      | Key Variants / Features                                                                                              |
| ---------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Button**       | Radix Slot                 | `default`, `secondary`, `destructive`, `outline`, `ghost`, `link` / sizes: `sm`, `default`, `lg`, `icon` / `loading` |
| **Input**        | Native HTMLInputElement    | Accessible focus ring, `error` (sets `aria-invalid`), `disabled`                                                     |
| **Textarea**     | Native HTMLTextAreaElement | Focus ring, `error`, `disabled`                                                                                      |
| **Label**        | Radix Label                | Accessible label association with form inputs                                                                        |
| **Checkbox**     | Radix Checkbox             | Keyboard spacebar toggle, checked, indeterminate, disabled                                                           |
| **Switch**       | Radix Switch               | `role="switch"`, `aria-checked`, smooth sliding thumb transition                                                     |
| **Select**       | Radix Select               | Keyboard arrow navigation, item indicator, custom popper position                                                    |
| **Card**         | Semantic HTML5             | Structured card layout (`Header`, `Title`, `Description`, `Content`, `Footer`)                                       |
| **Badge**        | CVA Badges                 | `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`                                       |
| **Separator**    | Radix Separator            | Horizontal and vertical dividers with `role="separator"`                                                             |
| **Dialog**       | Radix Dialog               | Focus trapping, Escape key listener, backdrop blur, accessible close button                                          |
| **DropdownMenu** | Radix DropdownMenu         | Submenus, checkbox items, radio items, shortcuts, keyboard navigation                                                |
| **Tabs**         | Radix Tabs                 | Left/Right arrow navigation, active tab shadow, tab panels                                                           |
| **Skeleton**     | Semantic Div               | Pulse animation loading placeholder with `aria-hidden="true"`                                                        |
| **Spinner**      | SVG Status                 | `role="status"`, `aria-label="Loading"`, sizes: `sm`, `default`, `md`, `lg`                                          |
| **Alert**        | ARIA Alert                 | `role="alert"`, variants: `default`, `destructive`, `success`, `warning`                                             |
| **Tooltip**      | Radix Tooltip              | Accessible hover and focus tooltips with collision positioning                                                       |

---

## 6. How to Add a New Component

1. Create component file in `packages/ui/src/components/<component-name>.tsx`.
2. Follow accessibility principles:
   - Use semantic HTML or Radix primitives.
   - Use `cn()` with shared design token utilities (`bg-primary`, `border-border`, etc.).
   - Include visible focus indicators (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
   - Add `"use client"` if the component uses hooks or Radix client primitives.
3. Export the component in `packages/ui/src/index.ts`.
4. Add unit / behavior test in `packages/ui/src/__tests__/`.
5. Run tests:
   ```bash
   pnpm --filter @softtech/ui test
   ```

---

## 7. Reusable Data Table System

`@softtech/ui` provides a production-quality, type-safe data table foundation built on TanStack Table v8 and styled with Softtech Core design tokens.

### Features

- **Generic Row Types**: Fully typed `<TData, TValue>` without requiring `any`.
- **Sorting**: Multi-column sorting with single-click direct toggle and visual indicators.
- **Search & Filtering**: Global text search input and faceted multi-select dropdown filters.
- **Pagination**: Configurable page sizes (10, 20, 50, 100), range indicator, and navigation buttons.
- **Row Selection**: Checkbox column with page select-all and selection counter.
- **Loading & Empty States**: Integrated skeleton rows and customizable empty state with reset buttons.
- **Client & Server-Side Modes**: Seamless transition from in-memory processing to API-driven server pagination.

### Basic Client-Side Example

```tsx
import * as React from "react";
import { DataTable, DataTableColumnHeader, type ColumnDef, Badge } from "@softtech/ui";

interface Student {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Graduated";
}

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "success" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
];

export function StudentsList({ students }: { students: Student[] }) {
  return (
    <DataTable
      columns={columns}
      data={students}
      searchKey="name"
      searchPlaceholder="Search students..."
      defaultPageSize={10}
    />
  );
}
```

### Server-Side Pagination & Sorting Example

In server-side mode, set `manualPagination: true` and `manualSorting: true`, providing the current page rows, total page count, and callbacks:

```tsx
export function ServerTable() {
  const [data, setData] = React.useState<Student[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    // Fetch data from consuming application API
    async function loadData() {
      setIsLoading(true);
      const res = await fetch(
        `/api/students?page=${pagination.pageIndex}&size=${pagination.pageSize}&sort=${sorting[0]?.id}&dir=${sorting[0]?.desc ? "desc" : "asc"}&q=${search}`,
      );
      const json = await res.json();
      setData(json.items);
      setPageCount(json.totalPages);
      setIsLoading(false);
    }
    loadData();
  }, [pagination, sorting, search]);

  return (
    <DataTable
      columns={columns}
      data={data}
      manualPagination
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      manualSorting
      sorting={sorting}
      onSortingChange={setSorting}
      manualFiltering
      searchQuery={search}
      onSearchChange={setSearch}
      isLoading={isLoading}
    />
  );
}
```

---

## 8. Form & Validation System

`@softtech/ui` provides a composable, accessible form foundation built on top of `react-hook-form`, `zod`, and Radix UI primitives.

### Available Primitives & Inputs

| Component                      | Description                                                                     |
| :----------------------------- | :------------------------------------------------------------------------------ |
| `Form`                         | Context provider wrapping `react-hook-form`'s `FormProvider`.                   |
| `FormField`                    | Controller wrapper connecting inputs to form state and validation schemas.      |
| `FormItem`                     | Scoped field container providing unique IDs and accessibility context.          |
| `FormLabel`                    | Accessible label with optional `required` asterisk or `optional` indicator.     |
| `FormControl`                  | Radix Slot forwarding `id`, `aria-describedby`, and `aria-invalid` to controls. |
| `FormDescription`              | Muted helper text connected via `aria-describedby`.                             |
| `FormMessage`                  | Accessible error message styled with `text-destructive`.                        |
| `FormSection`                  | Grouping container with section title and description.                          |
| `FormActions`                  | Footer container for submit, reset, and cancel actions with flexible alignment. |
| `FormErrorSummary`             | Alert summarizing top-level server errors or listing all validation failures.   |
| `PasswordInput`                | Input with built-in toggle button (`Eye` / `EyeOff`) for password visibility.   |
| `RadioGroup`, `RadioGroupItem` | Accessible radio button group powered by `@radix-ui/react-radio-group`.         |

### Client-Side Form with Zod Schema Validation

```tsx
"use client";

import * as React from "react";
import { z } from "zod";
import {
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
  Input,
  PasswordInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Switch,
  Button,
  useForm,
  zodResolver,
} from "@softtech/ui";

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Please select a role"),
  notificationMethod: z.enum(["email", "slack", "sms"]),
  twoFactorAuth: z.boolean(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms of service",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function RegistrationForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "developer",
      notificationMethod: "email",
      twoFactorAuth: true,
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setServerError(errorData.message ?? "Registration failed");
      }
    } catch (err) {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormErrorSummary message={serverError} errors={form.formState.errors} />

        <FormSection title="Account Details" description="Enter your credentials">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
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
                  <PasswordInput placeholder="Create password" {...field} />
                </FormControl>
                <FormDescription>At least 8 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormActions align="end">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" loading={form.formState.isSubmitting}>
            Submit
          </Button>
        </FormActions>
      </form>
    </Form>
  );
}
```

### Next.js App Router Guidelines

- **Client Components**: All forms utilizing `react-hook-form` require the `"use client"` directive because they track reactive state, handle events, and access browser APIs.
- **Server Action Integration**: Pass the validated data from `handleSubmit(onSubmit)` to your Server Actions or route handlers. On action rejection, use `form.setError(fieldName, { message })` or `FormErrorSummary` to render accessible feedback.

---

## 9. Notification & Confirmation System

`@softtech/ui` includes an accessible, stateful notification and confirmation foundation built on Radix UI primitives (`@radix-ui/react-toast` and `@radix-ui/react-alert-dialog`).

### Setup in Root Layout

Render `<Toaster />` once inside your root layout within `ThemeProvider`:

```tsx
// apps/<app-name>/src/app/layout.tsx
import { ThemeProvider, Toaster } from "@softtech/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Toast Notification API

Trigger notifications from any client component without wrapping the component in context providers:

```tsx
"use client";

import { toast, ToastAction, Button } from "@softtech/ui";

export function NotificationDemo() {
  return (
    <div className="flex gap-2">
      {/* Typed variants */}
      <Button onClick={() => toast.success("Project exported successfully")}>Success</Button>

      <Button onClick={() => toast.error("Cluster connection failed")}>Error</Button>

      <Button onClick={() => toast.warning("Approaching monthly quota limit")}>Warning</Button>

      <Button onClick={() => toast.info("New release v1.4.0 available")}>Info</Button>

      {/* Toast with Action */}
      <Button
        onClick={() =>
          toast({
            title: "File moved to trash",
            action: (
              <ToastAction altText="Undo file deletion" onClick={() => toast.info("File restored")}>
                Undo
              </ToastAction>
            ),
          })
        }
      >
        With Action
      </Button>

      {/* Async Promises with Loading States */}
      <Button
        onClick={() =>
          toast.promise(fetch("/api/deploy", { method: "POST" }), {
            loading: "Deploying edge cluster...",
            success: "Deployment completed across all regions!",
            error: "Deployment failed to reach quorum",
          })
        }
      >
        Async Promise
      </Button>
    </div>
  );
}
```

### Confirmation Dialogs

Protect destructive operations using either declarative or imperative patterns:

#### 1. Declarative `<ConfirmDialog />`

```tsx
"use client";

import * as React from "react";
import { ConfirmDialog, Button } from "@softtech/ui";

export function DeleteProjectButton() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch("/api/projects/1", { method: "DELETE" });
    setLoading(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Project
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Permanently Delete Project?"
        description="This action cannot be undone. All microservices and associated storage volumes will be deleted."
        confirmLabel="Delete Project"
        variant="destructive"
        loading={loading}
        onConfirm={handleDelete}
      />
    </>
  );
}
```

#### 2. Imperative `useConfirm()` Hook

```tsx
"use client";

import { useConfirm, Button, toast } from "@softtech/ui";

export function RevokeKeyButton() {
  const { confirm, ConfirmDialog } = useConfirm();

  const handleRevoke = async () => {
    const ok = await confirm({
      title: "Revoke API Key?",
      description: "Any external services using this key will immediately lose access.",
      confirmLabel: "Revoke Key",
      variant: "destructive",
    });

    if (ok) {
      toast.success("API key revoked");
    }
  };

  return (
    <>
      <Button onClick={handleRevoke}>Revoke Key</Button>
      <ConfirmDialog />
    </>
  );
}
```

---

## 10. File Upload & Media Management System

`@softtech/ui` provides a composable, accessible file upload and media management foundation supporting drag-and-drop, client-side validation, object URL memory cleanup, and reorderable galleries.

### Available Components

| Component            | Description                                                                                          |
| :------------------- | :--------------------------------------------------------------------------------------------------- |
| `FileUpload`         | Main upload surface managing dropzone, file list, rejection alerts, and lifecycle progress.          |
| `FileUploadDropzone` | Drag-and-drop and click-to-select zone with keyboard accessibility and visual drag cues.             |
| `FileUploadList`     | Container displaying selected file rows with "Clear all" action.                                     |
| `FileUploadItem`     | Individual file card showing preview thumbnail, formatted size, status, progress, and retry/remove.  |
| `FilePreview`        | Categorized preview rendering image/video thumbnails or semantic icons (PDF, doc, archive, code).    |
| `ImageUpload`        | Single-image upload for profile avatars, logos, or cover photos with circular or square crops.       |
| `MediaGallery`       | Grid gallery for uploaded media supporting primary cover badges, accessible reordering, and removal. |
| `UploadProgress`     | Progress bar with `role="progressbar"`, live percentages, and status variants.                       |

### Multi-File Upload with Validation

```tsx
"use client";

import * as React from "react";
import { FileUpload, type UploadFileItem } from "@softtech/ui";

export function AttachmentUpload() {
  const [files, setFiles] = React.useState<UploadFileItem[]>([]);

  const handleUpload = async (item: UploadFileItem) => {
    // Consuming application executes upload (e.g. presigned S3 / Cloudflare R2 / Server Action)
    const formData = new FormData();
    formData.append("file", item.file);
    await fetch("/api/upload", { method: "POST", body: formData });
  };

  return (
    <FileUpload
      files={files}
      onFilesChange={setFiles}
      validation={{
        maxSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        accept: ["image/*", "application/pdf", ".docx", ".zip"],
      }}
      onUpload={handleUpload}
    />
  );
}
```

### Avatar & Single-Image Upload

```tsx
"use client";

import * as React from "react";
import { ImageUpload } from "@softtech/ui";

export function UserProfilePicture() {
  const [avatar, setAvatar] = React.useState<File | string | null>(null);

  return (
    <ImageUpload
      value={avatar}
      onChange={setAvatar}
      shape="circle"
      size="lg"
      validation={{
        maxSize: 5 * 1024 * 1024,
        accept: ["image/*"],
      }}
    />
  );
}
```

### Media Gallery with Accessible Reordering

```tsx
"use client";

import * as React from "react";
import { MediaGallery, type MediaItem } from "@softtech/ui";

export function CourseGallery() {
  const [media, setMedia] = React.useState<MediaItem[]>([
    { id: "1", url: "/thumb1.jpg", name: "Lesson 1", isPrimary: true },
    { id: "2", url: "/thumb2.jpg", name: "Lesson 2", isPrimary: false },
  ]);

  return (
    <MediaGallery
      items={media}
      columns={3}
      onReorder={setMedia}
      onSetPrimary={(id) =>
        setMedia((prev) => prev.map((item) => ({ ...item, isPrimary: item.id === id })))
      }
      onRemove={(id) => setMedia((prev) => prev.filter((item) => item.id !== id))}
    />
  );
}
```

### Security & Server Boundary Disclaimer

> [!IMPORTANT]
> Client-side validation improves user experience by filtering accidental uploads before network transmission. However, client checks **do not** prove a file is safe or malicious-free. Production backends must independently verify MIME types, scan for malware, enforce authorization, and store files on dedicated object storage with appropriate Content-Disposition headers.

---

## 11. Running Tests and Checks

```bash
# Run Vitest test suite (including component, DataTable, form, notification, and file upload tests)
pnpm test

# Type-check shared UI package
pnpm --filter @softtech/ui type-check

# Check formatting
pnpm format:check

# Format code
pnpm format
```
