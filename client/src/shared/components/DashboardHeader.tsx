import { BoxIcon } from "lucide-react";
import { AccountManage } from "./AccountManage";

export function DashboardHeader() {
  return (
    <div className="max-w-[95%] m-auto mt-5 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-2">
        <BoxIcon className="size-5 text-foreground" />
        <span className="text-foreground">
          Company name
        </span>
      </div>
      <div className="flex flex-row gap-3">
        <AccountManage />
      </div>
    </div>
  )
}
