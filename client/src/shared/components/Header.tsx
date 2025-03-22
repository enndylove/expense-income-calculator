import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AuthGuard } from "../guards/AuthGuard";
import { UnAuthGuard } from "../guards/UnAuthGuard";

export function Header() {
  return (
    <>
      <header className="flex backdrop-blur-sm bg-neutral-900/40 z-40 items-center rounded-3xl justify-between border py-2 px-6 border-neutral-800 w-full max-w-5xl m-[15px_auto_15px_auto]">
        <span className="text-xl tracking-tighter">enndy</span>
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
                  variant={"default"}
                  size={"sm"}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </UnAuthGuard>
        </div>
      </header>
    </>
  );
}
