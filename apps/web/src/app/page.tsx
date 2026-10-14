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
} from "@softtech/ui";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Info,
  Mail,
  Plus,
  Trash2,

} from "lucide-react";

export default function DesignSystemShowcase(): React.JSX.Element {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [switched, setSwitched] = React.useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);

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
        </main>
      </div>
    </TooltipProvider>
  );
}
