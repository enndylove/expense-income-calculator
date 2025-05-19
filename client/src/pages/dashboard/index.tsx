import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserBalanceQuery } from "@/hooks/user/balance"
import { AuthGuard } from "@/shared/guards/AuthGuard"
import { BarChart3, CreditCard, DollarSign, LineChart, PlusCircle, QrCode } from "lucide-react"
import { AddTransactionDialog } from "./ui/AddTransactionDialog"
import { ScannerDialog } from "./ui/ScannerDialog"
import { TransactionTable } from "./components/TransactionTable"
import { ProjectNavigation } from "./ui/ProjectNavigation"
import { dashboardProjectRoute } from "@/routes/pages/dashboard/index.$projectId"

export function DashboardComponent() {
  const { data: userBalance } = useUserBalanceQuery();
  const { projectId } = dashboardProjectRoute.useParams();

  return (
    <AuthGuard>
      <ProjectNavigation projectId={projectId} />

      {/* Main Content */}
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <QrCode className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Scan QR</span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Transaction</span>
            </Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${Number(userBalance?.balance).toFixed(2) || "0.00"}</div>
                <p className="text-xs text-muted-foreground">Available funds</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,250.00</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$850.00</div>
                <p className="text-xs text-muted-foreground">-4.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32%</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your transaction history for the current period.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="hidden md:block">
                  <TransactionTable />
                </div>
                <div className="md:hidden">
                  <TransactionTable />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Keep the dialogs but they'll be triggered from the new UI */}
      <div className="hidden">
        <ScannerDialog />
        <AddTransactionDialog />
      </div>
    </AuthGuard >
  )
}
