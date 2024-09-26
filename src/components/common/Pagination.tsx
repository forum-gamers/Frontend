"use client";

import { Button } from "@/components/ui/button";
import { type Dispatch, memo, type SetStateAction, useMemo } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationFooterProps {
  page: number;
  totalPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
}

function PaginationFooter({
  page,
  totalPage,
  setPage,
  hasMore,
}: PaginationFooterProps) {
  const renderPaginationButtons = useMemo(() => {
    const pageNumbers = [];
    const maxButtons = 5;
    const halfMaxButtons = Math.floor(maxButtons / 2);

    let startPage = Math.max(1, page - halfMaxButtons);
    let endPage = Math.min(totalPage, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <Button key="start" onClick={() => setPage(1)} variant="outline">
          1
        </Button>
      );
      if (startPage > 2)
        pageNumbers.push(
          <Button key="ellipsis-start" variant="outline" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
    }

    for (let i = startPage; i <= endPage; i++)
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => setPage(i)}
          className={cn(
            page === i && "bg-blue-500",
            "transition-colors duration-200"
          )}
          variant={page === i ? "default" : "outline"}
        >
          {i}
        </Button>
      );

    if (endPage < totalPage) {
      if (endPage < totalPage - 1)
        pageNumbers.push(
          <Button key="ellipsis-end" variant="outline" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );

      pageNumbers.push(
        <Button key="end" onClick={() => setPage(totalPage)} variant="outline">
          {totalPage}
        </Button>
      );
    }

    return pageNumbers;
  }, [page, totalPage, setPage]);

  return (
    <footer className="bg-background border-t py-4">
      <div className="container mx-auto px-4 flex justify-center items-center space-x-2">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          variant="outline"
          className={cn(page === 1 && "cursor-not-allowed")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {renderPaginationButtons}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPage || !hasMore}
          variant="outline"
          className={cn(
            (page === totalPage || !hasMore) && "cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
}

export default memo(PaginationFooter);
