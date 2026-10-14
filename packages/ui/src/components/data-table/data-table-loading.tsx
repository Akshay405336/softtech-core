import * as React from "react";
import { Skeleton } from "../skeleton";
import { TableCell, TableRow } from "../table";

export interface DataTableLoadingProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableLoading({
  columnCount,
  rowCount = 5,
}: DataTableLoadingProps): React.JSX.Element {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={`loading-row-${rowIndex}`} className="hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={`loading-cell-${rowIndex}-${colIndex}`} className="p-4">
              <Skeleton
                className={`h-4 ${
                  colIndex === 0
                    ? "w-8"
                    : colIndex === 1
                      ? "w-32"
                      : colIndex === 2
                        ? "w-24"
                        : "w-16"
                }`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
