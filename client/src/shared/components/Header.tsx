import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AuthGuard } from "../guards/AuthGuard";

export function Header() {
  return (
    <header className="flex items-center justify-between w-full max-w-4xl m-[20px_auto_0px_auto]">
      <span>enndy</span>
      <AuthGuard>
        <Link to="/dashboard">
          <Button
            className="cursor-pointer"
            variant={"neutralGhost"}
            size={"sm"}
          >
            Dashboard
          </Button>
        </Link>
      </AuthGuard>
    </header>
  );
}
