import { ThemeToggle } from "../theme/theme-toggle";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <>
      <header className="flex backdrop-blur-sm bg-secondary dark:bg-neutral-900/40 z-40 items-center rounded-3xl justify-between border py-2 px-6 dark:border-neutral-800 w-full max-w-5xl m-[15px_auto_15px_auto]">
        <span className="text-xl tracking-tighter">enndy</span>
        <div className="flex flex-row gap-3">
          <Navigation />
          {/* <Link to="/">
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
                <Button className="cursor-pointer" size={"sm"}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </UnAuthGuard> */}
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
