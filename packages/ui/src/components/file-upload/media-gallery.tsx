"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, FileText, FileVideo, Star, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../badge";
import { Button } from "../button";
import type { MediaItem } from "./types";
import { formatBytes } from "./utils";

export interface MediaGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MediaItem[];
  onReorder?: (items: MediaItem[]) => void;
  onSetPrimary?: (id: string) => void;
  onRemove?: (id: string) => void;
  columns?: 2 | 3 | 4;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function MediaGallery({
  items,
  onReorder,
  onSetPrimary,
  onRemove,
  columns = 3,
  emptyTitle = "No media files uploaded",
  emptyDescription = "Uploaded images and documents will appear in this gallery.",
  className,
  ...props
}: MediaGalleryProps): React.JSX.Element {
  const moveItem = (index: number, direction: "left" | "right") => {
    if (!onReorder) return;
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    const target = newItems[targetIndex];
    if (!temp || !target) return;

    newItems[index] = target;
    newItems[targetIndex] = temp;
    onReorder(newItems);
  };

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground",
          className,
        )}
        {...props}
      >
        <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
        <p className="text-xs text-muted-foreground mt-1">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)} {...props}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className={cn(
              "group relative flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-xs transition-all",
              item.isPrimary && "ring-2 ring-primary border-primary",
            )}
          >
            {/* Media thumbnail area */}
            <div className="relative aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
              {item.type === "video" ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileVideo className="size-8 text-purple-500 mb-1" />
                  <span className="text-[11px] font-mono">Video Clip</span>
                </div>
              ) : item.type === "document" ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileText className="size-8 text-red-500 mb-1" />
                  <span className="text-[11px] font-mono">Document</span>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.alt || item.name || `Media ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}

              {/* Badges overlay */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                {item.isPrimary && (
                  <Badge variant="default" className="text-[10px] h-5 shadow-xs">
                    Primary
                  </Badge>
                )}
                {item.type && item.type !== "image" && (
                  <Badge variant="outline" className="text-[10px] h-5 bg-background/80 capitalize">
                    {item.type}
                  </Badge>
                )}
              </div>
            </div>

            {/* Footer details & controls */}
            <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium truncate text-foreground" title={item.name}>
                  {item.name || `Media Item ${index + 1}`}
                </p>
                {item.size !== undefined && (
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {formatBytes(item.size)}
                  </p>
                )}
              </div>

              {/* Action toolbars */}
              <div className="flex items-center justify-between pt-1 border-t border-border">
                {/* Reorder buttons */}
                {onReorder && (
                  <div className="flex items-center gap-0.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={isFirst}
                      onClick={() => moveItem(index, "left")}
                      aria-label={`Move ${item.name || "item"} left`}
                    >
                      <ChevronLeft className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={isLast}
                      onClick={() => moveItem(index, "right")}
                      aria-label={`Move ${item.name || "item"} right`}
                    >
                      <ChevronRight className="size-3.5" />
                    </Button>
                  </div>
                )}

                {/* Secondary actions: Set primary & Remove */}
                <div className="flex items-center gap-1 ml-auto">
                  {onSetPrimary && !item.isPrimary && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-primary"
                      onClick={() => onSetPrimary(item.id)}
                      title="Set as primary cover"
                      aria-label={`Set ${item.name || "item"} as primary`}
                    >
                      <Star className="size-3.5" />
                    </Button>
                  )}

                  {onRemove && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemove(item.id)}
                      title="Remove item"
                      aria-label={`Remove ${item.name || "item"}`}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
