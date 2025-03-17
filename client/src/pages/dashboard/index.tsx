import { AuthGuard } from "@/shared/guards/AuthGuard";

export function DashboardComponent() {
  return <AuthGuard>Hello</AuthGuard>;
}
