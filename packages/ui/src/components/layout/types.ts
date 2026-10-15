import * as React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export interface CustomerNavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
  badge?: React.ReactNode;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AdminNavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  active?: boolean;
  external?: boolean;
  children?: AdminNavItem[];
}

export interface AdminNavGroup {
  title?: string;
  items: AdminNavItem[];
}

export interface AdminUser {
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}
