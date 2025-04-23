import { Button } from "@/components/ui/button";
import { AccountManage } from "./AccountManage";
import { SelectCompany } from "./dashboard/SelectCompany";
import { MinusIcon, PlusIcon, SettingsIcon } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="max-w-[95%] m-auto mt-5 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-2">
        <SelectCompany />
        <Button variant={"neutral"} size={"icon"}>
          <SettingsIcon />
        </Button>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-row gap-3">
          <Button variant={"green"}>
            <PlusIcon />
            Income
          </Button>
          <Button variant={"red"}>
            <MinusIcon />
            Expense
          </Button>
        </div>
        <AccountManage />
      </div>
    </div>
  )
}
