import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Home, Layers, Settings, Users } from "lucide-react";
import {
  AdminFooter,
  AdminHeader,
  AdminLayout,
  AdminSidebar,
  Breadcrumbs,
  CustomerFooter,
  CustomerHeader,
  CustomerLayout,
  PageContainer,
  PageHeader,
} from "../index";

describe("Layout Components", () => {
  describe("Breadcrumbs", () => {
    it("renders breadcrumb items with correct active state and links", () => {
      render(
        <Breadcrumbs
          items={[
            { label: "Home", href: "/", icon: Home },
            { label: "Dashboard", href: "/admin" },
            { label: "Settings", current: true },
          ]}
        />,
      );

      expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeDefined();
      expect(screen.getByText("Home")).toBeDefined();
      expect(screen.getByText("Dashboard")).toBeDefined();

      const currentItem = screen.getByText("Settings");
      expect(currentItem.getAttribute("aria-current")).toBe("page");
    });
  });

  describe("PageHeader", () => {
    it("renders title, description, badge, and actions", () => {
      render(
        <PageHeader
          title="Student Records"
          description="Manage enrolled students"
          badge={<span data-testid="test-badge">Active</span>}
          actions={<button type="button">New Student</button>}
          breadcrumbs={<span data-testid="test-breadcrumbs">Path</span>}
        />,
      );

      expect(screen.getByText("Student Records")).toBeDefined();
      expect(screen.getByText("Manage enrolled students")).toBeDefined();
      expect(screen.getByTestId("test-badge")).toBeDefined();
      expect(screen.getByTestId("test-breadcrumbs")).toBeDefined();
      expect(screen.getByRole("button", { name: "New Student" })).toBeDefined();
    });
  });

  describe("PageContainer", () => {
    it("renders children with responsive container classes", () => {
      const { container } = render(
        <PageContainer maxWidth="7xl" padded>
          <div data-testid="container-content">Content</div>
        </PageContainer>,
      );

      expect(screen.getByTestId("container-content")).toBeDefined();
      expect(container.firstChild).toHaveProperty("className");
      const className = (container.firstChild as HTMLElement).className;
      expect(className).toContain("max-w-7xl");
      expect(className).toContain("px-4");
    });
  });

  describe("CustomerHeader", () => {
    it("renders brand, nav links, actions, and toggles mobile menu", () => {
      render(
        <CustomerHeader
          brand={<span data-testid="brand-logo">Softtech Core</span>}
          navItems={[
            { label: "Showcase", href: "/#showcase", active: true },
            { label: "Features", href: "/features" },
          ]}
          actions={<button type="button">Sign In</button>}
        />,
      );

      expect(screen.getByTestId("brand-logo")).toBeDefined();
      expect(screen.getAllByText("Showcase").length).toBeGreaterThan(0);
      expect(screen.getByText("Features")).toBeDefined();
      expect(screen.getAllByRole("button", { name: "Sign In" }).length).toBeGreaterThan(0);

      // Mobile menu toggle
      const mobileToggle = screen.getByLabelText(/open navigation menu/i);
      expect(mobileToggle).toBeDefined();
      fireEvent.click(mobileToggle);
      expect(mobileToggle.getAttribute("aria-expanded")).toBe("true");
    });
  });

  describe("CustomerFooter", () => {
    it("renders brand, link groups, and copyright", () => {
      render(
        <CustomerFooter
          brand={<span>Softtech Core</span>}
          description="Reusable architecture foundation"
          linkGroups={[
            {
              title: "Platform",
              links: [
                { label: "Components", href: "/#components" },
                { label: "Admin", href: "/admin" },
              ],
            },
          ]}
          copyright={<span>© 2026 Softtech Core</span>}
        />,
      );

      expect(screen.getByText("Softtech Core")).toBeDefined();
      expect(screen.getByText("Platform")).toBeDefined();
      expect(screen.getByText("Components")).toBeDefined();
      expect(screen.getByText("© 2026 Softtech Core")).toBeDefined();
    });
  });

  describe("CustomerLayout", () => {
    it("composes header, body, and footer properly", () => {
      render(
        <CustomerLayout
          header={<header data-testid="cust-header">Header</header>}
          footer={<footer data-testid="cust-footer">Footer</footer>}
        >
          <div data-testid="cust-body">Main Body</div>
        </CustomerLayout>,
      );

      expect(screen.getByTestId("cust-header")).toBeDefined();
      expect(screen.getByTestId("cust-body")).toBeDefined();
      expect(screen.getByTestId("cust-footer")).toBeDefined();
    });
  });

  describe("AdminSidebar", () => {
    const mockGroups = [
      {
        title: "Main",
        items: [
          { title: "Dashboard", href: "/admin", icon: Layers, active: true },
          { title: "Students", href: "/admin/students", icon: Users },
        ],
      },
      {
        title: "Settings",
        items: [{ title: "Preferences", href: "/admin/settings", icon: Settings }],
      },
    ];

    it("renders nav groups and links in expanded desktop mode", () => {
      render(
        <AdminSidebar groups={mockGroups} brand={<span>Admin Console</span>} collapsed={false} />,
      );

      expect(screen.getByText("Admin Console")).toBeDefined();
      expect(screen.getByText("Main")).toBeDefined();
      expect(screen.getByText("Dashboard")).toBeDefined();
      expect(screen.getByText("Students")).toBeDefined();
    });

    it("renders icon links with tooltips in collapsed mode", () => {
      render(<AdminSidebar groups={mockGroups} brand={<span>Admin</span>} collapsed={true} />);

      const dashboardLink = screen.getByLabelText("Dashboard");
      expect(dashboardLink).toBeDefined();
      expect(dashboardLink.getAttribute("aria-current")).toBe("page");
    });

    it("renders mobile drawer when mobileOpen is true", () => {
      const onMobileOpenChange = vi.fn();
      render(
        <AdminSidebar
          groups={mockGroups}
          brand={<span>Admin Console</span>}
          mobileOpen={true}
          onMobileOpenChange={onMobileOpenChange}
        />,
      );

      expect(screen.getByRole("dialog", { name: /mobile navigation drawer/i })).toBeDefined();
      const closeBtn = screen.getByLabelText(/close navigation menu/i);
      fireEvent.click(closeBtn);
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("AdminHeader", () => {
    it("renders brand, toggles, and user profile with logout action", () => {
      const onLogout = vi.fn();
      const onToggleDesktopSidebar = vi.fn();
      const onToggleMobileSidebar = vi.fn();

      render(
        <AdminHeader
          brand={<span>Softtech Admin</span>}
          onToggleDesktopSidebar={onToggleDesktopSidebar}
          onToggleMobileSidebar={onToggleMobileSidebar}
          user={{
            name: "Sarah Connor",
            email: "sarah@softtech.io",
            role: "Security Officer",
          }}
          onLogout={onLogout}
        />,
      );

      expect(screen.getByText("Softtech Admin")).toBeDefined();

      const desktopToggle = screen.getByLabelText(/toggle sidebar collapse/i);
      fireEvent.click(desktopToggle);
      expect(onToggleDesktopSidebar).toHaveBeenCalled();

      const mobileToggle = screen.getByLabelText(/open mobile navigation menu/i);
      fireEvent.click(mobileToggle);
      expect(onToggleMobileSidebar).toHaveBeenCalled();

      // Open user dropdown
      const userBtn = screen.getByLabelText(/user menu for Sarah Connor/i);
      expect(userBtn).toBeDefined();
      expect(screen.getByText("Sarah Connor")).toBeDefined();
      fireEvent.pointerDown(userBtn);
    });
  });

  describe("AdminFooter", () => {
    it("renders copyright, system status, and version", () => {
      render(<AdminFooter version="v1.0.0-rc" copyright={<span>© 2026 Admin Portal</span>} />);

      expect(screen.getByText("© 2026 Admin Portal")).toBeDefined();
      expect(screen.getByText("v1.0.0-rc")).toBeDefined();
      expect(screen.getByText("All systems operational")).toBeDefined();
    });
  });

  describe("AdminLayout", () => {
    it("coordinates sidebar and header with children content", () => {
      render(
        <AdminLayout
          sidebar={({ collapsed }) => (
            <aside data-testid="admin-sidebar" data-collapsed={collapsed}>
              Sidebar
            </aside>
          )}
          header={({ toggleCollapsed }) => (
            <header data-testid="admin-header">
              <button type="button" onClick={toggleCollapsed}>
                Toggle
              </button>
            </header>
          )}
          footer={<footer data-testid="admin-footer">Footer</footer>}
        >
          <div data-testid="admin-content">Dashboard Content</div>
        </AdminLayout>,
      );

      expect(screen.getByTestId("admin-sidebar")).toBeDefined();
      expect(screen.getByTestId("admin-header")).toBeDefined();
      expect(screen.getByTestId("admin-content")).toBeDefined();
      expect(screen.getByTestId("admin-footer")).toBeDefined();

      // Test toggle
      const toggleBtn = screen.getByRole("button", { name: "Toggle" });
      expect(screen.getByTestId("admin-sidebar").getAttribute("data-collapsed")).toBe("false");
      fireEvent.click(toggleBtn);
      expect(screen.getByTestId("admin-sidebar").getAttribute("data-collapsed")).toBe("true");
    });
  });
});
