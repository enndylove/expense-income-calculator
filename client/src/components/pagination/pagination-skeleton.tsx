import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

export function PaginationSkeleton({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn("mx-auto flex w-full justify-center gap-1", className)}
      {...props}
    >
      <Skeleton
        className={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "hidden sm:inline-flex",
        )}
      >
        <ChevronsLeft className="size-4" />
      </Skeleton>
      <Skeleton className={buttonVariants({ size: "icon", variant: "ghost" })}>
        <ChevronLeft className="size-4" />
      </Skeleton>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className={buttonVariants({ variant: "ghost" })}>
          {i + 1}
        </Skeleton>
      ))}
      <Skeleton className={buttonVariants({ size: "icon", variant: "ghost" })}>
        <ChevronRight className="w-4 h-4 " />
      </Skeleton>
      <Skeleton
        className={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "hidden sm:inline-flex",
        )}
      >
        <ChevronsRight className="size-4" />
      </Skeleton>
    </nav>
  );
}
