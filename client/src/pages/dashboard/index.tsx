import { AuthGuard } from "@/shared/guards/authGuard";

export function DashboardComponent() {
  return <AuthGuard>Hello</AuthGuard>;
}
