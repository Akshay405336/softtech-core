import * as React from "react";
import { cn } from "../../lib/utils";
import type { FooterLinkGroup, SocialLink } from "./types";

export interface CustomerFooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  description?: React.ReactNode;
  linkGroups?: FooterLinkGroup[];
  contactInfo?: React.ReactNode;
  copyright?: React.ReactNode;
  socialLinks?: SocialLink[];
  bottomContent?: React.ReactNode;
}

export function CustomerFooter({
  brand,
  description,
  linkGroups = [],
  contactInfo,
  copyright,
  socialLinks = [],
  bottomContent,
  className,
  ...props
}: CustomerFooterProps): React.JSX.Element {
  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-card/50 text-card-foreground transition-colors",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Description Column */}
          {(brand || description || contactInfo) && (
            <div className="space-y-4 lg:col-span-2">
              {brand && <div className="flex items-center">{brand}</div>}
              {description && (
                <div className="text-sm text-muted-foreground max-w-sm">{description}</div>
              )}
              {contactInfo && (
                <div className="text-xs text-muted-foreground pt-1">{contactInfo}</div>
              )}
            </div>
          )}

          {/* Dynamic Link Groups */}
          {linkGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-12 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground text-center sm:text-left">
            {copyright || <span>© 2026 Softtech Core. All rights reserved.</span>}
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          )}

          {bottomContent && <div className="text-xs text-muted-foreground">{bottomContent}</div>}
        </div>
      </div>
    </footer>
  );
}
