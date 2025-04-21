import { useTransition } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePagination } from "@/shared/hooks/usePagination";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { cn } from "@/shared/lib/utils";

interface PaginationProps extends React.ComponentProps<"nav"> {
  page: number;
  pageCount: number;
  siblings: number;
  boundaries: number;
  onPageChange: (page: number) => void;
}

export const DOTS = "dots";

export function Pagination({
  page: currentPage,
  pageCount,
  siblings,
  boundaries,
  className,
  onPageChange,
  ...props
}: PaginationProps) {
  const isMobile = useIsMobile();

  const { range, first, last, next, previous, setPage } = usePagination({
    total: pageCount,
    boundaries: isMobile ? 1 : boundaries,
    onChange: onPageChange,
    initialPage: 1,
    page: currentPage,
    siblings: isMobile ? 0 : siblings,
  });

  const [_, startTransition] = useTransition();

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center gap-1", className)}
      {...props}
    >
      {!isMobile && (
        <Button
          variant={"outline"}
          disabled={currentPage === 1}
          onClick={first}
          size="icon"
        >
          <ChevronsLeft className="size-4" />
          <span className="sr-only">First page</span>
        </Button>
      )}
      <Button
        size="icon"
        variant={"outline"}
        className="mr-2"
        disabled={currentPage === 1}
        onClick={previous}
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Prev page</span>
      </Button>
      {range.map((page, i) => {
        if (page === "dots") {
          return (
            <Button
              key={i}
              variant={i + 1 === currentPage ? "neutral" : "outline"}
              size={"icon"}
              onClick={() => {
                const isRight = i > Math.ceil(range.length / 2);
                if (isRight) {
                  setPage(
                    currentPage + 5 > pageCount ? pageCount : currentPage + 5,
                  );
                } else {
                  setPage(currentPage - 5 < 1 ? 1 : currentPage - 5);
                }
              }}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          );
        }

        return (
          <Button
            key={i}
            variant={i + 1 === currentPage ? "neutral" : "outline"}
            size={"icon"}
            disabled={page === currentPage}
            onClick={() => {
              startTransition(() => {
                setPage(page);
              });
            }}
          >
            {page}
          </Button>
        );
      })}
      <Button
        variant={"outline"}
        className="ml-2"
        size="icon"
        disabled={currentPage === pageCount}
        onClick={next}
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">Next page</span>
      </Button>
      {!isMobile && (
        <Button
          variant={"outline"}
          size="icon"
          disabled={currentPage === pageCount}
          onClick={last}
        >
          <ChevronsRight className="size-4" />
          <span className="sr-only">Last page</span>
        </Button>
      )}
    </nav>
  );
}
