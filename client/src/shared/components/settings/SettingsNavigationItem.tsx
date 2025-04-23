import { Link } from "@tanstack/react-router";

interface SettingsNavigationItemProps {
  children: React.ReactNode;
  linkTo: string;
}

export function SettingsNavigationItem({ children, linkTo }: SettingsNavigationItemProps) {
  return (
    <Link to={linkTo}>
      <span>
        {children}
      </span>
    </Link>
  );
}
