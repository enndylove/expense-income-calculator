import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AuthGuard } from "../guards/AuthGuard";
import { UnAuthGuard } from "../guards/UnAuthGuard";

export function Header() {
  return (
    <header className="flex items-center justify-between w-full max-w-4xl m-[20px_auto_0px_auto]">
      <span>enndy</span>
      <div className="flex flex-row gap-3">
        <Link to="/">
          <Button
            className="cursor-pointer"
            variant={"neutralGhost"}
            size={"sm"}
          >
            Home
          </Button>
        </Link>
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
        <UnAuthGuard>
          <div className="flex space-x-2">
            <Link to="/login">
              <Button
                className="cursor-pointer"
                variant={"neutralGhost"}
                size={"sm"}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                className="cursor-pointer"
                variant={"neutralGhost"}
                size={"sm"}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </UnAuthGuard>
      </div>
    </header>
  );
}
