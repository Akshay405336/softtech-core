export { Breadcrumbs } from "./breadcrumbs";
export { PageHeader, type PageHeaderProps } from "./page-header";
export { PageContainer, type PageContainerProps } from "./page-container";
export { CustomerHeader, type CustomerHeaderProps } from "./customer-header";
export { CustomerFooter, type CustomerFooterProps } from "./customer-footer";
export { CustomerLayout, type CustomerLayoutProps } from "./customer-layout";
export { AdminSidebar, type AdminSidebarProps } from "./admin-sidebar";
export { AdminHeader, type AdminHeaderProps } from "./admin-header";
export { AdminFooter, type AdminFooterProps } from "./admin-footer";
export { AdminLayout, type AdminLayoutProps } from "./admin-layout";

export type {
  AdminNavGroup,
  AdminNavItem,
  AdminUser,
  BreadcrumbItem,
  BreadcrumbsProps,
  CustomerNavItem,
  FooterLink,
  FooterLinkGroup,
  SocialLink,
} from "./types";

export {
  createMockAuthAdapter,
  DEFAULT_DEMO_USER,
  type AuthAdapter,
  type AuthResult,
  type LoginCredentials,
  type MockAuthAdapterOptions,
  type User,
} from "./auth";
