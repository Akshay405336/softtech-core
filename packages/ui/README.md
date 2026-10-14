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

## 7. Running Tests and Checks

```bash
# Run Vitest component test suite
pnpm test

# Type-check shared UI package
pnpm --filter @softtech/ui type-check

# Check formatting
pnpm format:check

# Format code
pnpm format
```
