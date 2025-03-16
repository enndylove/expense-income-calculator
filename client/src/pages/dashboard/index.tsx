import { api } from "@/shared/api";

export function DashboardComponent() {
  // @ts-expect-error
  const { data } = api.get("/transactions");
  console.log(data);
  return <>dashboard</>;
}
