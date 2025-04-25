import { Link } from "@tanstack/react-router"
import {
  BarChart3,
  Building2,
  ChevronLeftIcon,
  CreditCard,
  FileText,
  Gauge,
  Globe,
  HardDrive,
  LayoutDashboard,
  Settings,
  Tag,
  User,
  Users,
  Wallet,
  Webhook,
  Wrench,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsSidebar() {
  return (
    <div className="w-64 border rounded-lg overflow-hidden bg-background">
      <ScrollArea className="h-full max-h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-4">
          <Link className="" to="/dashboard">
            <Button className="w-full mb-3" variant={"neutral"}>
              <ChevronLeftIcon />
              Back to dashboard
            </Button>
          </Link>
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Settings</h3>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link to="/dashboard/settings/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link to="/dashboard/settings/companies">
                  <Building2 className="mr-2 h-4 w-4" />
                  My companies
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link to="/dashboard/settings/setup">
                  <Wrench className="mr-2 h-4 w-4" />
                  Setup and implementation
                </Link>
              </Button>
            </div>
          </div>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="company" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-medium">Company</AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/subscription">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Subscription
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/auto-rules">
                      <Settings className="mr-2 h-4 w-4" />
                      Auto rules
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/counterparties">
                      <Users className="mr-2 h-4 w-4" />
                      Counterparties
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/accounts">
                      <Wallet className="mr-2 h-4 w-4" />
                      Accounts
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/categories">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Categories
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/projects">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Projects
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/tags">
                      <Tag className="mr-2 h-4 w-4" />
                      Tags
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/users">
                      <User className="mr-2 h-4 w-4" />
                      Users
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/exchange-rates">
                      <Globe className="mr-2 h-4 w-4" />
                      Fixed exchange rates
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="invoices" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-medium">Invoices</AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/my-details">
                      <FileText className="mr-2 h-4 w-4" />
                      My details
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/client-details">
                      <Users className="mr-2 h-4 w-4" />
                      Clients details
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/goods">
                      <HardDrive className="mr-2 h-4 w-4" />
                      Goods
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="developers" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-medium">For Developers</AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/api">
                      <Globe className="mr-2 h-4 w-4" />
                      API
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/webhook">
                      <Webhook className="mr-2 h-4 w-4" />
                      Webhook
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="visual" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-medium">Visual Settings</AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/dashboard/settings/dashboard-setup">
                      <Gauge className="mr-2 h-4 w-4" />
                      Dashboard setup
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
