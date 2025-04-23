import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { SettingsNavigationItem } from "./SettingsNavigationItem";

export function SettingsNavigation() {
  return (
    <div className="flex flex-col gap-3 w-sm">
      <Link to="/dashboard">
        <Button variant={"neutral"}>
          <ChevronLeftIcon />
          Back to dashboard
        </Button>
      </Link>
      <div className="flex flex-col gap-2">
        <SettingsNavigationItem linkTo="/dashboard/settings/profile">
          Profile
        </SettingsNavigationItem>
      </div>
    </div>
  )
}
