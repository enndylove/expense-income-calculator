import { api } from "@/shared/api";

export async function getTransactionHistory(page = 1, limit = 10) {
  const { data } = await api.get("/transactions", {
    params: {
      page,
      limit,
      orderBy: "createdAt",
      order: "desc",
    },
  });
  return data;
}
