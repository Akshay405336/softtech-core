# Softtech Core Web Application (`@softtech/web`)

The main web application of the **Softtech Core** monorepo, built with **Next.js 16.4.0 (Turbopack)**, **React 19**, **Tailwind CSS 4**, and **TypeScript**.

It hosts two independent application experiences:

1. **Customer Website**: Public responsive website with top navigation, marketing hero, feature highlights, component showcase, and footer.
2. **Admin Portal**: Enterprise administrative console with standalone authentication (`/admin/login`), edge route protection, collapsible navigation drawer, metric cards, and student records directory (`/admin`, `/admin/students`).

---

## 1. Route Architecture & Route Groups

Next.js App Router route groups (folders enclosed in parentheses) allow separate layouts and navigation structures without affecting URL paths:

```
apps/web/src/
├── app/
│   ├── layout.tsx                     # Global Root Layout (Fonts, ThemeProvider, Toaster)
│   ├── globals.css                    # Tailwind CSS 4 theme imports
│   │
│   ├── (customer)/                    # Customer-Facing Website (URL: /...)
│   │   ├── layout.tsx                 # Customer layout (CustomerHeader + CustomerFooter)
│   │   ├── page.tsx                   # Customer Homepage & Design System Showcase (/)
│   │   └── pricing/                   # Secondary customer page (/pricing)
│   │       └── page.tsx
│   │
│   ├── (admin-auth)/                  # Standalone Authentication Portal
│   │   ├── layout.tsx                 # Minimal isolated auth layout (no customer/admin chrome)
│   │   └── admin/
│   │       └── login/                 # Admin login page (/admin/login)
│   │           └── page.tsx
│   │
│   └── (admin)/                       # Authenticated Administration Dashboard (URL: /admin/...)
│       ├── layout.tsx                 # Admin dashboard shell (AdminHeader + AdminSidebar + AdminFooter)
│       └── admin/
│           ├── page.tsx               # Default Admin Dashboard Overview (/admin)
│           └── students/              # Student Directory (/admin/students)
│               └── page.tsx
│
├── lib/
│   └── auth/                          # Authentication Adapter & Integration Boundary
│       ├── types.ts                   # User, LoginCredentials, AuthResult, AuthAdapter
│       └── adapter.ts                 # Demo cookie-based adapter & production integration guide
│
└── middleware.ts                      # Next.js Edge Middleware for server-side route protection
```

---

## 2. Customer Website vs. Admin Layout Separation

| Feature         | Customer Website (`/(customer)`)                        | Standalone Auth (`/(admin-auth)`)                    | Admin Dashboard (`/(admin)`)                                      |
| :-------------- | :------------------------------------------------------ | :--------------------------------------------------- | :---------------------------------------------------------------- |
| **URL Paths**   | `/`, `/pricing`, `/showcase`                            | `/admin/login`                                       | `/admin`, `/admin/students`                                       |
| **Header**      | `CustomerHeader` (Nav, Search, ThemeToggle, Sign In)    | Minimal Top Bar (Back link, ThemeToggle)             | `AdminHeader` (Sidebar toggles, Search, Notifications, User menu) |
| **Navigation**  | Top horizontal navbar & mobile drawer                   | None                                                 | `AdminSidebar` (Collapsible desktop sidebar + mobile drawer)      |
| **Footer**      | `CustomerFooter` (Multi-column links, contact, socials) | Compact centered copyright                           | `AdminFooter` (Status indicator, version, compact links)          |
| **Breadcrumbs** | Optional                                                | None                                                 | `Breadcrumbs` on all subpages                                     |
| **Protection**  | Publicly accessible                                     | Publicly accessible (redirects if already signed in) | Edge Middleware verified (`/admin/*`)                             |

---

## 3. How to Add Customer Pages

To add a new customer-facing page (e.g., `/about` or `/features`):

1. Create a folder inside `apps/web/src/app/(customer)/`:
   ```bash
   mkdir -p "apps/web/src/app/(customer)/about"
   ```
2. Create `page.tsx`:
   ```tsx
   import { PageContainer, PageHeader } from "@softtech/ui";

   export default function AboutPage() {
     return (
       <PageContainer maxWidth="7xl">
         <PageHeader
           title="About Softtech Core"
           description="Our engineering philosophy and monorepo foundation."
         />
         <p>Page content here automatically receives CustomerHeader and CustomerFooter.</p>
       </PageContainer>
     );
   }
   ```
3. The page automatically inherits `CustomerHeader` and `CustomerFooter` without extra configuration!

---

## 4. How to Add Admin Pages

To add a new admin dashboard subpage (e.g., `/admin/courses`):

1. Create a folder inside `apps/web/src/app/(admin)/admin/`:
   ```bash
   mkdir -p "apps/web/src/app/(admin)/admin/courses"
   ```
2. Create `page.tsx`:
   ```tsx
   "use client";

   import { Breadcrumbs, PageContainer, PageHeader } from "@softtech/ui";
   import { BookOpen, Home } from "lucide-react";

   export default function CoursesPage() {
     return (
       <PageContainer maxWidth="7xl">
         <PageHeader
           breadcrumbs={
             <Breadcrumbs
               items={[
                 { label: "Home", href: "/" },
                 { label: "Admin", href: "/admin" },
                 { label: "Courses", current: true, icon: BookOpen },
               ]}
             />
           }
           title="Curriculum Tracks"
           description="Manage available courses and modules."
         />
         {/* Page content */}
       </PageContainer>
     );
   }
   ```
3. Register the navigation link in `apps/web/src/app/(admin)/layout.tsx` inside `navGroups`.

---

## 5. Authentication Adapter & Edge Route Protection

### Middleware Route Guard (`apps/web/src/middleware.ts`)

Next.js Edge Middleware intercepts all incoming requests matching `/admin/:path*`:

- If an unauthenticated user navigates to `/admin` or any subroute (except `/admin/login`), the middleware immediately issues an HTTP 307 redirect to `/admin/login?from=/admin`.
- If an authenticated user navigates to `/admin/login`, the middleware redirects them to `/admin`.

### Demonstration Credentials

For development and demonstration testing:

- **Email**: `admin@softtech.io` (or any `@softtech.io` address)
- **Password**: `admin123`

---

## 6. Security Limitations & Production Integration

> [!CAUTION]
> **Important Security Architecture Notice**:
> The authentication adapter located at [`apps/web/src/lib/auth/adapter.ts`](file:///d:/websites/softtech-core/apps/web/src/lib/auth/adapter.ts) is a **demonstration integration boundary**.
>
> In production environments:
>
> 1. **Do not rely on insecure client cookies**: Replace the demonstration cookie with a cryptographically signed session token (e.g. JWT signed with HMAC-SHA256 or RSA private keys).
> 2. **Connect a Real Identity Provider**: Wire the `AuthAdapter` contract to your identity service (NextAuth / Auth.js, Supabase Auth, Clerk, AWS Cognito, or an internal OAuth2 provider).
> 3. **Server-Side Authorization**: Validate session tokens in Server Actions and API route handlers (`headers()`, `cookies()`), verifying user roles and database permissions before executing mutations.
